export interface ISchedule {
    id?: string
    masterId?: string
    serviceId: string
    startTime: string
    endTime: string
    masterSurname?: string
    masterName?: string
    serviceName: string
    servicePrice: number
    address: string
    addressId: string
    serviceTypeId?: string
}