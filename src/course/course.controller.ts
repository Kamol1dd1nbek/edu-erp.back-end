import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryParams } from '../user/templates';

@ApiTags('Courses')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: '| Create course' })
  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @ApiOperation({ summary: '| Get all courses' })
  @Get()
  getAllCourses(@Query() query: QueryParams) {
    return this.courseService.getAllCourses(query);
  }

  @ApiOperation({ summary: '| Get one course' })
  @Get(':id')
  findOneCourse(@Param('id') id: string) {
    return this.courseService.findOneCourse(+id);
  }

  @ApiOperation({ summary: '| Update course' })
  @Put(':id')
  updateCourse(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.updateCourse(+id, updateCourseDto);
  }

  @ApiOperation({ summary: '| Delete course' })
  @Delete(':id')
  removeCourse(@Param('id') id: string) {
    return this.courseService.removeCourse(+id);
  }
}
