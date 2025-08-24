// src/infrastructure/models/TransitModel.ts
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    Default,
} from 'sequelize-typescript';
import {DriverModel} from "./driver.model";

@Table({ tableName: 'transits' })
export class TransitModel extends Model {
    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.UUID, allowNull: false })
    declare driverId: string;

    @Column({ type: DataType.FLOAT, allowNull: false })
    declare startLatitude: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    declare startLongitude: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    declare endLatitude: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    declare endLongitude: number;

    @Default('ONGOING')
    @Column({ type: DataType.ENUM('ONGOING', 'COMPLETED'), allowNull: false })
    declare status: 'ONGOING' | 'COMPLETED';

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    declare startedAt: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    declare endedAt: Date | null;

    @BelongsTo(() => DriverModel)
    declare driver: DriverModel;
}
