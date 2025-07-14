import fastify from 'fastify';
import driverRoutes from "./infrastructure/routes/driver.routes";
import {sequelize} from "./utils/database";
import clientRoutes from "./infrastructure/routes/client.route";
import dailyReportRoutes from "./infrastructure/routes/shift.route";
import cors from '@fastify/cors';
import {formSubmissionRoutes} from "./infrastructure/routes/form.submission.route";
import driverLocationRoutes from "./infrastructure/routes/driver.location.routes";
import otpServicesRoutes from "./utils/otp-services/send-otp";
import fastifyJwt from "@fastify/jwt";
import dotenv from 'dotenv';
import {authRoutes} from "./infrastructure/controllers/auth.controller";
import dashboardRoutes from "./infrastructure/routes/dashboard.route";
import {trialFormRoutes} from "./infrastructure/routes/trial_form.routes";

dotenv.config();

const app = fastify(); // sever

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecretkey', // Use env variable
});

app.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});

app.register(cors, {
    origin: '*', // Allows all domains (not recommended for production)
});

app.register(driverRoutes);
app.register(clientRoutes);
app.register(dailyReportRoutes);
app.register(formSubmissionRoutes);
app.register(driverLocationRoutes);
app.register(otpServicesRoutes);
app.register(authRoutes);
app.register(dashboardRoutes);
app.register(trialFormRoutes);


// setupTrialFormAssociations();

app.get('/', async () => {
    return { message: 'Welcome to Fastify Clean Architecture with MySQL!!!!' };
});

app.get('/api/protected', { preHandler: [app.authenticate] }, async (request, reply) => {
    return { secure: true, user: request.user };
});

// Sync database
sequelize.sync({ alter: true }) // Use `alter: true` for schema updates
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Database sync error:', err));

export default app;
