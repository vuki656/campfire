import * as firebase from 'firebase'
import { useFormik } from 'formik'
import * as React from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    adjectives,
    animals,
    uniqueNamesGenerator,
} from 'unique-names-generator'
import * as Yup from 'yup'

import {
    Button,
    TextField,
} from '../../components'
import {
    Collections,
    connection,
} from '../../lib'
import theme from '../../lib/variables/theme'

import type {
    DuckImageResponseType,
    LoginFormTypes,
    UserType,
} from './Login.types'

const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 30,
        paddingVertical: 50,
        width: '100%',
    },
    image: {
        height: 200,
        marginTop: 120,
        resizeMode: 'contain',
        width: 200,
    },
    noteContainer: {
        backgroundColor: theme.color.gray300,
        borderRadius: 10,
        marginTop: 40,
        padding: 20,
        width: '70%',
    },
    noteText: {
        color: theme.color.gray,
        fontFamily: theme.fontFamily.mPlus,
        fontSize: theme.fontSize.caption,
        textAlign: 'center',
    },
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    submitButton: {
        marginTop: 20,
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
                const imageURL = duckImageResponse.url

                if (imageURL.endsWith('.gif')) {
                    void fetchDuckPhoto()
                } else {
                    duckImageLink = duckImageResponse.url
                }
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

        void connection(Collections.USERS)
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
                    memberOf: [],
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
        <ScrollView contentContainerStyle={styles.root}>
            <Image
                source={require('../../../assets/screens/login/logo.png')}
                style={styles.image}
            />
            <View style={styles.form}>
                <TextField
                    autoCapitalize="none"
                    autoCompleteType="email"
                    error={Boolean(form.errors.email)}
                    helperText={form.errors.email ?? 'The thing with the monkey sign'}
                    label="Email"
                    onChangeText={form.handleChange('email')}
                    value={form.values.email}
                />
                <TextField
                    autoCompleteType="password"
                    error={Boolean(form.errors.password)}
                    helperText={form.errors.password ?? 'Something your neighbour can\'t guess'}
                    label="Password"
                    onChangeText={form.handleChange('password')}
                    secure={true}
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
        </ScrollView>
    )
}
