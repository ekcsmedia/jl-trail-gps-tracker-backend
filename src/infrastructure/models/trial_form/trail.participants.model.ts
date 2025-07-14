import { Model, DataTypes } from 'sequelize';
import {sequelize} from "../../../utils/database";

export default class TrialParticipant extends Model {}

TrialParticipant.init({
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    trial_form_id: { type: DataTypes.BIGINT, allowNull: false },
    role: DataTypes.ENUM('CSM','PC','Driver','Customer'),
    name: DataTypes.STRING,
    sign: DataTypes.TEXT
}, { sequelize, tableName: 'trial_participants' });
