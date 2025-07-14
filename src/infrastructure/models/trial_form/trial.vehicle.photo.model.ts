import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TrialForm } from './trail.form.model';

@Table({ tableName: 'trial_vehicle_photos', timestamps: true })
export class TrialVehiclePhoto extends Model {
    @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
    id!: number;

    @ForeignKey(() => TrialForm)
    @Column({ type: DataType.BIGINT, allowNull: false })
    trial_form_id!: number;

    @Column(DataType.TEXT)
    url!: string;

    @BelongsTo(() => TrialForm)
    trialForm!: TrialForm;
}
