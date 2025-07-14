import { Model, DataTypes } from 'sequelize';
import {sequelize} from "../../../utils/database";

export default class TrialForm extends Model {}

TrialForm.init({
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    customer_name: DataTypes.STRING,
    customer_expected_fe: DataTypes.FLOAT,
    before_trials_fe: DataTypes.FLOAT,
    after_trials_fe: DataTypes.FLOAT,
    trip_duration: DataTypes.STRING,
    vehicle_no: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    model: DataTypes.STRING,
    application: DataTypes.STRING,
    customer_verbatim: DataTypes.TEXT,
    trip_route: DataTypes.TEXT,
    issues_found_on_vehicle_check: DataTypes.TEXT,
    road_type: DataTypes.STRING,
    vehicle_check_date: DataTypes.DATE,
    customer_remarks: DataTypes.TEXT
}, { sequelize, tableName: 'trial_forms' });
