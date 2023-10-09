import { Module } from '@nestjs/common';
import { PaslonsController } from './paslons.controller';
import { PaslonsService } from './paslons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paslon } from './entity/paslon.entity';
import { PartiesModule } from 'src/parties/parties.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Paslon]), PartiesModule, CloudinaryModule],
  controllers: [PaslonsController],
  providers: [PaslonsService],
  exports: [PaslonsService],
})
export class PaslonsModule {}
