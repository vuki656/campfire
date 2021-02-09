import cuid from 'cuid'
import { useFormik } from 'formik'
import * as React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import useToggle from 'react-use/lib/useToggle'
import * as Yup from 'yup'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogHeader,
    TextField,
} from '../../../components'
import {
    Collections,
    connection,
    useCurrentUser,
} from '../../../lib'
import theme from '../../../lib/variables/theme'

import type {
    CampfireAddDialogProps,
    NewLogFormTypes,
} from './CampfireAddDialog.types'

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: theme.color.white,
        borderColor: theme.color.black,
        borderRadius: 7,
        borderWidth: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    toggleButtonIcon: {
        height: 30,
        width: 25,
    },
    toggleButtonText: {
        fontFamily: theme.fontFamily.mPlus,
        fontSize: theme.fontSize.subtitle,
        marginLeft: 5,
    },
    toggleButtonTouchableOpacity: {
        bottom: 20,
        position: 'absolute',
        right: 30,
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

    const user = useCurrentUser()
    const [isDialogOpen, toggleDialog] = useToggle(false)

    const form = useFormik<NewLogFormTypes>({
        initialValues: {
            description: '',
            link: '',
        },
        onSubmit: (formValues) => {
            const logId = cuid()

            void connection(Collections.LOGS)
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

    const handleCancel = () => {
        toggleDialog()
        form.resetForm()
    }

    return (
        <>
            <TouchableOpacity
                onPress={toggleDialog}
                style={styles.toggleButtonTouchableOpacity}
            >
                <View style={styles.button}>
                    <Image
                        resizeMode="contain"
                        source={require('../../../../assets/screens/campfire/log.png')}
                        style={styles.toggleButtonIcon}
                    />
                    <Text style={styles.toggleButtonText}>
                        New
                    </Text>
                </View>
            </TouchableOpacity>
            <Dialog isOpen={isDialogOpen}>
                <DialogHeader
                    startIcon={(
                        <Image source={require('../../../../assets/screens/campfire/log.png')} />
                    )}
                    title="New Log"
                />
                <DialogContent>
                    <TextField
                        error={Boolean(form.errors.link)}
                        fullWidth={true}
                        helperText={form.errors.link}
                        label="Link"
                        onChangeText={form.handleChange('link')}
                        required={true}
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
                        value={form.values.description}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        label="Cancel"
                        onPress={handleCancel}
                    />
                    <Button
                        label="Create"
                        onPress={() => {
                            form.handleSubmit()
                        }}
                        variant="secondary"
                    />
                </DialogActions>
            </Dialog>
        </>
    )
}
