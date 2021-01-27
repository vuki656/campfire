import cuid from 'cuid'
import { useFormik } from 'formik'
import * as React from 'react'
import {
    Image,
    StyleSheet,
} from 'react-native'
import useToggle from 'react-use/lib/useToggle'
import * as Yup from 'yup'

import { Button } from '../../../components/Button'
import { Dialog } from '../../../components/Dialog'
import { DialogActions } from '../../../components/Dialog/DialogActions'
import { DialogContent } from '../../../components/Dialog/DialogContent'
import { DialogHeader } from '../../../components/Dialog/DialogHeader'
import { TextField } from '../../../components/TextField'
import { Collections } from '../../../lib/Collections'
import { connection } from '../../../lib/connection'
import { useCurrentUser } from '../../../lib/getCurrentUser'
import theme from '../../../lib/variables/theme'

import type { CreateCampfireFormTypes } from './HomeNewCampfireDialog.types'

const styles = StyleSheet.create({
    cancelButton: {
        backgroundColor: theme.color.white,
    },
    toggleButton: {
        backgroundColor: theme.color.white,
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
        emoji: Yup.string()
            .min(2, 'Can\'t use that one.')
            .max(2, 'Can\'t use that one.'),
        name: Yup.string()
            .min(3, 'It has to be more than 3 characters.')
            .max(100, 'That\'s a long one. Make it a bit shorter.')
            .required('You gotta put something in.'),
    })

export const HomeNewCampfireDialog = () => {
    const [isDialogOpen, toggleDialog] = useToggle(false)

    const user = useCurrentUser()

    const form = useFormik<CreateCampfireFormTypes>({
        initialValues: {
            emoji: '💃',
            name: '',
        },
        onSubmit: (formValues) => {
            const id = cuid()

            void connection(Collections.CAMPFIRES)
                .doc(id)
                .set({
                    author: {
                        id: user?.id,
                        name: user?.name,
                    },
                    createdAt: new Date(),
                    emoji: formValues.emoji,
                    id: id,
                    name: formValues.name,
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
            <Dialog isOpen={isDialogOpen}>
                <DialogHeader
                    note="Create a new campfire where you can share fun stuff in."
                    title="New Campfire"
                />
                <DialogContent>
                    <TextField
                        error={Boolean(form.errors.name)}
                        fullWidth={true}
                        helperText={form.errors.name ?? 'How your campfire is going to be called'}
                        label="Name"
                        onChangeText={form.handleChange('name')}
                        required={true}
                        value={form.values.name}
                    />
                    <TextField
                        error={Boolean(form.errors.emoji)}
                        helperText={form.errors.emoji ?? 'Something to give it more flare'}
                        label="Emoji"
                        maxLength={2}
                        onChangeText={form.handleChange('emoji')}
                        value={form.values.emoji}
                    />
                </DialogContent>
                <DialogActions>
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
                </DialogActions>
            </Dialog>
        </>
    )
}
