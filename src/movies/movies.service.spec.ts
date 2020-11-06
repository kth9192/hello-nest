import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe('should return array type', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({ title: 'test movie', genres: ['test'], year: 2020 });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`movie with ID : 999 is not found`);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({ title: 'test movie', genres: ['test'], year: 2020 });
      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(allMovies.length);
    });
    it('return 404 error ', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`movie with ID : 999 is not found`);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;

      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2020,
      });

      const afterCreate = service.getAll().length;

      console.log(beforeCreate, afterCreate);

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2020,
      });

      service.update(1, { title: 'updated title' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated title');
    });

    it('should throw  NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  search(){
    
  }
});
