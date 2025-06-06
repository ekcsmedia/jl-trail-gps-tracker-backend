import {LocationModel} from "../models/location.model";
import {DriverModel} from "./driver.repositories";

export class LocationRepository {
    static async createLocation(data: any) {
        return LocationModel.upsert(data);
    }

    static async getDriverLocations(phone: string) {
        return LocationModel.findOne({
            where: { phone },
            order: [['timestamp', 'DESC']],
        });
    }

    static async getAllDriverLocations() {
        return LocationModel.findAll();
    }

    static async upsertLocation(phone: string, latitude: number, longitude: number, isIdle: boolean) {
        try {
            // Check if location exists by phone
            const existingLocation: any = await LocationModel.findOne({ where: { phone } });

            if (existingLocation) {
                // If driver is idle, do not update latitude and longitude
                if (isIdle) {
                    return {
                        message: "Driver is idle. Latitude and longitude not updated.",
                        location: existingLocation
                    };
                }

                // ✅ Update lat/lng if driver is not idle
                await existingLocation.update({ latitude, longitude, isIdle });

                return {
                    message: "Location updated successfully",
                    location: existingLocation
                };

            } else {
                // ✅ Create new location record if it doesn't exist
                const newLocation = await LocationModel.create({
                    phone,
                    latitude,
                    longitude,
                    isIdle
                });

                return {
                    message: "New location created successfully",
                    location: newLocation
                };
            }

        } catch (error) {
            console.error("Error in upsertLocation:", error);
            throw new Error("Failed to upsert location.");
        }
    }

    // ✅ Find driver by phone
    static async findByPhone(phone: string): Promise<LocationModel | null> {
        const driver = await LocationModel.findOne({ where: { phone } });

        if (!driver) return null;

        return driver;
    }

    // ✅ Update locationEnabled status by phone
    static async updateLocation(phone: string, locationEnabled: boolean): Promise<boolean> {
        const driver = await LocationModel.findOne({ where: { phone } });

        if (!driver) return false;

        driver.locationEnabled = locationEnabled;
        await driver.save();
        return true;
    }


}
