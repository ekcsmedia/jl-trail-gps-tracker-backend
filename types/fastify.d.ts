// types/fastify.d.ts
import 'fastify';

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: any;
    }

    interface FastifyRequest {
        user: any; // Optional: if you want to use request.user from jwtVerify
    }
}
