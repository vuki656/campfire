import { useFonts } from 'expo-font'

export const useFontsInitialization = () => {
    const [loaded] = useFonts({
        MPlus: require('../../../assets/fonts/MPlus-Bold.ttf'),
        NuitoSansBold: require('../../../assets/fonts/NunitoSans-ExtraBold.ttf'),
        NuitoSansLight: require('../../../assets/fonts/NunitoSans-ExtraLight.ttf'),
    })

    return loaded
}
