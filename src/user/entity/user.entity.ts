import { Folder } from 'src/folder/entity/folder.entity';
import { Image } from 'src/image/entity/image.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Folder, (folder) => folder.user)
  folders: Folder[];

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];
}
