// infrastructure/models/Document.ts
import {
    Table, Column, Model, DataType, PrimaryKey, Default, AllowNull, Unique, Index,
    CreatedAt, UpdatedAt
} from 'sequelize-typescript';

@Table({ tableName: 'documents' })
export class Document extends Model<Document> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Index
    @AllowNull(true)
    @Column(DataType.STRING)
    userId!: string | null;

    @AllowNull(false)
    @Column(DataType.STRING)
    bucket!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    key!: string;  // e.g. uploads/2025/11/09/uuid_filename.pdf

    @AllowNull(true)
    @Column(DataType.STRING)
    contentType!: string | null;

    @AllowNull(true)
    @Column(DataType.BIGINT)
    size!: number | null;

    @AllowNull(false)
    @Column(DataType.STRING)
    url!: string;  // public or base URL for presigned GET

    @AllowNull(true)
    @Column(DataType.JSON)
    metadata!: Record<string, any> | null;

    @CreatedAt
    @Column(DataType.DATE)
    createdAt!: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    updatedAt!: Date;
}
