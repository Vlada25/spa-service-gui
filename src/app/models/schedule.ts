export interface ISchedule {
    id?: string
    masterId?: string
    serviceId: string
    startTime: any
    endTime: any
    masterSurname?: string
    masterName?: string
    serviceName: string
    servicePrice: number
    address: string
    addressId: string
    serviceTypeId?: string
}