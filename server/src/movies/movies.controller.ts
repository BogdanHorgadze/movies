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
    return this.moviesService.get(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post('/upload')
  createMovie(@Body() dto: CreateMovieDto, @UploadedFile() image, @Req() req) {
    return this.moviesService.create({ ...dto, user: req.user.id }, image);
  }
}
