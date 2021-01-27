import type { ModalProps } from 'react-native'

export type DialogProps = ModalProps & {
    isOpen: boolean
    children: React.ReactNode
}
