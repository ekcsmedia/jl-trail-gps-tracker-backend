import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'locations', timestamps: true })
export class LocationModel extends Model {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    phone!: string;

    @Column({ type: DataType.FLOAT, allowNull: false })
    latitude!: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    longitude!: number;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    timestamp!: Date;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isIdle!: boolean;
}
