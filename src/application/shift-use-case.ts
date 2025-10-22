import {ShiftLogRepositoryImpl} from "../infrastructure/repositories/shift.repository";
import {ShiftLog, ShiftLogEntityWithoutId} from "../core/entities/daily.report.entity";

type GetAllParams = {
    page: number;
    pageSize: number;
    start?: string;
    end?: string;
    driver?: string;
};


export class ShiftUseCases {
    constructor(private shiftRepository: ShiftLogRepositoryImpl) {}

    async createShift(shift: ShiftLogEntityWithoutId): Promise<ShiftLog> {
        return this.shiftRepository.create(shift);
    }

    async getShift(id: string): Promise<ShiftLog | null> {
        return this.shiftRepository.findById(id);
    }


    async getAllShifts(params: GetAllParams) {
        const { rows, count } = await this.shiftRepository.findAll(params);
        const { page, pageSize } = params;
        const total = count;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));

        return {
            items: rows,
            page,
            pageSize,
            total,
            totalPages,
        };
    }

    async updateShift(id: string, shift: Partial<ShiftLog>): Promise<ShiftLog | null> {
        return this.shiftRepository.update(id, shift);
    }

    async deleteShift(id: string): Promise<boolean> {
        return this.shiftRepository.delete(id);
    }
}

