import { PopulateHint } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
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
    const exam = this.examRepository.create({
      ...payload,
    });

    await this.examRepository.persistAndFlush(exam);

    return exam;
  }

  async find() {
    return await this.examRepository.findAll();
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

  async uploadQuestions(
    payload: UploadQuestionsRequest,
  ): Promise<UploadQuestionsResponse> {
    const parlament = await this.userRepository.findOne({
      walletAddress: { $eq: payload.walletAddres },
    });

    if (!parlament)
      throw new BadRequestException('Wallet address is not parlament address');

    const exam = await this.examRepository.findOne(
      {
        id: { $eq: payload.examId },

        isReady: { $eq: true },

        users: { role: { $eq: Role.Organization } },
      },
      { populateWhere: PopulateHint.INFER },
    );

    if (!exam) throw new BadRequestException('Exam is not ready for upload');

    const ipfsInfo = await this.ipfsService.upload(payload.questions);

    const organizationAddresses = exam.users.getItems().map(
      (organization) => organization.walletAddress,
    );

    return { ipfsInfo, organizationAddresses };
  }

  async assignContract(id: string, contractId: string) {
    const exam = await this.examRepository.findOne(id);

    exam.contractId = contractId;
  }
}
