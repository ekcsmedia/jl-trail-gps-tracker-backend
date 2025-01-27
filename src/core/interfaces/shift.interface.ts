import {ShiftLog} from "../entities/daily.report.entity";

export interface ShiftLogRepository {
    create(shiftLog: ShiftLog): Promise<ShiftLog>;
    findById(id: string): Promise<ShiftLog | null>;
    findAll(): Promise<ShiftLog[]>;
    update(id: string, shiftLog: Partial<ShiftLog>): Promise<ShiftLog | null>;
    delete(id: string): Promise<boolean>;
}
