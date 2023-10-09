import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PaslonsModule } from './paslons/paslons.module';
import { PartiesModule } from './parties/parties.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), UsersModule, AuthModule, PaslonsModule, PartiesModule, CloudinaryModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {}
