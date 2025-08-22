import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { SignOffModel } from './SignOffModel';

@Table({ tableName: 'participants' })
export class ParticipantModel extends Model {
    @ForeignKey(() => SignOffModel)
    @Column({ type: DataType.INTEGER })
    declare signOffId: number;

    @BelongsTo(() => SignOffModel)
    declare signOff?: SignOffModel;

    @Column(DataType.ENUM('CSM','PC','DRIVER','CUSTOMER'))
    declare role: 'CSM' | 'PC' | 'DRIVER' | 'CUSTOMER';

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare signatureUrl: string; // uploaded file path or external URL
}