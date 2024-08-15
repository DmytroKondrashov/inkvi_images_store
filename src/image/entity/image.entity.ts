import { IsNotEmpty, IsString } from 'class-validator';
import { Folder } from 'src/folder/entity/folder.entity';
import { Tag } from 'src/tag/entity/tag.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  filename: string;

  @Column({ type: 'longblob', nullable: false })
  image: Buffer;

  @ManyToOne(() => Folder, (folder) => folder.images)
  folder: Folder;

  @ManyToOne(() => User, (user) => user.images)
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.images)
  tags: Tag[];
}
