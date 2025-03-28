import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../utils/database";
import {DriverModel} from "./driver.model";  // Your Sequelize instance

export class LocationModel extends Model {
}

LocationModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            references: {
                model: DriverModel,
                key: "phone"
            }
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,  // ✅ Sets default to current timestamp
        },
        isIdle: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,              // Your Sequelize instance
        tableName: "locations",
        timestamps: true,       // Automatically adds `createdAt` and `updatedAt`
    }
);
