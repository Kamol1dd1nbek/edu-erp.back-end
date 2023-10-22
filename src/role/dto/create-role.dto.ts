import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: '| Role: name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Admin of platform',
    description: '| Role: description',
  })
  description: string;
}
