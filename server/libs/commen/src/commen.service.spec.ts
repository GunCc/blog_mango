import { Test, TestingModule } from '@nestjs/testing';
import { CommenService } from './commen.service';

describe('CommenService', () => {
  let service: CommenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommenService],
    }).compile();

    service = module.get<CommenService>(CommenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
