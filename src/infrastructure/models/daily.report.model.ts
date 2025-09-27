import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../utils/database";

export class ShiftLogModel extends Model {}

ShiftLogModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        shift: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otHours: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        inTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        outTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        workingHours: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        monthYear: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicleModel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        regNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        chassisNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gvw: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        payload: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        startingKm: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        endingKm: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        totalKm: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fuelAvg: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        previousKmpl: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        clusterKmpl: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        highwaySweetSpotPercent: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        normalRoadSweetSpotPercent: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        hillsRoadSweetSpotPercent: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        purposeOfTrial: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfSale: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        trailId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fromPlace: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        toPlace: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        presentLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employeeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vecvReportingPerson: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employeePhoneNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employeeCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dicvInchargeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dicvInchargePhoneNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dealerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capitalizedVehicleOrCustomerVehicle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customerVehicle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capitalizedVehicle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coDriverName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coDriverPhoneNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        driverStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customerDriverName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customerDriverNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicleNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageVideoUrls: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        inchargeSign: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        trialKMPL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicleOdometerStartingReading: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicleOdometerEndingReading: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        trialKMS: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        trialAllocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        region: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        allocation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "shift_logs",
        timestamps: true,
    }
);
