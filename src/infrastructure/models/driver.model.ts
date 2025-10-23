import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { LocationModel } from './location.model';

@Table({ tableName: 'drivers', timestamps: true })
export class DriverModel extends Model {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    phone!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    employeeId!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    address!: string;

    @Column({ type: DataType.JSON, allowNull: false })
    proofDocs!: string[];

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    approved!: boolean;

    @Column({ type: DataType.STRING, allowNull: true })
    deviceId!: string;

    // NEW: Driving license expiry (date-only)
    @Column({ type: DataType.DATEONLY, allowNull: true })
    drivingLicenseExpiryDate?: string | Date;

    @HasOne(() => LocationModel, { foreignKey: 'phone', sourceKey: 'phone', as: 'locationSettings' })
    locationSettings!: LocationModel;
}
