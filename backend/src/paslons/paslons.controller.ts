import { Controller, Get, Post, Body, Patch, Param, UseGuards, UploadedFile, UseInterceptors, Delete } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/admin.guard';
import CreatePaslonDto from './dtos/create-paslon.dto';
import { PaslonsService } from './paslons.service';
import UpdatePaslonDto from './dtos/update-paslon.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { PermissionGuard } from 'src/guards/permission.guard';

@Controller('paslons')
export class PaslonsController {
  constructor(private readonly paslonsService: PaslonsService) {}
  @UseGuards(AuthGuard)
  @Get()
  find() {
    return this.paslonsService.find();
  }

  @Get('/:id')
  findOne(@Param("id") id: string) {
    return this.paslonsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)  // PermissionGuard
  // @SetMetadata('permission', ['create:paslon']) // ini adalah percobaan permission
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() body: CreatePaslonDto,  @UploadedFile() image: Express.Multer.File) {
    return this.paslonsService.create(body, image);
  }

  @Patch("/:id")
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(@Param("id") id: string, @Body() body: UpdatePaslonDto, @UploadedFile() image: Express.Multer.File) {
    return this.paslonsService.update(id, body, image);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param("id") id: string) {
    return this.paslonsService.delete(id);
  }

}
