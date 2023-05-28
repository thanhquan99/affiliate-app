import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Entity } from '../../../db';
import { CreateUserDTO } from './user.dto';
import { UserService } from './user.service';

@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  private service = new UserService();

  @Post()
  createOne(@Body() payload: CreateUserDTO): Promise<Entity.User> {
    return this.service.createOne(payload);
  }
}
