import { Controller, Post, Get, Body, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../guards/auth.guard';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService){}
  
  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return await this.usersService.creteUser(body);

  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body
    const user = await this.usersService.find(email);

    if(!user) {
      throw new UnauthorizedException('Email or Password invalid');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) {
      throw new UnauthorizedException('Email or Password invalid');
    }

    const payload = {
      id: user.id,
      isAdmin: user.isAdmin,
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
