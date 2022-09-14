import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('movie')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: '' })
  year: string;

  @ManyToOne(() => UserEntity, (user) => user.movies)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
