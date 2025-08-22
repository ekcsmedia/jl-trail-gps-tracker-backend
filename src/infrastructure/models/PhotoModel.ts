import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { SignOffModel } from './SignOffModel';

@Table({ tableName: 'photos' })
export class PhotoModel extends Model {
    @ForeignKey(() => SignOffModel)
    @Column({ type: DataType.INTEGER })
    declare signOffId: number;

    @BelongsTo(() => SignOffModel)
    declare signOff?: SignOffModel;

    @Column(DataType.STRING)
    declare fileUrl: string;

    @Column(DataType.STRING)
    declare caption: string;
}