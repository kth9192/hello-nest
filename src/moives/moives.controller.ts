import { MoviesService } from '../movies/movies.service';
import { Movie } from '../movies/entities/movie.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';
import { UpdateMovieDto } from '../movies/dto/update-movie.dto';

@Controller('movies')
export class MoivesController {
  constructor(private readonly MoviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.MoviesService.getAll();
  }

  @Get('search')
  search(@Query('year') year: string) {
    return `searching year : ${year}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: number) {
    console.log(typeof movieId);

    const movies = this.MoviesService.getOne(movieId);
    if (!movies) {
      throw new NotFoundException(`movie with ID : ${movieId} is not found`);
    }

    return movies;
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    console.log(movieData);

    return this.MoviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.MoviesService.deleteOne(movieId);
  }

  @Patch(':id')
  update(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.MoviesService.update(movieId, updateData);
  }
}
