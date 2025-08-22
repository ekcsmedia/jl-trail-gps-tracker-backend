export interface Participant {
    id?: number;
    signOffId?: number;
    role: 'CSM' | 'PC' | 'DRIVER' | 'CUSTOMER';
    name?: string;
    signatureUrl?: string; // stored path/url
}

