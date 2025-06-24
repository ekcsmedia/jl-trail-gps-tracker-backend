export class DriverEntity {
    constructor(
        public id: string,
        public name: string,
        public phone: number,
        public employeeId: string,
        public address: string,
        public proofDocs: string[],
    ) {}
}
