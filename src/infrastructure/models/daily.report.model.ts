import { Model, DataTypes } from "sequelize";
import {sequelize} from "../../utils/database";

export class ShiftLogModel extends Model {}

ShiftLogModel.init(
    {
        shift: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otHours: {
            type: DataTypes.FLOAT,
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
        fromPlace: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        toPlace: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fuelAvg: {
            type: DataTypes.FLOAT,
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
        inchargeSign: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        employeeName: {
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
        monthYear: {
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
        trailId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // Your Sequelize instance
        tableName: "shift_logs",
        timestamps: true,
    }
);
