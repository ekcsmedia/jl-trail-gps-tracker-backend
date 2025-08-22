import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { SignOffModel } from './SignOffModel';

@Table({ tableName: 'trip_details' })
export class TripDetailModel extends Model {
    @ForeignKey(() => SignOffModel)
    @Column({ type: DataType.INTEGER })
    declare signOffId: number;

    @BelongsTo(() => SignOffModel)
    declare signOff?: SignOffModel;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare tripNo: number; // 1..6

    @Column(DataType.STRING)
    declare tripRoute: string;

    @Column(DataType.DATE)
    declare tripStartDate: Date | null;

    @Column(DataType.DATE)
    declare tripEndDate: Date | null;

    @Column(DataType.FLOAT)
    declare startKm: number | null;

    @Column(DataType.FLOAT)
    declare endKm: number | null;

    @Column(DataType.FLOAT)
    declare tripKm: number | null;

    @Column(DataType.FLOAT)
    declare maxSpeed: number | null;

    @Column(DataType.FLOAT)
    declare weightGVW: number | null;

    @Column(DataType.FLOAT)
    declare actualDieselLtrs: number | null;

    @Column(DataType.FLOAT)
    declare totalTripKm: number | null;

    @Column(DataType.FLOAT)
    declare actualFE: number | null; // kmpl
}