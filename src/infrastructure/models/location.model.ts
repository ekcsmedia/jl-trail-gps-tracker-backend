import {Table, Column, Model, DataType, ForeignKey} from 'sequelize-typescript';
import {DriverModel} from "./driver.model";

@Table({ tableName: 'locations', timestamps: true })
export class LocationModel extends Model {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id!: string;

    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    phone!: string;

    @Column({ type: DataType.FLOAT, allowNull: false })
    latitude!: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    longitude!: number;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    timestamp!: Date;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isIdle!: boolean;

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    declare locationEnabled: boolean;
}
