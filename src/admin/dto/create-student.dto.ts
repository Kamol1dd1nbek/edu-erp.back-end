import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, Min } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'Eshmatjon', description: '| User: firstname' })
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @MinLength(3)
  @MaxLength(20)
  first_name: string;

  @ApiProperty({ example: 'Eshmatjon', description: '| User: firstname' })
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @MinLength(3)
  @MaxLength(20)
  last_name: string;

  @ApiProperty({ example: '+998996969696', description: '| User tel number' })
  @IsNotEmpty()
  @IsString()
  @MinLength(13)
  @MaxLength(13)
  username: string;
}
