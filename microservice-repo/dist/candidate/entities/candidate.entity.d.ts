export declare class Candidate {
    id: string;
    name: string;
    email: string;
    dateOfBirth: Date;
    age: number;
    password: string;
    hashPassword(): Promise<void>;
}
