import firebase from 'firebase'
import { useFormik } from 'formik'
import * as React from 'react'
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import useToggle from 'react-use/lib/useToggle'
import * as Yup from 'yup'

import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { Collections } from '../../../lib/Collections'
import { getCurrentUser } from '../../../lib/getCurrentUser'

import type { CreateCampfireFormTypes } from './HomeNewCampfireDialog.types'

const styles = StyleSheet.create({
    bottomActions: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    modalHeaderDescription: {
        color: '#8a8a8a',
        fontFamily: 'MPlus',
        fontSize: 12,
        marginTop: 10,
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
        padding: 35,
        width: '80%',
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
        name: Yup.string()
            .min(3, 'It has to be more than 3 characters.')
            .max(100, 'That\'s a long one. Make it a bit shorter.')
            .required('You gotta put something in.'),
    })

export const HomeNewCampfireDialog = () => {
    const [isDialogOpen, toggleDialog] = useToggle(false)

    const user = getCurrentUser()

    const handleSubmit = (formValues: CreateCampfireFormTypes) => {
        void firebase
            .firestore()
            .collection('campfires')
            .add({
                author: {
                    id: user?.uid,
                    name: user?.displayName,
                },
                createdAt: new Date(),
                name: formValues.name,
            })
            .then(() => {
                toggleDialog()
            })
    }

    const form = useFormik<CreateCampfireFormTypes>({
        initialValues: {
            name: '',
        },
        onSubmit: (formValues) => {
            handleSubmit(formValues)
        },
        validateOnChange: false,
        validationSchema: ValidationSchema,
    })

    return (
        <>
            <Button
                label="New Campfire"
                labelFontSize={10}
                onPress={toggleDialog}
                startIcon={(
                    <Image
                        source={require('../../../../assets/screens/global/log-axe.png')}
                        style={styles.toggleButtonIcon}
                    />
                )}
                style={styles.toggleButton}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDialogOpen}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalRoot}>
                        <View style={styles.modalHeader}>
                            <View style={styles.modalHeaderTitleContainer}>
                                <Image
                                    source={require('../../../../assets/screens/global/log-axe.png')}
                                    style={styles.modalHeaderIcon}
                                />
                                <Text style={styles.modalHeaderTitle}>
                                    New Campfire
                                </Text>
                            </View>
                            <Text style={styles.modalHeaderDescription}>
                                Create a new campfire where you can share fun stuff in.
                            </Text>
                        </View>
                        <TextField
                            error={Boolean(form.errors.name)}
                            fullWidth={true}
                            helperText={form.errors.name ?? 'How your campfire is going to be called'}
                            label="Name"
                            onChangeText={form.handleChange('name')}
                            style={styles.textField}
                            value={form.values.name}
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
