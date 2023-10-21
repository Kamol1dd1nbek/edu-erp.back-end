import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'IELTS 7', description: '| Course: name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '1300000', description: '| Course: price (UZS)' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: '310', description: '| Course: lessons count' })
  @IsNotEmpty()
  @IsNumber()
  lessons_count: number;
}
