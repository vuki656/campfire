import type { RouteProp } from '@react-navigation/native'

import type { RootStackParamList } from '../../../Navigators/HomeNavigator'

type CampfireInviteScreenRouteProp = RouteProp<RootStackParamList, 'CampfireInvite'>

export type CampfireInviteProps = {
    route: CampfireInviteScreenRouteProp
}
