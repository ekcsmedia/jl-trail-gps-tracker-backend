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
import {documentRoutes} from "./infrastructure/routes/document.routes";
import multipart from "@fastify/multipart";
import {driverDocumentsRoutes} from "./infrastructure/routes/driver-documents.routes";
import {filesRoutes} from "./infrastructure/routes/files.routes";

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

app.register(multipart, { limits: { fileSize: 50 * 1024 * 1024 } });


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
app.register(documentRoutes);
app.register(driverDocumentsRoutes);
app.register(filesRoutes);

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


app.post('/api/distancematrix', async (request, reply) => {
    // Expected body: { origins: ["lat,lng"], destinations: ["lat,lng"] }
    // The client sends an array even if it's just one origin/destination.
    const { origins, destinations } = request.body as any;

    if (!origins || !destinations || !Array.isArray(origins) || !Array.isArray(destinations)) {
        return reply.status(400).send({ error: 'Missing or invalid origins or destinations arrays.' });
    }

    if (origins.length === 0 || destinations.length === 0) {
        return reply.status(400).send({ error: 'Origins and destinations arrays must not be empty.' });
    }

    const distanceMatrixUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';

    try {
        const response = await axios.get(distanceMatrixUrl, {
            params: {
                // Joins the array of strings into a comma-separated string required by Google
                origins: origins.join('|'),
                destinations: destinations.join('|'),
                mode: 'driving',
                // This parameter is crucial for calculating a time based on current traffic
                // which is what your frontend uses to get a more accurate ETA.
                departure_time: 'now',
                key: GOOGLE_MAPS_API_KEY, // Key is used securely on the backend
            },
        });

        // Forward the response from Google Maps back to the client
        return response.data;

    } catch (error) {
        // Log the error for server-side debugging
        console.log(`Error fetching distance matrix: ${error.message}`);

        // Respond with a generic 500 error to the client
        return reply.status(500).send({ error: 'Failed to fetch distance matrix from external API.' });
    }
});


// Sync database
sequelize.sync({ alter: true }) // Use `alter: true` for schema updates
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Database sync error:', err));

export default app;
