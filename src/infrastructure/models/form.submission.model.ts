// infrastructure/models/FormSubmissionModel.ts
import { DataTypes, Model } from 'sequelize';
import {sequelize} from "../../utils/database";

class FormSubmission extends Model {
    public id!: number;
    public location!: string;
    public date!: string;
    public masterDriverName!: string;
    public empCode!: string;
    public mobileNo!: string;
    public customerDriverName!: string;
    public customerMobileNo!: string;
    public licenseNo!: string;
    public vehicleDetails!: any[];
    public competitorData!: any[];
}

FormSubmission.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        location: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.STRING, allowNull: false },
        masterDriverName: { type: DataTypes.STRING, allowNull: false },
        empCode: { type: DataTypes.STRING, allowNull: false },
        mobileNo: { type: DataTypes.STRING, allowNull: false },
        customerDriverName: { type: DataTypes.STRING, allowNull: false },
        customerMobileNo: { type: DataTypes.STRING, allowNull: false },
        licenseNo: { type: DataTypes.STRING, allowNull: false },
        vehicleDetails: { type: DataTypes.JSON, allowNull: false },
        competitorData: { type: DataTypes.JSON, allowNull: false }
    },
    {
        sequelize,
        tableName: 'form_submissions'
    }
);

export default FormSubmission;
