import firebase from 'firebase'

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}
