export class FormSubmissionEntity {
    constructor(
        public id: string,
        public location: string,
        public date: string,
        public masterDriverName: string,
        public empCode: string,
        public mobileNo: string,
        public customerDriverName: string,
        public customerMobileNo: string,
        public licenseNo: string,
        public vehicleDetails: any[], // Array of vehicle details
        public competitorData: any[], // Array of competitor vehicle details
        public imageVideoUrls: any[]
    ) {}
}
