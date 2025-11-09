// src/routes/driver-documents.routes.ts
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Op } from "sequelize";
import {DocumentModel} from "../models/Document";

export const driverDocumentsRoutes = fp(async (app: FastifyInstance) => {

    // Attach by explicit document IDs
    app.post<{
        Params: { driverId: string },
        Body: { documentIds: string[] }
    }>("/drivers/:driverId/documents/attach", async (req, reply) => {
        const { driverId } = req.params;
        const { documentIds } = req.body || { documentIds: [] };
        if (!Array.isArray(documentIds) || documentIds.length === 0) {
            return reply.code(400).send({ ok: false, error: "documentIds required" });
        }
        const [count] = await DocumentModel.update(
            { driverId },
            { where: { id: { [Op.in]: documentIds } } }
        );
        return reply.send({ ok: true, updated: count });
    });

    // Attach all docs that share a draftId
    app.post<{
        Params: { driverId: string },
        Body: { draftId: string }
    }>("/drivers/:driverId/documents/claim", async (req, reply) => {
        const { driverId } = req.params;
        const { draftId } = req.body || { draftId: "" };
        if (!draftId) return reply.code(400).send({ ok: false, error: "draftId required" });

        const [count] = await DocumentModel.update(
            { driverId },
            { where: { driverId: null, metadata: { draftId } } as any } // MySQL JSON filter via sequelize-typescript (works on dialects with JSON)
        );

        // If MySQL 5.7/8 JSON filter fails via ORM, fallback:
        // await sequelize.query('UPDATE documents SET driverId=? WHERE driverId IS NULL AND JSON_EXTRACT(metadata, "$.draftId") = ?', { replacements: [driverId, `"${draftId}"`] });

        return reply.send({ ok: true, updated: count });
    });
});
