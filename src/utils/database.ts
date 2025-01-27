import { Sequelize } from 'sequelize-typescript';
import {DriverModel} from "../infrastructure/repositories/driver.repositories";
import {ClientModel} from "../infrastructure/models/client.model";

export const sequelize = new Sequelize({
    dialect: 'mysql', // Use MySQL as the dialect
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3308,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'trial',
    models: [DriverModel, ClientModel], // Add all your Sequelize models here
    logging: false, // Disable SQL query logging in the console
});

// Ensure database connection on app startup
sequelize.authenticate()
    .then(() => console.log('Database connection established'))
    .catch((err) => console.error('Unable to connect to the database:', err));
