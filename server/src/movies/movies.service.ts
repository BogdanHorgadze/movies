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
    return this.movieRepository.save(movie);
  }

  get(userId: number) {
    return this.movieRepository.find({
      where: { user: userId },
    });
  }
}
