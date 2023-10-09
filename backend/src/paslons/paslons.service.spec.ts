import { Test, TestingModule } from '@nestjs/testing';
import { PaslonsService } from './paslons.service';

describe('PaslonsService', () => {
  let service: PaslonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaslonsService],
    }).compile();

    service = module.get<PaslonsService>(PaslonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
