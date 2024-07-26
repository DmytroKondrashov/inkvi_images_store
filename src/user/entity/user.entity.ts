import { Folder } from 'src/folder/entity/folder.entity';
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
}
