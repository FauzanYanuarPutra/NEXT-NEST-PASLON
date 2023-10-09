import { Module } from '@nestjs/common';
import { PartiesController } from './parties.controller';
import { PartiesService } from './parties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Party } from './entity/party.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Party])],
  controllers: [PartiesController],
  providers: [PartiesService],
  exports: [PartiesService],
})
export class PartiesModule {}
