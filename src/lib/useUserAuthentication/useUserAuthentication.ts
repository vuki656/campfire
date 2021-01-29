import * as firebase from 'firebase'
import React from 'react'

export const useUserAuthentication = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = React.useState<boolean>()

    React.useEffect(() => {
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                setIsUserAuthenticated(Boolean(user))
            })
    }, [])

    return isUserAuthenticated
}
