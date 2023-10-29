import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserService } from '../user/user.service';
import { QueryParams } from '../user/templates';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: "| Add new student" })
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

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
