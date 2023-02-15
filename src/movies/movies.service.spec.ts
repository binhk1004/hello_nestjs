import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NOTFOUND } from 'dns';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'testMovie',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('999에 해당하는 영화를 찾을 수 없습니다.');
      }
    });
  });
  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'testMovie',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('999에 해당하는 영화를 찾을 수 없습니다.');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'testMovie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('updata', () => {
    it('should updata a movie', () => {
      service.create({
        title: 'testMovie',
        genres: ['test'],
        year: 2000,
      });
      service.updata(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should throw a new NotFoundException', () => {
      try {
        service.updata(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
//unit 테스트 명령어 : npm run test:watch
//유닛테스트란 함수 각각의 테스트를 말한다
//위와 같이 it()로 감싼 뒤 그 안에서 테스트를 진행하면 된다.
