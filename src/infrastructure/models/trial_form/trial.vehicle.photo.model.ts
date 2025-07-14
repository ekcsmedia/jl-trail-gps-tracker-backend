import { Model, DataTypes } from 'sequelize';
import {sequelize} from "../../../utils/database";

export default class TrialVehiclePhoto extends Model {}

TrialVehiclePhoto.init({
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    trial_form_id: { type: DataTypes.BIGINT, allowNull: false },
    url: DataTypes.TEXT
}, { sequelize, tableName: 'trial_vehicle_photos' });
