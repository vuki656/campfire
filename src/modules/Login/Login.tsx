import * as firebase from 'firebase'
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
import {
    adjectives,
    animals,
    uniqueNamesGenerator,
} from 'unique-names-generator'
import * as Yup from 'yup'

import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import { Collections } from '../../lib/Collections'

import type {
    DuckImageResponseType,
    LoginFormTypes,
    UserType,
} from './Login.types'

const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    image: {
        height: 200,
        marginBottom: 40,
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
        color: '#8a8a8a',
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
    submitButton: {
        marginTop: 20,
    },
    textField: {
        width: '70%',
    },
})

const ValidationSchema = Yup.object()
    .shape({
        email: Yup.string()
            .email('Has to be the thing with the monkey sign aka email.')
            .required('You gotta put something in.'),
        password: Yup.string()
            .min(5, 'It has to be more than 5 characters.')
            .max(100, 'That\'s a long one. Make it a bit shorter.')
            .required('You gotta put something in.'),
    })

export const Login = () => {
    const fetchDuckPhoto = async () => {
        let duckImageLink = ''

        await fetch('https://random-d.uk/api/v2/random')
            .then(async (response) => {
                return response.json()
            })
            .then((duckImageResponse: DuckImageResponseType) => {
                duckImageLink = duckImageResponse.url
            })

        return duckImageLink
    }

    const checkIfUserExists = async (email: string) => {
        return firebase
            .auth()
            .fetchSignInMethodsForEmail(email)
            .then((authenticationMethods) => {
                return authenticationMethods.length !== 0
            })
    }

    const saveUserInDatabase = (user: UserType) => {
        const {
            name,
            imageURL,
            id,
        } = user

        void firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(id)
            .set({
                id: id,
                imageURL: imageURL,
                name: name,
            })
    }

    const generateUserInfo = async () => {
        const randomName = uniqueNamesGenerator({
            dictionaries: [adjectives, animals],
            separator: ' ',
            style: 'capital',
        })

        const randomAnimalImageLink = await fetchDuckPhoto()

        return {
            imageLink: randomAnimalImageLink,
            name: randomName,
        }
    }

    const registerUser = (formValues: LoginFormTypes) => {
        void firebase
            .auth()
            .createUserWithEmailAndPassword(formValues.email, formValues.password)
            .then(async (result) => {
                const {
                    name,
                    imageLink,
                } = await generateUserInfo()

                saveUserInDatabase({
                    id: result.user?.uid ?? '',
                    imageURL: imageLink,
                    name: name,
                })

                return result.user?.updateProfile({
                    displayName: name,
                    photoURL: imageLink,
                })
            })
    }

    const logInUser = (formValues: LoginFormTypes) => {
        void firebase
            .auth()
            .signInWithEmailAndPassword(formValues.email, formValues.password)
    }

    const handleSubmit = async (formValues: LoginFormTypes) => {
        const userExists = await checkIfUserExists(formValues.email)

        if (userExists) {
            logInUser(formValues)
        } else {
            registerUser(formValues)
        }

    }

    const form = useFormik<LoginFormTypes>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (formValues) => {
            void handleSubmit(formValues)
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
                            source={require('../../../assets/screens/login/logo.png')}
                            style={styles.image}
                        />
                        <TextField
                            autoCapitalize="none"
                            autoCompleteType="email"
                            error={Boolean(form.errors.email)}
                            helperText={form.errors.email ?? 'The thing with the monkey sign'}
                            label="Email"
                            onChangeText={form.handleChange('email')}
                            styles={styles.textField}
                            value={form.values.email}
                        />
                        <TextField
                            autoCompleteType="password"
                            error={Boolean(form.errors.password)}
                            helperText={form.errors.password ?? 'Something your neighbour can\'t guess'}
                            label="Password"
                            onChangeText={form.handleChange('password')}
                            secure={true}
                            styles={styles.textField}
                            value={form.values.password}
                        />
                        <Button
                            label="Login"
                            onPress={() => {
                                form.handleSubmit()
                            }}
                            style={styles.submitButton}
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
