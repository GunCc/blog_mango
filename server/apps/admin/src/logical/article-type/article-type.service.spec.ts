import { Test, TestingModule } from '@nestjs/testing';
import { ArticleTypeService } from './article-type.service';

describe('ArticleTypeService', () => {
  let service: ArticleTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleTypeService],
    }).compile();

    service = module.get<ArticleTypeService>(ArticleTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
