import firebase from 'firebase'

import type { Collections } from '../Collections'

export const connection = (collection: Collections) => {
    return firebase.firestore().collection(collection)
}
