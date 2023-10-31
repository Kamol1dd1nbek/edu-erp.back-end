import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryParams {
  @IsOptional()
  @IsString()
  id: number;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  page: string;

  @IsOptional()
  limit: string;

  @IsOptional()
  @IsString()
  name: string;
}
