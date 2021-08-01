import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Candidate } from './entities/candidate.entity';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    private client: ClientProxy,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    });
  }
  public accumulate(data: number[]) {
    return this.client.send<number, number[]>('add', data);
  }
  async create(createCandidateInput: CreateCandidateInput) {
    const { name, email, dateOfBirth } = createCandidateInput;
    var year = dateOfBirth.getFullYear();
    var month = dateOfBirth.getMonth();
    var day = dateOfBirth.getDate();
    let today = new Date();
    var d = today.getFullYear();
    let age: number = d - year;
    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
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

  async findOne(id: string) {
    return await this.candidateRepository.findOne(id);
  }

  async update(id: string, updateCandidateInput: UpdateCandidateInput) {
    const candidate = await this.candidateRepository.create(
      updateCandidateInput,
    );
    const update = await this.candidateRepository.update(
      { id: updateCandidateInput.id },
      candidate,
    );
    if (update.affected === 1) {
      return candidate;
    }
  }

  async remove(id: string) {
    const candidate = await this.candidateRepository.findOne(id);
    if (!candidate) {
      throw new HttpException('Not Found', 404);
    }
    const del = await this.candidateRepository.delete(id);
    if (del.affected === 1) {
      return candidate;
    }
  }
}
