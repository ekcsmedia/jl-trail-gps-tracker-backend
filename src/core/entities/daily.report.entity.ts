export class ShiftLog {
    id!:string;
    shift!: string;
    otHours!: number;
    vehicleModel!: string;
    regNo!: string;
    inTime!: Date;
    outTime!: Date;
    workingHours!: number;
    startingKm!: number;
    endingKm!: number;
    totalKm!: number;
    fromPlace!: string;
    toPlace!: string;
    fuelAvg!: number;
    coDriverName!: string;
    coDriverPhoneNo!: string;
    inchargeSign!: string;
    employeeName!: string;
    employeePhoneNo!: string;
    employeeCode!: string;
    monthYear!: string;
    dicvInchargeName!: string;
    dicvInchargePhoneNo!: string;
    trailId!: string;

    constructor(partial: Partial<ShiftLog>) {
        Object.assign(this, partial);
    }
}

export type ShiftLogEntityWithoutId = Omit<ShiftLog, 'id'>;

