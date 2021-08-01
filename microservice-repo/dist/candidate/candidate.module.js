"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const candidate_service_1 = require("./candidate.service");
const candidate_resolver_1 = require("./candidate.resolver");
const candidate_entity_1 = require("./entities/candidate.entity");
const bull_1 = require("@nestjs/bull");
const candidate_consumer_1 = require("./candidate.consumer");
let CandidateModule = class CandidateModule {
};
CandidateModule = __decorate([
    common_1.Module({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'notification',
                redis: {
                    port: 6379,
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([candidate_entity_1.Candidate]),
        ],
        providers: [candidate_resolver_1.CandidateResolver, candidate_service_1.CandidateService, candidate_consumer_1.CandidateConsumer],
    })
], CandidateModule);
exports.CandidateModule = CandidateModule;
//# sourceMappingURL=candidate.module.js.map