import fastify from 'fastify';
import driverRoutes from "./infrastructure/routes/driver.routes";
import {sequelize} from "./utils/database";
import clientRoutes from "./infrastructure/routes/client.route";
import dailyReportRoutes from "./infrastructure/routes/shift.route";
import cors from '@fastify/cors';
import {formSubmissionRoutes} from "./infrastructure/routes/form.submission.route";
import driverLocationRoutes from "./infrastructure/routes/driver.location.routes";

const app = fastify();


app.register(cors, {
    origin: '*', // Allows all domains (not recommended for production)
});

app.register(driverRoutes);
app.register(clientRoutes);
app.register(dailyReportRoutes);
app.register(formSubmissionRoutes);
app.register(driverLocationRoutes);

app.get('/', async () => {
    return { message: 'Welcome to Fastify Clean Architecture with MySQL!' };
});



// Sync database
sequelize.sync({ alter: true }) // Use `alter: true` for schema updates
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Database sync error:', err));

export default app;
