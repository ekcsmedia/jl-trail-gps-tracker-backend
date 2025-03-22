import {LocationModel} from "../models/location.model";

export class LocationRepository {
    static async createLocation(data: any) {
        return LocationModel.upsert(data);
    }

    static async getDriverLocations(driverId: string) {
        return LocationModel.findAll({
            where: { driverId },
            order: [['timestamp', 'DESC']],
        });
    }
}
