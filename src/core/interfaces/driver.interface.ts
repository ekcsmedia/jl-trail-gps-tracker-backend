import { DriverEntity } from '../entities/driver.entity';

export interface DriverRepository {
    create(driver: DriverEntity): Promise<DriverEntity>;
    findById(id: string): Promise<DriverEntity | null>;
    findAll(): Promise<DriverEntity[]>;
    update(id: string, driver: Partial<DriverEntity>): Promise<DriverEntity | null>;
    delete(id: string): Promise<boolean>;

}
