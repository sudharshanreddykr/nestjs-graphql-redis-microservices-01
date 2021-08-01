import { Repository } from 'typeorm';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { LoginDto } from './dto/LoginDto';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Candidate } from './entities/candidate.entity';
import { Queue } from 'bull';
export declare class CandidateService {
    private queue;
    private candidateRepository;
    private readonly logger;
    constructor(queue: Queue, candidateRepository: Repository<Candidate>);
    findByEmail(email: string): Promise<Candidate>;
    hashPassword(password: string): Promise<string>;
    private validateUser;
    login(loginDto: LoginDto): Promise<any>;
    create(createCandidateInput: CreateCandidateInput): Promise<{
        name: string;
        email: string;
        dateOfBirth: Date;
        age: number;
        password: string;
    } & Candidate>;
    findAll(): Promise<Candidate[]>;
    findOne(id: string): Promise<Candidate>;
    update(id: string, updateCandidateInput: UpdateCandidateInput): Promise<Candidate>;
    remove(id: string): Promise<Candidate>;
}
