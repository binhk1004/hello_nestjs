import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return '이것은 모든 영화 리스트를 보여줄겁니다.';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    //url뒤에 붙는 파라미터 값을 얻기 위해선 위와 같이 @Param을 사용한다.
    return `이 라우터는 아이디와 함께 하나의 영화만 보여줄겁니다. 아이디 : ${movieId}`;
  }

  @Post()
  create() {
    return '이 라우터는 영화를 생성 할 것 입니다.';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `이 라우터는 아이디와 함께 영화를 삭제 할 것 입니다. 아이디 : ${movieId}`;
  }

  @Patch('/:id')
  path(@Param('id') movieId: string) {
    return `이 라우터는 아이디와 함께 영화를 업데이트 할 것 입니다. 아이디 : ${movieId}`;
  }
}
