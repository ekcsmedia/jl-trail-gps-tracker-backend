// infrastructure/models/FormSubmissionModel.ts

import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'form_submissions', timestamps: false })
export class FormSubmissionModel extends Model {
    @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    location!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    date!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    masterDriverName!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    empCode!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    mobileNo!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    customerDriverName!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    customerMobileNo!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    licenseNo!: string;

    @Column({ type: DataType.JSON, allowNull: false })
    vehicleDetails!: any[];

    @Column({ type: DataType.JSON, allowNull: false })
    competitorData!: any[];
}
