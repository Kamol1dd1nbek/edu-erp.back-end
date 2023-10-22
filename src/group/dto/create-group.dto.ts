import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ example: 'N1', description: '| Group name' })
  name: string;

  @ApiProperty({ example: 2, description: '| Course id' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  course_id: number;

  @ApiProperty({ example: 2, description: '| Group capacity' })
  @IsNotEmpty()
  @IsNumber()
  @Min(3)
  capacity: number;

  @ApiProperty({ example: '1696993200000', description: '| Group start date' })
  @IsNotEmpty()
  @IsString()
  start_date: string;

  @ApiProperty({ example: 90, description: '| Lesson continuity' })
  @IsNotEmpty()
  @IsNumber()
  @Min(30)
  continuity: number;

  @ApiProperty({ example: [1, 3, 5], description: '| Week days' })
  @IsNotEmpty()
  @IsArray()
  @Min(0, { each: true })
  @Max(6, { each: true })
  days: number[];
}
