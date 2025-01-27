import { DriverEntity } from '../../core/entities/driver.entity';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import {DriverRepository} from "../../core/interfaces/driver.interface";

@Table({ tableName: 'drivers' })
export class DriverModel extends Model<DriverEntity, Omit<DriverEntity, 'id'>> {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    declare id: string; // Use declare to avoid the TS2612 error

    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.BIGINT, allowNull: false })
    declare phone: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare employeeId: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare address: string;
}

export class DriverRepositoryImpl implements DriverRepository {
    async create(driver: DriverEntity): Promise<DriverEntity> {
        const created = await DriverModel.create({
            name: driver.name,
            phone: driver.phone,
            employeeId: driver.employeeId,
            address: driver.address,
        });
        return created.toJSON() as DriverEntity;
    }

    async findById(id: string): Promise<DriverEntity | null> {
        const driver = await DriverModel.findByPk(id);
        return driver ? (driver.toJSON() as DriverEntity) : null;
    }

    async findAll(): Promise<DriverEntity[]> {
        const drivers = await DriverModel.findAll();
        return drivers.map((driver) => driver.toJSON() as DriverEntity);
    }

    async update(id: string, driver: Partial<DriverEntity>): Promise<DriverEntity | null> {
        const existingDriver = await DriverModel.findByPk(id);
        if (!existingDriver) return null;
        await existingDriver.update(driver);
        return existingDriver.toJSON() as DriverEntity;
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await DriverModel.destroy({ where: { id } });
        return deleted > 0;
    }
}
