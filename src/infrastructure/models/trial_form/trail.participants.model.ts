import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TrialForm } from './trail.form.model';

@Table({ tableName: 'trial_participants', timestamps: true })
export class TrialParticipant extends Model {
    @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
    id!: number;

    @ForeignKey(() => TrialForm)
    @Column({ type: DataType.BIGINT, allowNull: false })
    trial_form_id!: number;

    @Column(DataType.ENUM('CSM', 'PC', 'Driver', 'Customer'))
    role!: 'CSM' | 'PC' | 'Driver' | 'Customer';

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.TEXT)
    sign!: string;

    @BelongsTo(() => TrialForm)
    trialForm!: TrialForm;
}
