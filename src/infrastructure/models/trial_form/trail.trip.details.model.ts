import { Model, DataTypes } from 'sequelize';
import {sequelize} from "../../../utils/database";

export default class TrialTrip extends Model {}

TrialTrip.init({
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    trial_form_id: { type: DataTypes.BIGINT, allowNull: false },
    trip_no: DataTypes.STRING,
    trip_route: DataTypes.TEXT,
    trip_start_date: DataTypes.DATE,
    trip_end_date: DataTypes.DATE,
    start_km: DataTypes.FLOAT,
    end_km: DataTypes.FLOAT,
    trip_km: DataTypes.FLOAT,
    max_speed: DataTypes.FLOAT,
    weight_gvw: DataTypes.FLOAT,
    actual_diesel_ltrs: DataTypes.FLOAT,
    total_trip_km: DataTypes.FLOAT,
    actual_fe_kmpl: DataTypes.FLOAT,
    issues_found: DataTypes.TEXT,
    trial_remarks: DataTypes.TEXT
}, { sequelize, tableName: 'trial_trips' });
