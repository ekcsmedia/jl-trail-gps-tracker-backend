import {ShiftLogRepositoryImpl} from "../infrastructure/repositories/shift.repository";
import {ShiftLog, ShiftLogEntityWithoutId} from "../core/entities/daily.report.entity";

export class ShiftUseCases {
    constructor(private shiftRepository: ShiftLogRepositoryImpl) {}

    async createShift(shift: ShiftLogEntityWithoutId): Promise<ShiftLog> {
        return this.shiftRepository.create(shift);
    }

    async getShift(id: string): Promise<ShiftLog | null> {
        return this.shiftRepository.findById(id);
    }

    async getAllShifts(): Promise<ShiftLog[]> {
        return this.shiftRepository.findAll();
    }

    async updateShift(id: string, shift: Partial<ShiftLog>): Promise<ShiftLog | null> {
        return this.shiftRepository.update(id, shift);
    }

    async deleteShift(id: string): Promise<boolean> {
        return this.shiftRepository.delete(id);
    }
}

