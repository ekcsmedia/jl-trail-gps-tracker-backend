import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../utils/database";  // Your Sequelize instance

export class DriverModel extends Model {}

DriverModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.BIGINT,   // Use BIGINT for large phone numbers
            allowNull: false,
        },
        employeeId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,              // Your Sequelize instance
        tableName: "drivers",   // Table name in the DB
        timestamps: true,       // Automatically adds `createdAt` and `updatedAt`
    }
);
