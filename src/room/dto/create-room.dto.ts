import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: 'YouTube', description: '| Room: name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '30', description: '| Room: capacity' })
  @IsNotEmpty()
  @IsNumber()
  capacity: number;
}
