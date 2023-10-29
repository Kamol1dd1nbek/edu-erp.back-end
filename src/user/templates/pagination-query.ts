import { IsNumber, IsOptional } from 'class-validator';

export class PaginationParams {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;
}
