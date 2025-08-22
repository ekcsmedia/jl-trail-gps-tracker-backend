import {
    Table, Column, Model, DataType, HasMany
} from 'sequelize-typescript';
import { TripDetailModel } from './TripDetailModel';
import { ParticipantModel } from './ParticipantModel';
import { PhotoModel } from './PhotoModel';

@Table({ tableName: 'sign_offs' })
export class SignOffModel extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    declare customerName: string;

    @Column({ type: DataType.FLOAT, allowNull: true })
    declare customerExpectedFE: number | null;

    @Column({ type: DataType.FLOAT, allowNull: true })
    declare beforeTrialsFE: number | null;

    @Column({ type: DataType.FLOAT, allowNull: true })
    declare afterTrialsFE: number | null;

    @Column({ type: DataType.JSON, allowNull: true })
    declare customerVehicleDetails: object | null;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare issuesFoundDuringTrial: string | null;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare trialRemarks: string | null;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare customerRemarks: string | null;

    @Column({ type: DataType.ENUM('DRIVER', 'ADMIN'), allowNull: false })
    declare createdByRole: 'DRIVER' | 'ADMIN';

    @HasMany(() => TripDetailModel)
    declare tripDetails?: TripDetailModel[];

    @HasMany(() => ParticipantModel)
    declare participants?: ParticipantModel[];

    @HasMany(() => PhotoModel)
    declare photos?: PhotoModel[];
}