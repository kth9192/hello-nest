import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MoivesController } from './moives/moives.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [],
  controllers: [AppController, MoivesController],
  providers: [MoviesService],
})
export class AppModule {}
