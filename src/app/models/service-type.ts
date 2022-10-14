export interface IServiceType {
    id?: string
    name: string
    lastingInMinutes: number
    description: string
    category: string
    photoId: string
    photoSrc?: string
}

// TODO: photo url