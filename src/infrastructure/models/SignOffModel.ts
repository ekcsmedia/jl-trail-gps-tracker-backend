import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    Default,
    AllowNull,
} from 'sequelize-typescript';
import { TripDetailModel } from './TripDetailModel';
import { ParticipantModel } from './ParticipantModel';
import { PhotoModel } from './PhotoModel';

@Table({
    tableName: 'sign_offs',
    timestamps: true, // createdAt / updatedAt
})
export class SignOffModel extends Model {
    /* ========================
     * BASIC DETAILS
     * ======================== */

    @AllowNull(true)
    @Column(DataType.STRING)
    declare customerName: string | null;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    declare customerExpectedFE: number | null;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    declare beforeTrialsFE: number | null;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    declare afterTrialsFE: number | null;

    @AllowNull(true)
    @Column(DataType.JSON)
    declare customerVehicleDetails: Record<string, any> | null;

    @AllowNull(true)
    @Column(DataType.TEXT)
    declare issuesFoundDuringTrial: string | null;

    @AllowNull(true)
    @Column(DataType.TEXT)
    declare trialRemarks: string | null;

    @AllowNull(true)
    @Column(DataType.TEXT)
    declare customerRemarks: string | null;

    /* ========================
     * ROLE & OWNERSHIP
     * ======================== */

    @AllowNull(false)
    @Column(DataType.ENUM('DRIVER', 'ADMIN'))
    declare createdByRole: 'DRIVER' | 'ADMIN';

    @AllowNull(true)
    @Column(DataType.TEXT)
    declare driverId: string | null;

    @AllowNull(true)
    @Column(DataType.TEXT)
    declare createdBy: string | null;

    /* ========================
     * TRIAL COMPLETION (KEY)
     * ======================== */

    // ✅ Checkbox-driven confirmation
    @Default(false)
    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    declare trialCompleted: boolean;

    /* ========================
     * STATUS & SUBMISSION
     * ======================== */

    @Default('DRAFT')
    @AllowNull(false)
    @Column(DataType.ENUM('DRAFT', 'SUBMITTED'))
    declare status: 'DRAFT' | 'SUBMITTED';

    @AllowNull(true)
    @Column(DataType.DATE)
    declare submittedAt: Date | null;

    /* ========================
     * ASSOCIATIONS
     * ======================== */

    @HasMany(() => TripDetailModel, { onDelete: 'CASCADE' })
    declare tripDetails?: TripDetailModel[];

    @HasMany(() => ParticipantModel, { onDelete: 'CASCADE' })
    declare participants?: ParticipantModel[];

    @HasMany(() => PhotoModel, { onDelete: 'CASCADE' })
    declare photos?: PhotoModel[];
}
