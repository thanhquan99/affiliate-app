import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCommissionDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status: string;
}
