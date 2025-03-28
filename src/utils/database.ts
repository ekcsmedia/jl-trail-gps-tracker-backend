import {Model, ModelCtor, Sequelize} from 'sequelize-typescript';
import dotenv from 'dotenv';
import { DriverModel } from "../infrastructure/models/driver.model";
import { ClientModel } from "../infrastructure/models/client.model";
import { LocationModel } from "../infrastructure/models/location.model";

dotenv.config();

// ✅ Sequelize instance
export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'mysql.railway.internal',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'OvVDjoBHUSmwQbBaEUBqgCqcrwuyhest',
    database: process.env.DB_NAME || 'railway',
    logging: console.log,  // ✅ Log raw SQL queries
    models: [],             // ✅ Initialize Sequelize without models first
});

const models: ModelCtor<Model<any, any>>[] = [
    DriverModel as ModelCtor<Model<any, any>>,
    ClientModel as ModelCtor<Model<any, any>>,
    LocationModel as ModelCtor<Model<any, any>>
];
// ✅ Add models after Sequelize instance is created
sequelize.addModels(models);

// ✅ Ensure database connection on app startup
sequelize.authenticate()
    .then(() => console.log('✅ Database connection established'))
    .catch((err) => console.error('❌ Unable to connect to the database:', err));
