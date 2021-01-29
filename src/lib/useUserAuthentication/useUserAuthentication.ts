import * as firebase from 'firebase'
import React from 'react'

export const useUserAuthentication = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = React.useState(false)

    React.useEffect(() => {
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                setIsUserAuthenticated(Boolean(user))
            })
    }, [])

    return isUserAuthenticated
}
