import type { RouteProp } from '@react-navigation/native'

import type { RootStackParamList } from '../../Screens/HomeScreen'

type CampfireScreenRouteProp = RouteProp<RootStackParamList, 'Campfire'>

export type CampfireProps = {
    route: CampfireScreenRouteProp
}

export type CampfireType = {
    id: string
    createdAt: string
    emoji: string
    name: string
    author: {
        id: string
        name: string
    }
}

