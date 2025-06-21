// infrastructure/models/FormSubmissionModel.ts

import { Table, Column, Model, DataType } from 'sequelize-typescript';
import {DataTypes} from "sequelize";

@Table({ tableName: 'form_submissions', timestamps: true })
export class FormSubmission extends Model {
    @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.STRING, allowNull: true })
    location!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    date!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    masterDriverName!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    empCode!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    mobileNo!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    customerDriverName!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    customerMobileNo!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    licenseNo!: string;

    @Column({ type: DataType.JSON, allowNull: true })
    vehicleDetails!: any[];

    @Column({ type: DataType.JSON, allowNull: true })
    competitorData!: any[];

    @Column({ type: DataType.JSON, allowNull: true })
    imageVideoUrls!: any[];
}
