import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Exam } from 'core/entities';
import { IPFSService } from 'core/services/ipfs.service';
import { SecretJsService } from 'core/services/secretjs.service';
import { CreateExam } from 'modules/exam/dto/create-exam.dto';
import { UpdateExam } from 'modules/exam/dto/update-exam.dto';
import { UploadQuestions } from 'modules/user/dto/UploadQuestions';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: EntityRepository<Exam>,
    private readonly ipfsService: IPFSService,
    private readonly secretjsService: SecretJsService,
  ) {}

  async create(payload: CreateExam) {
    const exam = this.examRepository.create({
      ...payload,
      organizations: payload.organizationIds,
    });

    return await this.examRepository.persistAndFlush(exam);
  }

  async find() {
    await this.secretjsService.saveExam({});
    return await this.examRepository.findAll();
  }

  async findOne(id: string) {
    const exam = await this.examRepository.findOne({ id });
    if (!exam) throw new NotFoundException('Exam does not exist');

    return exam;
  }

  async update(id: string, payload: UpdateExam) {
    const exam = await this.findOne(id);
    exam.assign(payload);

    return await this.examRepository.persistAndFlush(exam);
  }

  async remove(id: string) {
    const exam = this.findOne(id);
    return await this.examRepository.removeAndFlush(exam);
  }

  async uploadQuestions(
    id: string,
    payload: UploadQuestions,
    walletAddres: string,
  ) {
    //validira da li uopste moze ova fja da se izvrsi na contract-u...samo query
    const isParlament = 'true';

    if (!isParlament)
      throw new BadRequestException('Wallet address is not parlament address');

    const exam = await this.examRepository.find(
      { id },
      { populate: ['students', 'organizations'] },
    );
    const credentials = await this.ipfsService.upload(payload.questions);
    //creadentials i info iz exam-a se salju na contract
    const contractId = 'Ovde se pozove fja SaveExam na contract-u';

    //
  }

  async assignContract(id: string, contractId: string) {}
}
