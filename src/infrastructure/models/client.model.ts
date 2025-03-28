import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../utils/database";  // Your Sequelize instance

export class ClientModel extends Model {}

ClientModel.init(
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
        clientDetails: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,           // Your Sequelize instance
        tableName: "clients",
        timestamps: true,     // Automatically adds `createdAt` and `updatedAt`
    }
);
