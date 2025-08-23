import jwt from "jsonwebtoken";

export function signDriverJWT(driverId: string) {
    return jwt.sign(
        { id: driverId, role: "driver" },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );
}

export function signAdminJWT(adminId: string) {
    return jwt.sign(
        { id: adminId, role: "admin" },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    );
}

export function authorizeRole(roles: string[]) {
    return async (req, reply) => {
        if (!roles.includes(req.user.role)) {
            return reply.code(403).send({ message: "Forbidden" });
        }
    };
}
