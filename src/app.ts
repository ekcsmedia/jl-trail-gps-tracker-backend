import fastify from 'fastify';
import driverRoutes from "./infrastructure/routes/driver.routes";
import {sequelize} from "./utils/database";
import clientRoutes from "./infrastructure/routes/client.route";
import shiftRoutes from "./infrastructure/routes/shift.route";
import cors from '@fastify/cors';
import {formSubmissionRoutes} from "./infrastructure/routes/form.submission.route";

const app = fastify();


app.register(cors, {
    origin: '*', // Allows all domains (not recommended for production)
});

app.register(driverRoutes);
app.register(clientRoutes);
app.register(shiftRoutes);
app.register(formSubmissionRoutes);


app.get('/', async () => {
    return { message: 'Welcome to Fastify Clean Architecture with MySQL!' };
});



// Sync database
sequelize.sync({ alter: true }) // Use `alter: true` for schema updates
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Database sync error:', err));

export default app;
