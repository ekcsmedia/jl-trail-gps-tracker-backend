import app from "./app";
import 'reflect-metadata';

const startServer = async () => {
    try {
        const port = process.env.PORT || 3000;
        await app.listen({ port: Number(port), host: '0.0.0.0' });
        console.log(`Server running at http://localhost:${port}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
