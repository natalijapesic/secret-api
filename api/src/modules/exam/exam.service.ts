import { LoadStrategy } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Exam, Role, User } from 'core/entities';
import { IPFSService } from 'core/services/ipfs.service';
import { CreateExamRequest } from 'modules/exam/dto/create-exam.request';
import { UpdateExamRequest } from 'modules/exam/dto/update-exam.request';
import { UploadQuestionsRequest } from 'modules/exam/dto/upload-questions.request';
import { UploadQuestionsResponse } from 'modules/exam/dto/upload-questions.response';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: EntityRepository<Exam>,
    private readonly ipfsService: IPFSService,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(payload: CreateExamRequest) {
    const exam = this.examRepository.create(payload);

    await this.examRepository.persistAndFlush(exam);

    return exam;
  }

  async findAll() {
    const exams = await this.examRepository.findAll();

    if (!exams.length) throw new NotFoundException('Exams do not exist');

    return exams;
  }

  async findOne(id: string) {
    const exam = await this.examRepository.findOne({ id });

    if (!exam) throw new NotFoundException('Exam does not exist');

    return exam;
  }

  async update(id: string, payload: UpdateExamRequest) {
    const exam = await this.findOne(id);

    exam.assign(payload);

    await this.examRepository.persistAndFlush(exam);

    return exam;
  }

  async remove(id: string) {
    const exam = this.findOne(id);
    return await this.examRepository.removeAndFlush(exam);
  }

  async upload(
    payload: UploadQuestionsRequest,
  ): Promise<UploadQuestionsResponse> {
    const parlament = await this.userRepository.findOne({
      walletAddress: { $eq: payload.walletAddres },
      role: { $eq: Role.Parlament },
    });

    if (!parlament)
      throw new BadRequestException('Wallet address is not parlament address');

    const exam = await this.examRepository.findOne(
      {
        isReady: { $eq: true },
      },
      {
        strategy: LoadStrategy.SELECT_IN,
        populate: ['users'],
        populateWhere: { users: { role: { $eq: Role.Organization } } },
      },
    );

    Logger.log('exam', exam);

    if (!exam) throw new BadRequestException('Exam is not ready for upload');
    Logger.log(payload.questions);

    const ipfsInfo = await this.ipfsService.upload(payload.questions);

    Logger.log(ipfsInfo);

    const organizationAddresses = exam.users
      .getItems()
      .map((organization) => organization.walletAddress);

    return { ipfsInfo, organizationAddresses };
  }

  async assignContract(id: string, contractId: string) {
    const exam = await this.examRepository.findOne(id);

    exam.contractId = contractId;
  }

  async updateUserRelation(id: string, userIds: string[]) {
    const exam = await this.examRepository.findOne(id);

    if (!exam) throw new BadRequestException('Exam doesnt exist');

    const users = userIds.map((id) => this.userRepository.getReference(id));

    if (!users.length) throw new BadRequestException('Users do not exist');

    exam.users.add(users);

    await this.examRepository.persistAndFlush(exam);

    return exam;
  }
}
