// src/infrastructure/models/Document.ts
import {
    Table, Column, Model, DataType, PrimaryKey, Default,
    AllowNull, Unique, CreatedAt, UpdatedAt, Index
} from 'sequelize-typescript';

@Table({ tableName: 'documents' })
export class DocumentModel extends Model<DocumentModel> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Index
    @AllowNull(true)
    @Column(DataType.STRING)
    declare userId: string | null;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare bucket: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    declare key: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    declare contentType: string | null;

    @AllowNull(true)
    @Column(DataType.BIGINT)
    declare size: number | null;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare url: string;

    @AllowNull(true)
    @Column(DataType.JSON)
    declare metadata: Record<string, any> | null;

    @CreatedAt
    @Column(DataType.DATE)
    declare createdAt: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare updatedAt: Date;
}
