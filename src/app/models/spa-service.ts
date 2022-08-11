export interface ISpaService {
    id: string
    serviceTypeId: string
    price: number
    addressId: string
    address: {
        id: string
        country: string
        city: string
        street: string
        house: string
    }
}