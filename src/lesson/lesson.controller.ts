import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Lessons")
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOperation({ summary: "| Create lessons" })
  @Post()
  createLessons(@Body() createLessonDto: any) {
    return this.lessonService.createLessons(createLessonDto);
  }

  // @Get()
  // findAll() {
  //   return this.lessonService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.lessonService.findOne(+id);
  // }

  @ApiOperation({ summary: "| Update lessons" })
  @Put(':id')
  updateStatus(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.updateStatus(+id, updateLessonDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.lessonService.remove(+id);
  // }
}
