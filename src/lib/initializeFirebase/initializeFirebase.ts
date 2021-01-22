import * as firebase from 'firebase'

import { firebaseConfig } from '../../../firebaseconfig'

export const initializeFirebase = () => {
    if (firebase.apps.length) {
        firebase.app()
    } else {
        firebase.initializeApp(firebaseConfig)
    }
}
