import firebase from 'firebase'
import React from 'react'

import type { CampfireType } from '../../modules/Campfire'
import { Collections } from '../Collections'
import { getCurrentUser } from '../getCurrentUser'

type UserDataType = {
    id: string
    name: string
    imageURL: string
    memberOf?: CampfireType[]
}

export const useCurrentUserData = () => {
    const [userData, setUserData] = React.useState<UserDataType | null>(null)
    const user = getCurrentUser()

    React.useEffect(() => {
        void firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(user?.uid)
            .get()
            .then((result) => {
                const fetchedUserData = result.data() as UserDataType
                console.log('-> fetchedUserData', fetchedUserData)

                setUserData(fetchedUserData)
            })
    }, [])

    return userData

}
