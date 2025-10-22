import {ShiftLog} from "../entities/daily.report.entity";

export type ShiftLogFindParams = {
    page?: number;          // 1-based page (default 1)
    pageSize?: number;      // items per page (default 20; cap in repo)
    start?: string;         // YYYY-MM-DD (inclusive)
    end?: string;           // YYYY-MM-DD (inclusive)
    driver?: string;        // matches name/code/phone (case-insensitive)
};

export type ShiftLogFindResult = {
    rows: ShiftLog[];
    count: number;          // total rows matching the filter (for pagination)
};

export interface ShiftLogRepository {
    create(shiftLog: ShiftLog): Promise<ShiftLog>;
    findById(id: string): Promise<ShiftLog | null>;

    /**
     * Find with server-side pagination & filters.
     * If `page`/`pageSize` are omitted, repository may return all rows or apply sensible defaults.
     */
    findAll(params?: ShiftLogFindParams): Promise<ShiftLogFindResult>;

    update(id: string, shiftLog: Partial<ShiftLog>): Promise<ShiftLog | null>;
    delete(id: string): Promise<boolean>;
}
