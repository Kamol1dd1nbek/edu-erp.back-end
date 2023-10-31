import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto {
  first_name?: string;
  last_name?: string;
  username?: string;
}
