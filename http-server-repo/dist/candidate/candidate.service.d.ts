import { ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Candidate } from './entities/candidate.entity';
export declare class CandidateService {
    private candidateRepository;
    private client;
    constructor(candidateRepository: Repository<Candidate>, client: ClientProxy);
    accumulate(data: number[]): import("rxjs").Observable<number>;
    create(createCandidateInput: CreateCandidateInput): Promise<{
        name: string;
        email: string;
        dateOfBirth: Date;
        age: number;
    } & Candidate>;
    findAll(): Promise<Candidate[]>;
    findOne(id: string): Promise<Candidate>;
    update(id: string, updateCandidateInput: UpdateCandidateInput): Promise<Candidate>;
    remove(id: string): Promise<Candidate>;
}
