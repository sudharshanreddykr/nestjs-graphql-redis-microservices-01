import { CandidateService } from './candidate.service';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
export declare class CandidateResolver {
    private readonly candidateService;
    constructor(candidateService: CandidateService);
    private logger;
    createCandidate(createCandidateInput: CreateCandidateInput): Promise<{
        name: string;
        email: string;
        dateOfBirth: Date;
        age: number;
    } & Candidate>;
    findAll(): Promise<Candidate[]>;
    findOne(id: string): Promise<Candidate>;
    updateCandidate(updateCandidateInput: UpdateCandidateInput): Promise<Candidate>;
    removeCandidate(id: string): Promise<Candidate>;
}
