import firebase from 'firebase'
import React from 'react'

import type { UserType } from '../../modules/Login'
import { Collections } from '../Collections'
import { connection } from '../connection'

export const useCurrentUser = () => {
    const firebaseUser = firebase.auth().currentUser

    const [user, setUser] = React.useState<UserType>({
        id: firebaseUser?.uid ?? '',
        imageURL: firebaseUser?.photoURL ?? '',
        memberOf: [],
        name: firebaseUser?.displayName ?? '',
    })

    React.useEffect(() => {
        void connection(Collections.USERS)
            .doc(firebaseUser?.uid)
            .onSnapshot((result) => {
                const fetchedUser = result.data() as UserType

                setUser(fetchedUser)
            })
    }, [firebaseUser])

    return user
}
