import { useFonts } from 'expo-font'

export const useFontsInitialization = () => {
    const [loaded] = useFonts({
        MPlus: require('../../../assets/fonts/MPlus-Bold.ttf'),
    })

    return loaded
}
