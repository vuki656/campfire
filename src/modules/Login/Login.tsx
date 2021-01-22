import { useFormik } from 'formik'
import * as React from 'react'
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import * as Yup from 'yup'

import { Button } from '../../components/Button/Button'
import { TextField } from '../../components/TextField/TextField'

import type { LoginFormTypes } from './Login.types'

const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    image: {
        height: 200,
        marginBottom: 20,
        resizeMode: 'contain',
        width: 200,
    },
    keyboardAvoidingViewContainer: {
        flex: 1,
    },
    noteContainer: {
        backgroundColor: '#eff3f6',
        borderRadius: 10,
        padding: 20,
        width: '70%',
    },
    noteText: {
        color: '#5f7d95',
        fontFamily: 'MPlus',
        fontSize: 10,
        textAlign: 'center',
    },
    root: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    textField: {
        width: '70%',
    },
})

const ValidationSchema = Yup.object()
    .shape({
        password: Yup.string()
            .min(5, 'It has to be more than 5 characters.')
            .max(100, 'That\'s a long one. Make it a bit shorter.')
            .required('You gotta put something in.'),
        username: Yup.string()
            .min(3, 'It has to be more than 2 characters.')
            .max(100, 'That\'s a long one. Make it a bit shorter.')
            .required('You gotta put something in.'),
    })

export const Login = () => {
    const handleSubmit = (formValues: LoginFormTypes) => {
        console.log('-> formValues', formValues)
    }

    const form = useFormik<LoginFormTypes>({
        initialValues: {
            password: '',
            username: '',
        },
        onSubmit: (formValues) => {
            handleSubmit(formValues)
        },
        validateOnChange: false,
        validationSchema: ValidationSchema,
    })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingViewContainer}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.root}>
                    <View style={styles.form}>
                        <Image
                            source={require('../../../assets/login-logo.png')}
                            style={styles.image}
                        />
                        <TextField
                            error={Boolean(form.errors.username)}
                            helperText={form.errors.username ?? 'What your mom calls you'}
                            label="Username"
                            onChange={form.handleChange('username')}
                            styles={styles.textField}
                            value={form.values.username}
                        />
                        <TextField
                            error={Boolean(form.errors.password)}
                            helperText={form.errors.password ?? 'Something your neighbour couldn\'t guess'}
                            label="Password"
                            onChange={form.handleChange('password')}
                            secure={true}
                            styles={styles.textField}
                            value={form.values.password}
                        />
                        <Button
                            label="Login"
                            onPress={() => {
                                form.handleSubmit()
                            }}
                        />
                    </View>
                    <View style={styles.noteContainer}>
                        <Text style={styles.noteText}>
                            If you don't have an account
                            we'll make one for you so just
                            put something in.
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
