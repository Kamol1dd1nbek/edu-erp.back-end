import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLessonDto } from './create-lesson.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateLessonDto {
    @ApiProperty({example: false, description: "Lesson status" })
    @IsOptional()
    status: boolean;

    @ApiProperty({ example: "Property flags", description: "Lesson title" })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;
}
