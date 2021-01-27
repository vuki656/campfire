import { LogBox } from 'react-native'

export const initializeErrorSuppression  = () => {
    LogBox.ignoreLogs([
        'Setting a timer for a long period of time',
        'Non-serializable values were found in',
        'fontFamily "Helvetica" is not a system font and has not been loaded through Font.loadAsync.',
    ])

}
