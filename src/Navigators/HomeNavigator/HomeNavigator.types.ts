import type { CampfireType } from '../../modules/Campfire'

export type RootStackParamList = {
    Home: undefined
    Campfire: { campfire: CampfireType }
    CampfireInvite: { campfire: CampfireType }
}
