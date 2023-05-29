import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsNumberString,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ref_code?: string;
}

export class UserIdParam {
  @ApiProperty()
  @IsString()
  user_id: string;
}
