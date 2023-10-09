import { Test, TestingModule } from '@nestjs/testing';
import { PaslonsController } from './paslons.controller';

describe('PaslonsController', () => {
  let controller: PaslonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaslonsController],
    }).compile();

    controller = module.get<PaslonsController>(PaslonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
