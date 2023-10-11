import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paslon } from './entity/paslon.entity';
import { Repository } from 'typeorm';
import CreatePaslonDto from './dtos/create-paslon.dto';
import { PartiesService } from 'src/parties/parties.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import UpdatePaslonDto from './dtos/update-paslon.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PaslonsService {
  constructor(
    @InjectRepository(Paslon) private readonly paslonsRepository: Repository<Paslon>,
    private readonly partiesService: PartiesService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    private cloudinary: CloudinaryService,
  ) { }
  

  async find() {
    return await this.paslonsRepository.find({
      relations: ['parties', 'voter'],
      // select: {
      //   voter: {
      //     id: true,
      //     username: true,
      //   }
      // },
      order: {
        id: 'ASC'
      }
    });
  }

  async findById(id: string) {
    const NumID = Number(id);
    if (isNaN(NumID)) {
      throw new BadRequestException('ID must be a number');
    }
    return await this.paslonsRepository.findOne({
      where: {
        id: NumID
      },
      relations: ['parties', 'voter'],
      // select: {
      //   voter: {
      //     id: true,
      //   },
      // }
    });
  }

  async create(body: CreatePaslonDto, image: Express.Multer.File) {
    const { name, visi, parties } = body;

    const paslon = this.paslonsRepository.create({
      name,
      visi,
    });

    if (image) {
      const result = await this.uploadImageToCloudinary(image);
      paslon.image = result.url;
    }

    if (parties) {
      for (const party of parties) {
        const checkParties = await this.partiesService.findByName(party);
        if (checkParties) {
          throw new BadRequestException('Parties must be unique');
        }
      }
    }

    const result = await this.paslonsRepository.save(paslon);

    const createdParties = [];

    if (parties) {
      for (const party of parties) {
        const data = {
          name: party,
          paslon: result,
        };
        const createdParty = await this.partiesService.create(data);
        createdParties.push(createdParty);
      }
    }

    const data = {
      paslon: result,
      parties: createdParties,
      message: 'Paslon created',
    };

    return data;
  }

  async update(id: string, body: UpdatePaslonDto, image: Express.Multer.File) {
    const { name, visi, parties } = body;

    const paslon = await this.findById(id);

    paslon.name = name;
    paslon.visi = visi;

    if (image) {
      let public_id: string;

      if (paslon.image && paslon.image.includes('res.cloudinary.com')) {
        public_id = this.takePublicID(paslon.image);
      } else {
        public_id = paslon.image;
      }

      let result: any;

      if (!paslon.image) {
        result = await this.uploadImageToCloudinary(image);
      } else {
        result = await this.updateImage(public_id, image);
      }
      paslon.image = result.url;
    }

    const updatedPaslon = await this.paslonsRepository.save(paslon);

    const createdParties: any[] = [];

    if (parties && parties.length > 0 || paslon.parties.length > 0) {

      for (const party of parties) {
        const data = {
          name: party,
          paslon: updatedPaslon,
        };

        const existingParty = await this.partiesService.findByName(data.name);

        if (existingParty) {
          existingParty.paslon = updatedPaslon;
          const updatedParty = await this.partiesService.update(
            id,
            String(existingParty.id),
            existingParty
          );
          createdParties.push(updatedParty);
        } else {
          const createdParty = await this.partiesService.create(data);
          createdParties.push(createdParty);
        }
      }

      const partiesToRemove = updatedPaslon.parties.filter(
        (party) => !parties.includes(party.name)
      );

      for (const party of partiesToRemove) {
        await this.partiesService.delete(String(party.id));
      }
    }

    const data = {
      paslon: updatedPaslon,
      parties: createdParties,
      message: 'Paslon updated',
    };

    return data;
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Error uploading image');
    });
  }

  async updateImage(publicId: string, file: Express.Multer.File) {
    return await this.cloudinary.updateImage(publicId, file).catch(() => {
      throw  new BadRequestException('Error updating image');
    });
  }

  takePublicID(imageUrl: string) {
    const parts = imageUrl.split('/');
    const publicIdWithExtension = parts[parts.length - 1];
    const publicId = publicIdWithExtension.split('.')[0];
    return publicId;
  }

  async delete(id: string) {
    const paslon = await this.findById(id);

    if (paslon.image && paslon.image.includes('res.cloudinary.com')) {
      const public_id = this.takePublicID(paslon.image);
      await this.cloudinary.deleteImage(public_id);
    }

    if (paslon.parties.length > 0) {
      for (const party of paslon.parties) {
        await this.partiesService.delete(String(party.id));
      }
    }

    if (paslon.voter.length > 0) {
      for (const user of paslon.voter) {
        await this.usersService.updatePaslon(user.id);
      }
    }

    const deleteResult = await this.paslonsRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Paslon with ID ${id} not found`);
    }

    return deleteResult;
  }
}
