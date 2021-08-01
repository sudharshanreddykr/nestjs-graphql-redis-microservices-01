import { HttpException, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { LoginDto } from './dto/LoginDto';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Candidate } from './entities/candidate.entity';
import * as bcrypt from 'bcrypt';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class CandidateService {
  private readonly logger = new Logger(CandidateService.name);
  constructor(
    @InjectQueue('notification') private queue: Queue,
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {}
  async findByEmail(email: string) {
    return this.candidateRepository.findOne({ where: { email: email } });
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  private async validateUser(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.findByEmail(email);
      if (!user) {
        throw new HttpException({ message: 'User not found' }, 404);
      }
      console.log(user);
      if (password !== user.password) {
        throw new HttpException({ message: 'Invalid login details' }, 401);
      }
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async login(loginDto: LoginDto): Promise<any> {
    return this.validateUser(loginDto).then((user) => {
      return Promise.resolve(this.logger.log('login Successful'));
    });
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
