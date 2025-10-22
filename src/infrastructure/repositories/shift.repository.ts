import {ShiftLogModel} from "../models/daily.report.model";
import {ShiftLogRepository} from "../../core/interfaces/shift.interface";
import {ShiftLog, ShiftLogEntityWithoutId} from "../../core/entities/daily.report.entity";
import {col, fn, Op, where, WhereOptions} from "sequelize";

type FindAllParams = {
    page: number;
    pageSize: number;
    start?: string;
    end?: string;
    driver?: string;
};




export class ShiftLogRepositoryImpl implements ShiftLogRepository {
    async create(shiftLog: ShiftLogEntityWithoutId): Promise<ShiftLog> {
        const created = await ShiftLogModel.create(shiftLog);
        return created.toJSON() as ShiftLog;
    }

    async findById(id: string): Promise<ShiftLog | null> {
        const log = await ShiftLogModel.findByPk(id);
        return log ? (log.toJSON() as ShiftLog) : null;
    }



 async findAll({ page, pageSize, start, end, driver }: FindAllParams) {
    const whereClause: WhereOptions = {};

    // ---- Date range on inTime (recommended) ----
    // Expect start/end as "YYYY-MM-DD" (UTC). We match full days inclusively.
    if (start || end) {
        const startDate = start ? new Date(`${start}T00:00:00.000Z`) : undefined;
        const endDate   = end   ? new Date(`${end}T23:59:59.999Z`) : undefined;

        if (startDate && endDate) {
            (whereClause as any).inTime = { [Op.between]: [startDate, endDate] };
        } else if (startDate) {
            (whereClause as any).inTime = { [Op.gte]: startDate };
        } else if (endDate) {
            (whereClause as any).inTime = { [Op.lte]: endDate };
        }
    }

    // ---- Driver filter: LOWER(col) LIKE %term% (portable & case-insensitive) ----
    const driverTerm = (driver ?? '').trim().toLowerCase();
    if (driverTerm) {
        const like = `%${driverTerm}%`;
        (whereClause as any)[Op.or] = [
            where(fn('LOWER', col('employeeName')),       { [Op.like]: like }),
            where(fn('LOWER', col('employeeCode')),       { [Op.like]: like }),
            where(fn('LOWER', col('employeePhoneNo')),    { [Op.like]: like }),
            // Add other fields you want to match, e.g. customerDriverName:
            where(fn('LOWER', col('customerDriverName')), { [Op.like]: like }),
        ];
    }

    // ---- Pagination (clamped) ----
    const safePageSize = Math.min(100, Math.max(1, Number.isFinite(pageSize as any) ? pageSize : 20));
    const safePage = Math.max(1, Number.isFinite(page as any) ? page : 1);
    const limit = safePageSize;
    const offset = (safePage - 1) * safePageSize;

    // ---- Query ----
    const { rows, count } = await ShiftLogModel.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        // Prefer ordering by a proper timestamp; fall back to id for stability
        order: [
            ['inTime', 'DESC'],
            ['id', 'DESC'],
        ],
    });

    return {
        rows: rows.map(r => r.toJSON()),
        count,
        // (optional) uncomment if you want these too:
        // page: safePage,
        // pageSize: safePageSize,
        // totalPages: Math.max(1, Math.ceil(count / safePageSize)),
    };
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
