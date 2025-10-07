import {DataTypes} from "sequelize";

export class ShiftLog {
    id!: string;
    shift!: string;
    date!: string;
    otHours!: number;
    inTime!: Date;
    outTime!: Date;
    workingHours!: number;
    monthYear!: string;
    vehicleModel!: string;
    regNo!: string;
    chassisNo!: string;
    gvw!: number;
    payload!: number;
    startingKm!: number;
    endingKm!: number;
    totalKm!: number;
    fuelAvg!: number;
    previousKmpl!: number;
    clusterKmpl!: number;
    highwaySweetSpotPercent!: number;
    normalRoadSweetSpotPercent!: number;
    hillsRoadSweetSpotPercent!: number;
    purposeOfTrial!: string;
    reason!: string;
    dateOfSale!: string;
    trailId!: string;
    fromPlace!: string;
    toPlace!: string;
    presentLocation!: string;
    employeeName!: string;
    vecvReportingPerson!: string;
    employeePhoneNo!: string;
    employeeCode!: string;
    dicvInchargeName!: string;
    dicvInchargePhoneNo!: string;
    dealerName!: string;
    capitalizedVehicleOrCustomerVehicle!: string; // customer vehicle
    customerVehicle!: string;
    capitalizedVehicle!: string;
    coDriverName!: string; // customer driver
    coDriverPhoneNo!: string;
    driverStatus!: string;
    customerName!: string;
    customerDriverName!: string;
    customerDriverNo!: string;
    vehicleNo!: string;
    imageVideoUrls!: any;
    inchargeSign!: string;
    trialKMPL!: string;
    vehicleOdometerStartingReading!:string;
    vehicleOdometerEndingReading!: string;
    trialKMS! : string;
    trialAllocation!: string;
    region!: string;
    allocation!: string;
    constructor(partial: Partial<ShiftLog>) {
        Object.assign(this, partial);
    }
}

// Type used for create operations (without ID)
export type ShiftLogEntityWithoutId = Omit<ShiftLog, 'id'>;
