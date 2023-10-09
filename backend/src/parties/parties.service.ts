import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Party } from './entity/party.entity';
import { Repository } from 'typeorm';
import CreatePartyDto from './dtos/create-party.dto';

@Injectable()
export class PartiesService {
  constructor(@InjectRepository(Party) private readonly partiesRepository: Repository<Party>) { }
  
  async find() {
    return await this.partiesRepository.find();
  }

  async findById(id: string) {
    const NumID = parseInt(id);
    if(isNaN(NumID)) {
      throw new BadRequestException('ID must be a number');
    }
    return await this.partiesRepository.findOne({
      where: {
        id: NumID
      },
      relations: ['paslon']
    });
  }

  async create (body: CreatePartyDto) {
    const { name, paslon } = body;

    
    if (body.name) {
      const existingParty = await this.findByName(body.name);
      if (existingParty) {
        throw new BadRequestException('Party name must be unique.');
      }
    }

    const party = this.partiesRepository.create({
      name,
      paslon,
    })

    const result = await this.partiesRepository.save(party)

    const data = {
      name: result.name
    }

    return data
  }

  async findByName(name: string) {
    const result = await this.partiesRepository.findOne({ where: { name } });
    return result
  }

  async update(paslonId: string ,id: string, data: Partial<Party>) {
    const party = await this.findById(id); 

    if (data.name && data.name !== party.name) {
      const existingParty = await this.findByName(data.name);
      if (existingParty) {
        throw new BadRequestException('');
      }
    }
  
    if (Number(paslonId) !== party.paslon.id) {
      throw new BadRequestException('Party ID must be unique.');
    }

    await this.partiesRepository.update(id, data);
    return await this.findById(id); 
  }

  async delete(id: string) {
    const party = await this.findById(id); 
    await this.partiesRepository.remove(party);
  }
}




