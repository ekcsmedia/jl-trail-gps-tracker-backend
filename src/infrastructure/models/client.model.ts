import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ClientEntity } from '../../core/entities/client.entity';

@Table({ tableName: 'clients' })
export class ClientModel extends Model<ClientEntity> {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare clientDetails: string;

    @Column({ type: DataType.BIGINT, allowNull: false })
    declare phone: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare address: string;
}
