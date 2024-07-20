import { Injectable } from '@nestjs/common';
import { Folder } from './entity/folder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly userRepository: Repository<Folder>,
  ) {}
}
