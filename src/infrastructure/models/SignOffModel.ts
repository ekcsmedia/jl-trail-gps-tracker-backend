import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    Default,
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

    // ✅ NEW FIELDS
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare driverId: number | null; // link to driver (FK if you have Drivers table)

    @Default('DRAFT')
    @Column({ type: DataType.ENUM('DRAFT', 'SUBMITTED'), allowNull: false })
    declare status: 'DRAFT' | 'SUBMITTED';

    @Column({ type: DataType.DATE, allowNull: true })
    declare submittedAt: Date | null;

    @HasMany(() => TripDetailModel)
    declare tripDetails?: TripDetailModel[];

    @HasMany(() => ParticipantModel)
    declare participants?: ParticipantModel[];

    @HasMany(() => PhotoModel)
    declare photos?: PhotoModel[];
}
