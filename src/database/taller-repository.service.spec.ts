import { Test, TestingModule } from '@nestjs/testing';
import { TallerRepositoryService } from './taller-repository.service';

describe('TallerRepositoryService', () => {
  let service: TallerRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TallerRepositoryService],
    }).compile();

    service = module.get<TallerRepositoryService>(TallerRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
