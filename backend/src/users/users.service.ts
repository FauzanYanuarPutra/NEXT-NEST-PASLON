import { Injectable, Body, ConflictException, BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PaslonsService } from 'src/paslons/paslons.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    // private readonly paslonsService: PaslonsService,
    @Inject(forwardRef(() => PaslonsService)) private readonly paslonsService: PaslonsService,
    private readonly jwtService: JwtService
  ) { }

  async find(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email
      },
    });
  }

  async findById(id: string) {
    const NumID = Number(id);
    if(isNaN(NumID)) {
      throw new BadRequestException('ID must be a number');
    }
    return await this.usersRepository.findOne({
      where: {
        id: NumID
      },
      relations: ['paslon'],
    });
  }

  async creteUser(@Body() body: CreateUserDto) {

    const checkEmail = await this.find(body.email)

    if (checkEmail) {
      throw new ConflictException('Email sudah terdaftar');
    }

    const passwordHah = await bcrypt.hash(body.password, 10)

    const user = this.usersRepository.create({
      ...body,
      password: passwordHah
    })

    await this.usersRepository.save(user)
    
    const payload = {
      id: user.id,
      isAdmin: user.isAdmin,
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async updatePaslon(user: number) {
    const NID = Number(user);
    const paslon = await this.usersRepository.findOne({
      where: {
        id: NID
      }
    })

    if (!paslon) {
      throw new BadRequestException('Paslon not found');
    }

    paslon.paslon = null

    return this.usersRepository.save(paslon);
  }

  async vote(idUser: string, idPaslon: string) {
    const UID = Number(idUser);
    if(isNaN(UID)) {
      throw new BadRequestException('ID must be a number');
    }
    
    const paslon = await this.paslonsService.findById(idPaslon);
    const user = await this.usersRepository.findOne({
      where: {
        id: UID
      }
    })

    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.paslon = paslon;

    return this.usersRepository.save(user);
  }

}

