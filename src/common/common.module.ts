import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CommonService, JwtService],
})
export class CommonModule {}
