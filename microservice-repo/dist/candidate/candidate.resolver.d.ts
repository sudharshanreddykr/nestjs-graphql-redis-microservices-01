import { CandidateService } from './candidate.service';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { LoginDto } from './dto/LoginDto';
export declare class CandidateResolver {
    private readonly candidateService;
    constructor(candidateService: CandidateService);
    createCandidate(createCandidateInput: CreateCandidateInput): Promise<{
        name: string;
        email: string;
        dateOfBirth: Date;
        age: number;
        password: string;
    } & Candidate>;
    findAll(): Promise<Candidate[]>;
    login(loginDto: LoginDto): Promise<any>;
    findOne(id: string): Promise<Candidate>;
    updateCandidate(updateCandidateInput: UpdateCandidateInput): Promise<Candidate>;
    removeCandidate(id: string): Promise<Candidate>;
}
