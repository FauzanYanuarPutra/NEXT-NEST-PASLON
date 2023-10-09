import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/:id')
  async find(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }
  
  @Patch('/vote/:id/:idPaslon')
  async vote(@Param('id') idUser: string, @Param('idPaslon') idPaslon: string) {
    return await this.usersService.vote(idUser, idPaslon);
  }

}
