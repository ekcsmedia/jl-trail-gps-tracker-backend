import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { LocationModel } from './location.model';

@Table({ tableName: 'drivers', timestamps: true })
export class DriverModel extends Model {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    phone!: string;  // Make sure phone is a string to match with LocationModel

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


    // ✅ Use the @HasOne decorator directly here to set up the relationship.
    @HasOne(() => LocationModel, { foreignKey: 'phone', sourceKey: 'phone', as: 'locationSettings' })
    locationSettings!: LocationModel;
}
