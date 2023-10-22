import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFinanceStatusDto {
  @ApiProperty({ example: 'paid', description: '| Status: name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Fee paid in full',
    description: '| Status: description',
  })
  description: string;
}
