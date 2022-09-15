import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OptionsInterface } from 'src/options/options.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getMovies(@Query() query: OptionsInterface, @Req() req) {
    return this.moviesService.get(
      {
        limit: query.hasOwnProperty('limit') ? query.limit : 10,
        offset: query.hasOwnProperty('offset') ? query.offset : 0,
        search: query.hasOwnProperty('search') ? query.search : '',
        sort: query.hasOwnProperty('sort') ? query.sort : '',
      },
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post('/create')
  createMovie(@Body() dto: CreateMovieDto, @UploadedFile() image, @Req() req) {
    return this.moviesService.create({ ...dto, user: req.user.id }, image);
  }
}
