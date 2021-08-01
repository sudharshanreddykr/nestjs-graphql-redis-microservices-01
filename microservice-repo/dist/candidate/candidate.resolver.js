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
exports.CandidateResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const candidate_service_1 = require("./candidate.service");
const candidate_entity_1 = require("./entities/candidate.entity");
const create_candidate_input_1 = require("./dto/create-candidate.input");
const update_candidate_input_1 = require("./dto/update-candidate.input");
const LoginDto_1 = require("./dto/LoginDto");
let CandidateResolver = class CandidateResolver {
    constructor(candidateService) {
        this.candidateService = candidateService;
    }
    createCandidate(createCandidateInput) {
        return this.candidateService.create(createCandidateInput);
    }
    findAll() {
        return this.candidateService.findAll();
    }
    login(loginDto) {
        return this.candidateService.login(loginDto);
    }
    findOne(id) {
        return this.candidateService.findOne(id);
    }
    updateCandidate(updateCandidateInput) {
        return this.candidateService.update(updateCandidateInput.id, updateCandidateInput);
    }
    removeCandidate(id) {
        return this.candidateService.remove(id);
    }
};
__decorate([
    graphql_1.Mutation(() => candidate_entity_1.Candidate),
    __param(0, graphql_1.Args('createCandidateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_candidate_input_1.CreateCandidateInput]),
    __metadata("design:returntype", void 0)
], CandidateResolver.prototype, "createCandidate", null);
__decorate([
    graphql_1.Query(() => [candidate_entity_1.Candidate], { name: 'Allcandidate' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CandidateResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Mutation(() => candidate_entity_1.Candidate),
    __param(0, graphql_1.Args('login')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], CandidateResolver.prototype, "login", null);
__decorate([
    graphql_1.Query(() => candidate_entity_1.Candidate, { name: 'candidate' }),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CandidateResolver.prototype, "findOne", null);
__decorate([
    graphql_1.Mutation(() => candidate_entity_1.Candidate),
    __param(0, graphql_1.Args('updateCandidateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_candidate_input_1.UpdateCandidateInput]),
    __metadata("design:returntype", void 0)
], CandidateResolver.prototype, "updateCandidate", null);
__decorate([
    graphql_1.Mutation(() => candidate_entity_1.Candidate),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CandidateResolver.prototype, "removeCandidate", null);
CandidateResolver = __decorate([
    graphql_1.Resolver(() => candidate_entity_1.Candidate),
    __metadata("design:paramtypes", [candidate_service_1.CandidateService])
], CandidateResolver);
exports.CandidateResolver = CandidateResolver;
//# sourceMappingURL=candidate.resolver.js.map