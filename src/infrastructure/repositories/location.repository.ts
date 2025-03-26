import {LocationModel} from "../models/location.model";

export class LocationRepository {
    static async createLocation(data: any) {
        return LocationModel.upsert(data);
    }

    static async getDriverLocations(phone: string) {
        return LocationModel.findAll({
            where: { phone },
            order: [['timestamp', 'DESC']],
        });
    }

    static async getAllDriverLocations() {
        return LocationModel.findAll({
            order: [['timestamp', 'DESC']],
        });
    }
}
