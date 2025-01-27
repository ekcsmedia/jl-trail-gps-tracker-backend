import { DriverEntity } from '../core/entities/driver.entity';
import {DriverRepository} from "../core/interfaces/driver.interface";

export class DriverUseCase {
    constructor(private driverRepository: DriverRepository) {}

    async createDriver(driver: DriverEntity): Promise<DriverEntity> {
        return this.driverRepository.create(driver);
    }

    async getDriver(id: string): Promise<DriverEntity | null> {
        return this.driverRepository.findById(id);
    }

    async getAllDrivers(): Promise<DriverEntity[]> {
        return this.driverRepository.findAll();
    }

    async updateDriver(id: string, driver: Partial<DriverEntity>): Promise<DriverEntity | null> {
        return this.driverRepository.update(id, driver);
    }

    async deleteDriver(id: string): Promise<boolean> {
        return this.driverRepository.delete(id);
    }
}
