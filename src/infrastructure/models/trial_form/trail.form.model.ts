// infrastructure/models/trial_form/trial.form.model.ts
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import {TrialParticipant} from "./trail.participants.model";
import {TrialTrip} from "./trail.trip.details.model";
import {TrialVehiclePhoto} from "./trial.vehicle.photo.model";

@Table({ tableName: 'trial_forms', timestamps: true })
export class TrialForm extends Model {
    @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
    id!: number;

    @Column(DataType.STRING)
    customer_name!: string;

    @Column(DataType.FLOAT)
    customer_expected_fe!: number;

    @Column(DataType.FLOAT)
    before_trials_fe!: number;

    @Column(DataType.FLOAT)
    after_trials_fe!: number;

    @Column(DataType.STRING)
    trip_duration!: string;

    @Column(DataType.STRING)
    vehicle_no!: string;

    @Column(DataType.DATE)
    sale_date!: Date;

    @Column(DataType.STRING)
    model!: string;

    @Column(DataType.STRING)
    application!: string;

    @Column(DataType.TEXT)
    customer_verbatim!: string;

    @Column(DataType.TEXT)
    trip_route!: string;

    @Column(DataType.TEXT)
    issues_found_on_vehicle_check!: string;

    @Column(DataType.STRING)
    road_type!: string;

    @Column(DataType.DATE)
    vehicle_check_date!: Date;

    @Column(DataType.TEXT)
    customer_remarks!: string;

    @HasMany(() => TrialParticipant, { foreignKey: 'trial_form_id', as: 'participants' })
    participants!: TrialParticipant[];

    @HasMany(() => TrialTrip, { foreignKey: 'trial_form_id', as: 'trips' })
    trips!: TrialTrip[];

    @HasMany(() => TrialVehiclePhoto, { foreignKey: 'trial_form_id', as: 'photos' })
    photos!: TrialVehiclePhoto[];
}
