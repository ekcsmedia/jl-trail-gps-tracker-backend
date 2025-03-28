import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'clients', timestamps: true })
export class ClientModel extends Model {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    clientDetails!: string;

    @Column({ type: DataType.BIGINT, allowNull: false })
    phone!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    address!: string;
}
