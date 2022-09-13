import { Module } from '@nestjs/common';
import { MovieEntity } from './movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), FilesModule, JwtModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
