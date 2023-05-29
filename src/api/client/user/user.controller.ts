import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemsPagination, QueryParams } from '../../../base/dto';
import { Entity } from '../../../db';
import { CreateUserDTO, UserIdParam } from './user.dto';
import { IConversionSummary } from './user.interface';
import { UserService } from './user.service';

@ApiTags('Client')
@UsePipes(ValidationPipe)
@Controller('users')
export class UserController {
  private service = new UserService();

  @Post()
  createOne(@Body() payload: CreateUserDTO): Promise<Entity.User> {
    return this.service.createOne(payload);
  }

  @Get('/my-conversions/:user_id')
  getMyConversions(
    @Query() query: QueryParams,
    @Param() param: UserIdParam,
  ): Promise<ItemsPagination<Entity.User>> {
    return this.service.getMyConversions(query, param.user_id);
  }

  @Get('/my-conversion-summary/:user_id')
  getMyConversionSummary(
    @Param() param: UserIdParam,
  ): Promise<IConversionSummary> {
    return this.service.getMyConversionSummary(param.user_id);
  }

  @Get('/my-referrals/:user_id')
  getMyReferrals(
    @Query() query: QueryParams,
    @Param() param: UserIdParam,
  ): Promise<ItemsPagination<Entity.User>> {
    return this.service.getMyReferrals(query, param.user_id);
  }
}
