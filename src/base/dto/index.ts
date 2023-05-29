import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class QueryParams {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  pageSize?: number;
}

export interface ItemsPagination<T> {
  data: T[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
  };
}
