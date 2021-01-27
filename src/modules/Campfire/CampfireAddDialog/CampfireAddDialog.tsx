import cuid from 'cuid'
import firebase from 'firebase'
import { useFormik } from 'formik'
import * as React from 'react'
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import useToggle from 'react-use/lib/useToggle'
import * as Yup from 'yup'

import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { Collections } from '../../../lib/Collections'
import { useCurrentUser } from '../../../lib/getCurrentUser'

import type {
    CampfireAddDialogProps,
    NewLogFormTypes,
} from './CampfireAddDialog.types'

const styles = StyleSheet.create({
    bottomActions: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 7,
        borderWidth: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    buttonImage: {
        height: 30,
        width: 25,
    },
    buttonText: {
        fontFamily: 'MPlus',
        fontSize: 20,
        marginLeft: 5,
    },
    cancelButton: {
        backgroundColor: 'white',
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: '#ffffffa8',
        flex: 1,
        justifyContent: 'center',
    },
    modalHeader: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    modalHeaderIcon: {
        height: 30,
        marginRight: 10,
        width: 30,
    },
    modalHeaderTitle: {
        fontFamily: 'MPlus',
        fontSize: 25,
    },
    modalHeaderTitleContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    modalRoot: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
        paddingVertical: 25,
        width: '80%',
    },
    root: {
        bottom: 20,
        position: 'absolute',
        right: 30,
    },
    textArea: {
        textAlignVertical: 'top',
    },
    textField: {
        width: '70%',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    toggleButton: {
        backgroundColor: 'white',
        height: 30,
        width: 130,
    },
    toggleButtonIcon: {
        height: 15,
        marginRight: 5,
        width: 15,
    },
})

const ValidationSchema = Yup.object()
    .shape({
        description: Yup.string()
            .max(2000, 'You wrote a bit too much here.'),
        link: Yup.string()
            .url('Has to be a link.')
            .required('You gotta put something in.'),
    })

export const CampfireAddDialog = (props: CampfireAddDialogProps) => {
    const { id } = props

    const [isDialogOpen, toggleDialog] = useToggle(false)

    const user = useCurrentUser()

    const form = useFormik<NewLogFormTypes>({
        initialValues: {
            description: '',
            link: '',
        },
        onSubmit: (formValues) => {
            const logId = cuid()

            void firebase
                .firestore()
                .collection(Collections.LOGS)
                .doc(logId)
                .set({
                    description: formValues.description,
                    id: logId,
                    link: formValues.link,
                    metadata: {
                        author: {
                            id: user?.id,
                            name: user?.name,
                        },
                        campfire: {
                            id: id,
                        },
                    },
                    postDate: new Date(),
                })
                .then(() => {
                    toggleDialog()
                    form.resetForm({})
                })
        },
        validateOnChange: false,
        validationSchema: ValidationSchema,
    })

    return (
        <>
            <TouchableOpacity
                onPress={toggleDialog}
                style={styles.root}
            >
                <View style={styles.button}>
                    <Image
                        resizeMode="contain"
                        source={require('../../../../assets/screens/campfire/log.png')}
                        style={styles.buttonImage}
                    />
                    <Text style={styles.buttonText}>
                        New
                    </Text>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDialogOpen}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalRoot}>
                        <View style={styles.modalHeader}>
                            <Image
                                source={require('../../../../assets/screens/campfire/log.png')}
                                style={styles.modalHeaderIcon}
                            />
                            <Text style={styles.modalHeaderTitle}>
                                New Log
                            </Text>
                        </View>
                        <TextField
                            error={Boolean(form.errors.link)}
                            fullWidth={true}
                            helperText={form.errors.link}
                            label="Link"
                            onChangeText={form.handleChange('link')}
                            required={true}
                            style={styles.textField}
                            value={form.values.link}
                        />
                        <TextField
                            error={Boolean(form.errors.description)}
                            fullWidth={true}
                            helperText={form.errors.description}
                            label="Description"
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={form.handleChange('description')}
                            style={[styles.textField, styles.textArea]}
                            value={form.values.description}
                        />

                        <View style={styles.bottomActions}>
                            <Button
                                label="Cancel"
                                onPress={toggleDialog}
                                style={styles.cancelButton}
                            />
                            <Button
                                label="Create"
                                onPress={() => {
                                    form.handleSubmit()
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
