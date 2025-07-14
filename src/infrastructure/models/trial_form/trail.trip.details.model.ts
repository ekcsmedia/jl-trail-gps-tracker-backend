import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TrialForm } from './trail.form.model';

@Table({ tableName: 'trial_trips', timestamps: true })
export class TrialTrip extends Model {
    @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
    id!: number;

    @ForeignKey(() => TrialForm)
    @Column({ type: DataType.BIGINT, allowNull: false })
    trial_form_id!: number;

    @Column(DataType.STRING)
    trip_no!: string;

    @Column(DataType.TEXT)
    trip_route!: string;

    @Column(DataType.DATE)
    trip_start_date!: Date;

    @Column(DataType.DATE)
    trip_end_date!: Date;

    @Column(DataType.FLOAT)
    start_km!: number;

    @Column(DataType.FLOAT)
    end_km!: number;

    @Column(DataType.FLOAT)
    trip_km!: number;

    @Column(DataType.FLOAT)
    max_speed!: number;

    @Column(DataType.FLOAT)
    weight_gvw!: number;

    @Column(DataType.FLOAT)
    actual_diesel_ltrs!: number;

    @Column(DataType.FLOAT)
    total_trip_km!: number;

    @Column(DataType.FLOAT)
    actual_fe_kmpl!: number;

    @Column(DataType.TEXT)
    issues_found!: string;

    @Column(DataType.TEXT)
    trial_remarks!: string;

    @BelongsTo(() => TrialForm)
    trialForm!: TrialForm;
}
