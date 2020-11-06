import { Module } from '@nestjs/common';
import { MoivesController } from './moives/moives.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [],
  controllers: [MoivesController],
  providers: [MoviesService],
})
export class AppModule {}
