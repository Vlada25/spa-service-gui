export interface IUser {
    id: string
    userName: string
    surname?: string
    name?: string
    middleName?: string
    email: string
    photoSrc?: string
    roles: string[]
    phoneNumber?: string
}
// TODO: move fields to client and master or do smt else