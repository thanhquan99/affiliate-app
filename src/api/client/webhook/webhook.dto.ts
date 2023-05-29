import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class HandleEventDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  transaction_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
