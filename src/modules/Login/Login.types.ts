import type { CampfireType } from '../Campfire'

export type LoginFormTypes = {
    email: string
    password: string
}

export type UserType = {
    id: string
    imageURL: string
    name: string
    memberOf?: CampfireType[] | undefined
}

export type ImageResponseType = {
    message: string
    status: string
}
