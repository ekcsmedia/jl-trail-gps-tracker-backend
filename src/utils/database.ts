import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();

// ✅ Initialize Sequelize instance
export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'mysql.railway.internal',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'OvVDjoBHUSmwQbBaEUBqgCqcrwuyhest',
    database: process.env.DB_NAME || 'railway',
    logging: console.log,
});

// ✅ Authenticate and add models AFTER Sequelize instance is created
sequelize.authenticate()
    .then(async () => {
        console.log('✅ Database connection established');

        // Import models after Sequelize is initialized
        const { DriverModel } = await import("../infrastructure/models/driver.model");
        const { ClientModel } = await import("../infrastructure/models/client.model");
        const { LocationModel } = await import("../infrastructure/models/location.model");

        // ✅ Add models dynamically after Sequelize instance is ready
        sequelize.addModels([DriverModel, ClientModel, LocationModel]);
        console.log('✅ Models added successfully');
    })
    .catch((err) => console.error('❌ Unable to connect to the database:', err));
