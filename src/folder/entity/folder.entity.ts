// import { Image } from 'src/image/entity/image.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  // OneToMany,
} from 'typeorm';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.folders)
  user: User;

  // @OneToMany(() => Image, (image) => image.folder)
  // images: Image[];
}
