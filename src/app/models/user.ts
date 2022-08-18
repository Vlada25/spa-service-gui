export interface IUser {
    id: string
    userName: string
    surname: string
    name: string
    middleName: string
    email: string
    photoUrl?: string
    photoId?: string
    roles?: string[]
    isPersonExists?: boolean
}