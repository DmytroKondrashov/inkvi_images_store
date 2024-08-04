import { IsNotEmpty, IsString } from 'class-validator';
import { Folder } from 'src/folder/entity/folder.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
