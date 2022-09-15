import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { FilesService } from '../files/files.service';
import { OptionsInterface } from '../options/options.interface';
import { Like } from 'typeorm';

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

  async get(options: OptionsInterface, userId: number) {
    const [results, total] = await this.movieRepository.findAndCount({
      where: {
        user: { id: userId },
        title: Like(`%${options.search}%`),
      },
      take: options.limit,
      skip: options.offset,
      order: options.sort === 'new' ? { year: 'DESC' } : { year: 'ASC' },
    });

    return {
      results,
      total,
    };
  }
}
