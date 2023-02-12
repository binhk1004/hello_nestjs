import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}
  //서비스와 연결(import)

  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  // @Get('search')
  // search(@Query('year') searchingYear: string) {
  //   return `${searchingYear} 년도 이후의 영화를 찾는 중 입니다.`;
  // }
  //search가 @Get('/:id')보다 밑에 있으면,
  //search()함수 자체를 하나의 id로 간주해버린다.

  @Get('/:id')
  getOne(@Param('id') movieId: string): Movie {
    //url뒤에 붙는 파라미터 값을 얻기 위해선 위와 같이 @Param을 사용한다.
    return this.movieService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData) {
    return this.movieService.create(movieData);
  }

  @Post('/testsql')
  testsql() {
    return 'sql테스트 입니다.';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return this.movieService.deleteOne(movieId);
  }

  @Patch('/:id')
  path(@Param('id') movieId: string, @Body() updateData) {
    return this.movieService.updata(movieId, updateData);
  }
}
