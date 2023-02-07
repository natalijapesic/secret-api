import { Test, TestingModule } from '@nestjs/testing';
import { ExamService } from 'modules/exam/exam.service';
import { authResponse } from 'shared/services/merkleTree';

describe('ExamService', () => {


  it('should be defined', () => {
    const leaves: string[] =[];

    leaves.push('a');
    leaves.push('b');
    leaves.push('c');

    authResponse(leaves, 'a');

    

  });
});
