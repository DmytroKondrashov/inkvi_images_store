import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from '../../image/entity/image.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Image, (image) => image.tags)
  images: Image[];
}
