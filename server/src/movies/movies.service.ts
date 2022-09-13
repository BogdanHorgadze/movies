import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { FilesService } from '../files/files.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository,
    private fileService: FilesService,
  ) {}

  async create(dto: CreateMovieDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const movie = await this.movieRepository.create({
      ...dto,
      image: fileName,
    });
    const savedMovie = await this.movieRepository.save(movie);
    return savedMovie;
  }

  async get(userId: number) {
    return await this.movieRepository.find({
      where: { user: userId },
    });
  }
}
