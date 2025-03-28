import { Sequelize } from 'sequelize-typescript';
import { SequelizeOptions, ModelCtor, Model } from "sequelize-typescript";  // ✅ Import ModelCtor
import dotenv from 'dotenv';
import { DriverModel } from "../infrastructure/models/driver.model";
import { ClientModel } from "../infrastructure/models/client.model";
import { LocationModel } from "../infrastructure/models/location.model";

dotenv.config();

// ✅ Explicitly cast models to ModelCtor<Model<any, any>> to avoid TypeScript error
const models: ModelCtor<Model<any, any>>[] = [
    DriverModel as ModelCtor<Model<any, any>>,
    ClientModel as ModelCtor<Model<any, any>>,
    LocationModel as ModelCtor<Model<any, any>>
];

// ✅ Define Sequelize options with explicit typing
const sequelizeOptions: SequelizeOptions = {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'mysql.railway.internal',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'OvVDjoBHUSmwQbBaEUBqgCqcrwuyhest',
    database: process.env.DB_NAME || 'railway',
    models,  // ✅ Pass the explicitly typed models
    logging: console.log,  // ✅ Log raw SQL queries
};

// ✅ Create Sequelize instance with typed options
export const sequelize = new Sequelize(sequelizeOptions);

// ✅ Ensure database connection on app startup
sequelize.authenticate()
    .then(() => console.log('✅ Database connection established'))
    .catch((err) => console.error('❌ Unable to connect to the database:', err));
