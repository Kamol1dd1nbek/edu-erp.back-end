import { Injectable } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class AdminService {
  create(createAdminDto: CreateStudentDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
