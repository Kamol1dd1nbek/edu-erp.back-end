import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
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

  @ApiProperty({ example: "1", description: "| User: role id" })
  role_id?: number;
}
