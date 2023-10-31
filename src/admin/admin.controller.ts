import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserService } from '../user/user.service';
import { QueryParams } from '../user/templates';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStudentDto } from './dto';
import { UpdateUserDto } from '../user/dto';
import { CourseService } from '../course/course.service';
import { CreateCourseDto, UpdateCourseDto } from '../course/dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly courseService: CourseService,
  ) {}

  // STUDET
  @ApiOperation({ summary: '| Add new student' })
  @Post('add-student')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.userService.createUser({ ...createStudentDto, role_id: 3 });
  }

  @ApiOperation({ summary: '| Get all students' })
  @Get('get-students')
  getStudents(@Query() query: QueryParams) {
    return this.userService.findUsersWithOptional({
      ...query,
      role: 'student',
    });
  }

  @ApiOperation({ summary: '| Update student' })
  @Put('update-student/:id')
  updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(+id, updateStudentDto);
  }

  @ApiOperation({ summary: '| Delete student' })
  @Delete('delete-student/:id')
  deleteStudent(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }

  // COURSE
  @ApiOperation({ summary: '| Get all courses' })
  @Get('get-courses')
  getAllCourses(@Query() query: QueryParams) {
    return this.courseService.getAllCourses(query);
  }

  @ApiOperation({ summary: '| Add course' })
  @Post('add-course')
  addCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @ApiOperation({ summary: '| Delete course' })
  @Delete('delete-course/:id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.removeCourse(+id);
  }

  @ApiOperation({ summary: '| Update course' })
  @Put('update-course/:id')
  updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(+id, updateCourseDto);
  }
}
