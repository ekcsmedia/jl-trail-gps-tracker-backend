import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { LocationModel } from './location.model';

@Table({ tableName: 'drivers', timestamps: true })
export class DriverModel extends Model {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    phone!: string;  // Make sure phone is a string to match with LocationModel

    @Column({ type: DataType.STRING, allowNull: false })
    employeeId!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    address!: string;

    // ✅ Use the @HasOne decorator directly here to set up the relationship.
    @HasOne(() => LocationModel, { foreignKey: 'phone', sourceKey: 'phone', as: 'locationSettings' })
    locationSettings!: LocationModel;
}
