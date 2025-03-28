import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'drivers', timestamps: true })
export class DriverModel extends Model {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    phone!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    employeeId!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    address!: string;
}
