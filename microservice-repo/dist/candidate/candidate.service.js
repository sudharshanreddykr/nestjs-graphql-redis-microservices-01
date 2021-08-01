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
var CandidateService_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const candidate_entity_1 = require("./entities/candidate.entity");
const bcrypt = require("bcrypt");
const bull_1 = require("@nestjs/bull");
const bull_2 = require("bull");
let CandidateService = CandidateService_1 = class CandidateService {
    constructor(queue, candidateRepository) {
        this.queue = queue;
        this.candidateRepository = candidateRepository;
        this.logger = new common_1.Logger(CandidateService_1.name);
    }
    async findByEmail(email) {
        return this.candidateRepository.findOne({ where: { email: email } });
    }
    async hashPassword(password) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    }
    async validateUser(loginDto) {
        try {
            const { email, password } = loginDto;
            const user = await this.findByEmail(email);
            if (!user) {
                throw new common_1.HttpException({ message: 'User not found' }, 404);
            }
            console.log(user);
            if (password !== user.password) {
                throw new common_1.HttpException({ message: 'Invalid login details' }, 401);
            }
            return Promise.resolve(user);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async login(loginDto) {
        return this.validateUser(loginDto).then((user) => {
            return Promise.resolve(this.logger.log('login Successful'));
        });
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
        await this.queue.add('create', {
            name: name,
            email: email,
            dateOfBirth: dateOfBirth,
            age: age,
            password: '12345',
        });
        return await this.candidateRepository.save({
            name: name,
            email: email,
            dateOfBirth: dateOfBirth,
            age: age,
            password: '12345',
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
CandidateService = CandidateService_1 = __decorate([
    common_2.Injectable(),
    __param(0, bull_1.InjectQueue('notification')),
    __param(1, typeorm_1.InjectRepository(candidate_entity_1.Candidate)),
    __metadata("design:paramtypes", [typeof (_a = typeof bull_2.Queue !== "undefined" && bull_2.Queue) === "function" ? _a : Object, typeorm_2.Repository])
], CandidateService);
exports.CandidateService = CandidateService;
//# sourceMappingURL=candidate.service.js.map