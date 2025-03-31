import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DriverModel } from './driver.model';

@Table({ tableName: 'locations', timestamps: true })
export class LocationModel extends Model {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id!: string;

    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.STRING, allowNull: false })
    phone!: string;  // Make sure this matches the type in DriverModel

    @Column({ type: DataType.FLOAT, allowNull: false })
    latitude!: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    longitude!: number;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    timestamp!: Date;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isIdle!: boolean;

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    locationEnabled!: boolean;

    // ✅ Use the @BelongsTo decorator directly here to set up the inverse relationship.
    @BelongsTo(() => DriverModel, { foreignKey: 'phone', targetKey: 'phone', as: 'driver' })
    driver!: DriverModel;
}
