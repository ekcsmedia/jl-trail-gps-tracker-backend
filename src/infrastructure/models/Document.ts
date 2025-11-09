import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from "../../utils/database";

interface DocumentAttributes {
    id: string;
    userId: string | null;
    bucket: string;
    key: string;            // e.g. uploads/2025/11/09/uuid_filename.pdf
    contentType: string | null;
    size: number | null;
    url: string;            // public GET url (or presign via route)
    metadata?: object | null;
    createdAt?: Date;
    updatedAt?: Date;
}

type DocumentCreation = Optional<DocumentAttributes, "id"|"url"|"metadata"|"userId"|"contentType"|"size">;

export class Document extends Model<DocumentAttributes, DocumentCreation> implements DocumentAttributes {
    public id!: string;
    public userId!: string | null;
    public bucket!: string;
    public key!: string;
    public contentType!: string | null;
    public size!: number | null;
    public url!: string;
    public metadata?: object | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Document.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    userId: { type: DataTypes.STRING, allowNull: true },
    bucket: { type: DataTypes.STRING, allowNull: false },
    key: { type: DataTypes.STRING, allowNull: false, unique: true },
    contentType: { type: DataTypes.STRING, allowNull: true },
    size: { type: DataTypes.BIGINT, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: false },
    metadata: { type: DataTypes.JSON, allowNull: true },
}, {
    sequelize,
    tableName: "documents",
});
