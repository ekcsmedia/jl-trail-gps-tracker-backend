// src/infrastructure/models/Document.ts
import {
    Table, Column, Model, DataType, PrimaryKey, Default,
    AllowNull, Unique, CreatedAt, UpdatedAt, Index, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import {DriverModel} from "./driver.model";

@Table({ tableName: 'documents' })
export class DocumentModel extends Model<DocumentModel> {
    @PrimaryKey @Default(DataType.UUIDV4) @Column(DataType.UUID)
    declare id: string;

    @Index @AllowNull(true) @Column(DataType.STRING)
    declare userId: string | null;

    // NEW: link to driver (nullable until claimed)
    @ForeignKey(() => DriverModel)
    @Index
    @AllowNull(true)
    @Column(DataType.UUID)
    declare driverId: string | null;

    @AllowNull(false) @Column(DataType.STRING)
    declare bucket: string;

    @AllowNull(false) @Unique @Column(DataType.STRING)
    declare key: string;

    @AllowNull(true) @Column(DataType.STRING)
    declare contentType: string | null;

    @AllowNull(true) @Column(DataType.BIGINT)
    declare size: number | null;

    @AllowNull(false) @Column(DataType.STRING)
    declare url: string;

    // store draftId, documentType, etc. in metadata
    @AllowNull(true) @Column(DataType.JSON)
    declare metadata: {
        originalName?: string;
        draftId?: string;
        documentType?: string; // e.g., 'AADHAAR','DL','PHOTO'
    } | null;

    @CreatedAt @Column(DataType.DATE) declare createdAt: Date;
    @UpdatedAt @Column(DataType.DATE) declare updatedAt: Date;

    @BelongsTo(() => DriverModel)
    declare driver?: DriverModel;
}
