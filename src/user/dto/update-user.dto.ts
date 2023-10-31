import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  avatar?: any;
  status?: boolean;
  first_name?: string;
  last_name?: string;

  @IsString()
  @MinLength(13)
  username?: string;
}
