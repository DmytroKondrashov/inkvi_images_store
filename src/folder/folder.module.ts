import { Module } from '@nestjs/common';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './entity/folder.entity';
import { CommonService } from 'src/common/common.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Folder]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [FolderController],
  providers: [FolderService, CommonService, UserService, JwtService],
})
export class FolderModule {}
