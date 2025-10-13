import dotenv from 'dotenv';
dotenv.config();
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
import {authRoutes} from "./infrastructure/controllers/auth.controller";
import dashboardRoutes from "./infrastructure/routes/dashboard.route";
import {trialFormRoutes} from "./infrastructure/routes/trial_form.routes";
import {signoffRoutes} from "./infrastructure/routes/signoffRoutes";
import jwt from "jsonwebtoken";
import {transitRoutes} from "./infrastructure/routes/transit.route";
const axios = require('axios');


const app = fastify(); // sever

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecretkey', // Use env variable
});


app.decorate("authenticate", async (req, reply) => {
    try {
        const payload = await req.jwtVerify();
        req.user = payload; // { id, role }
    } catch (err) {
        reply.code(401).send({ message: "Unauthorized" });
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
app.register(signoffRoutes);
app.register(transitRoutes);
// setupTrialFormAssociations();

app.get('/', async () => {
    return { message: 'Welcome to Fastify Clean Architecture with MySQL!!!!' };
});

app.get('/api/protected', { preHandler: [app.authenticate] }, async (request, reply) => {
    return { secure: true, user: request.user };
});

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

app.post('/api/directions', async (request, reply) => {
    // Expected body: { origin: "lat,lng", destination: "lat,lng" }
    const { origin, destination } = request.body as any;

    if (!origin || !destination) {
        return reply.status(400).send({ error: 'Missing origin or destination coordinates.' });
    }

    const directionsUrl = 'https://maps.googleapis.com/maps/api/directions/json';

    try {
        const response = await axios.get(directionsUrl, {
            params: {
                origin: origin,
                destination: destination,
                mode: 'driving',
                alternatives: false,
                departure_time: 'now',
                traffic_model: 'best_guess',
                key: GOOGLE_MAPS_API_KEY, // Key is used securely on the backend
            },
        });

        // Forward the response from Google Maps back to the client
        return response.data;

    } catch (error) {
        console.log(`Error fetching directions: ${error.message}`);
        return reply.status(500).send({ error: 'Failed to fetch directions from external API.' });
    }
});

// Sync database
sequelize.sync({ alter: true }) // Use `alter: true` for schema updates
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Database sync error:', err));

export default app;
