export type InviteType = {
    campfire: {
        id: string
        name: string
        emoji: string
        author: {
            id: string
            name: string
        }
    }
    from: {
        id: string
        name: string
    }
    to: {
        id: string
        name: string
    }
    id: string
}
