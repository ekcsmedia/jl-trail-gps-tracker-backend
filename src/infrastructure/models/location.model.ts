import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'locations' })
export class LocationModel extends Model  {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true})
    declare driverId: string

    @Column({ type: DataType.STRING, allowNull: true, unique: true})
    declare phone: string;

    @Column({ type: DataType.FLOAT, allowNull: false })
    declare latitude: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    declare longitude: number;

    @Column({ type: DataType.DATE, allowNull: false })
    declare timestamp: number;
}
