import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { FolderModule } from './folder/folder.module';
import { ImageModule } from './image/image.module';
import { TypeOrmModule } from './datasource/typeorm.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UserModule, FolderModule, ImageModule, TypeOrmModule, CommonModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
