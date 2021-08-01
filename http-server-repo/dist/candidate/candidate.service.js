"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const candidate_entity_1 = require("./entities/candidate.entity");
let CandidateService = class CandidateService {
    constructor(candidateRepository, client) {
        this.candidateRepository = candidateRepository;
        this.client = client;
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 8877,
            },
        });
    }
    accumulate(data) {
        return this.client.send('add', data);
    }
    async create(createCandidateInput) {
        const { name, email, dateOfBirth } = createCandidateInput;
        var year = dateOfBirth.getFullYear();
        var month = dateOfBirth.getMonth();
        var day = dateOfBirth.getDate();
        let today = new Date();
        var d = today.getFullYear();
        let age = d - year;
        if (today.getMonth() < month ||
            (today.getMonth() == month && today.getDate() < day)) {
            age--;
        }
        return await this.candidateRepository.save({
            name: name,
            email: email,
            dateOfBirth: dateOfBirth,
            age: age,
        });
    }
    async findAll() {
        return await this.candidateRepository.find();
    }
    async findOne(id) {
        return await this.candidateRepository.findOne(id);
    }
    async update(id, updateCandidateInput) {
        const candidate = await this.candidateRepository.create(updateCandidateInput);
        const update = await this.candidateRepository.update({ id: updateCandidateInput.id }, candidate);
        if (update.affected === 1) {
            return candidate;
        }
    }
    async remove(id) {
        const candidate = await this.candidateRepository.findOne(id);
        if (!candidate) {
            throw new common_1.HttpException('Not Found', 404);
        }
        const del = await this.candidateRepository.delete(id);
        if (del.affected === 1) {
            return candidate;
        }
    }
};
CandidateService = __decorate([
    common_2.Injectable(),
    __param(0, typeorm_1.InjectRepository(candidate_entity_1.Candidate)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        microservices_1.ClientProxy])
], CandidateService);
exports.CandidateService = CandidateService;
//# sourceMappingURL=candidate.service.js.map