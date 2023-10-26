import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '+998998765432', description: '| User: username' })
  @IsNotEmpty()
  @IsString()
  @MinLength(13)
  username: string;

  @ApiProperty({ example: '+998998765432', description: '| User: password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(13)
  password: string;
}
