import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();

// ✅ Initialize Sequelize instance
export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'mysql.railway.internal',
    port: 3306,
    username: 'root',
    password: 'OvVDjoBHUSmwQbBaEUBqgCqcrwuyhest',
    database: 'railway',
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
        // const {FormSubmissionModel} = await import("../infrastructure/models/form.submission.model")
        // ✅ Add models dynamically after Sequelize instance is ready
        sequelize.addModels([DriverModel, ClientModel, LocationModel]);
        console.log('✅ Models added successfully');
        await sequelize.sync({ alter: true });  // 👈 This will recreate missing tables
        console.log('✅ Database synchronized');
    })
    .catch((err) => console.error('❌ Unable to connect to the database:', err));
