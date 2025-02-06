import { DataTypes, Model } from "sequelize";
import {sequelize} from "../../utils/database";

export class DriverLocation extends Model {}

DriverLocation.init({
    driverId: { type: DataTypes.STRING, allowNull: false,  unique: true },
    latitude: { type: DataTypes.FLOAT, allowNull: true },
    longitude: { type: DataTypes.FLOAT, allowNull: true },
    isIdle: { type: DataTypes.BOOLEAN, defaultValue: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
}, { sequelize, modelName: "DriverLocation" });

export default DriverLocation;
