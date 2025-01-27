import {ShiftLogModel} from "../models/daily.report.model";
import {ShiftLogRepository} from "../../core/interfaces/shift.interface";
import {ShiftLog, ShiftLogEntityWithoutId} from "../../core/entities/daily.report.entity";

export class ShiftLogRepositoryImpl implements ShiftLogRepository {
    async create(shiftLog: ShiftLogEntityWithoutId): Promise<ShiftLog> {
        const created = await ShiftLogModel.create(shiftLog);
        return created.toJSON() as ShiftLog;
    }

    async findById(id: string): Promise<ShiftLog | null> {
        const log = await ShiftLogModel.findByPk(id);
        return log ? (log.toJSON() as ShiftLog) : null;
    }

    async findAll(): Promise<ShiftLog[]> {
        const logs = await ShiftLogModel.findAll();
        return logs.map((log) => log.toJSON() as ShiftLog);
    }

    async update(id: string, shiftLog: Partial<ShiftLog>): Promise<ShiftLog | null> {
        const existingLog = await ShiftLogModel.findByPk(id);
        if (!existingLog) return null;
        await existingLog.update(shiftLog);
        return existingLog.toJSON() as ShiftLog;
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await ShiftLogModel.destroy({ where: { id } });
        return deleted > 0;
    }
}
