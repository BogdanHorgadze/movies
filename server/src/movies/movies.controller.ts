import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getMovies(@Req() req) {
    return this.moviesService.get(
      {
        limit: req.query.hasOwnProperty('limit') ? req.query.limit : 10,
        page: req.query.hasOwnProperty('page') ? req.query.page : 0,
        search: req.query.hasOwnProperty('search') ? req.query.search : '',
        sort: req.query.hasOwnProperty('sort') ? req.query.sort : '',
      },
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post('/upload')
  createMovie(@Body() dto: CreateMovieDto, @UploadedFile() image, @Req() req) {
    return this.moviesService.create({ ...dto, user: req.user.id }, image);
  }
}
