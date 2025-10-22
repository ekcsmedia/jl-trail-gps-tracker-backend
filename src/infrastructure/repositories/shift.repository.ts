import {ShiftLogModel} from "../models/daily.report.model";
import {ShiftLogRepository} from "../../core/interfaces/shift.interface";
import {ShiftLog, ShiftLogEntityWithoutId} from "../../core/entities/daily.report.entity";
import {Op, WhereOptions} from "sequelize";

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
        const where: WhereOptions = {};

        // Date range (assuming your column is "date" of type DATE or STRING ISO)
        if (start || end) {
            // inclusive end-of-day
            const startDate = start ? new Date(`${start}T00:00:00.000Z`) : undefined;
            const endDate = end ? new Date(`${end}T23:59:59.999Z`) : undefined;

            if (startDate && endDate) {
                (where as any).date = { [Op.between]: [startDate, endDate] };
            } else if (startDate) {
                (where as any).date = { [Op.gte]: startDate };
            } else if (endDate) {
                (where as any).date = { [Op.lte]: endDate };
            }
        }

        // Driver query: matches name/code/phone
        if (driver && driver.trim()) {
            const q = `%${driver.trim()}%`;
            (where as any)[Op.or] = [
                { employeeName: { [Op.iLike]: q } },
                { employeeCode: { [Op.iLike]: q } },
                { employeePhoneNo: { [Op.iLike]: q } },
            ];
        }

        const limit = pageSize;
        const offset = (page - 1) * pageSize;

        const { rows, count } = await ShiftLogModel.findAndCountAll({
            where,
            limit,
            offset,
            order: [['date', 'DESC'], ['id', 'DESC']], // adjust as needed
        });

        // Return plain JSON
        return {
            rows: rows.map(r => r.toJSON()),
            count,
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
