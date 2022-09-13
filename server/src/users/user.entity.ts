import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MovieEntity } from 'src/movies/movie.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  password: string;

  @OneToMany(() => MovieEntity, (movie) => movie.user)
  movies: MovieEntity[];
}
