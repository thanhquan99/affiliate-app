import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemsPagination, QueryParams } from '../../../base/dto';
import { Entity } from '../../../db';
import { UserService } from '../../client/user/user.service';

@ApiTags('Admin')
@Controller('admin/users')
export class AdminUserController {
  private service = new UserService();

  @Get()
  getMany(@Query() query: QueryParams): Promise<ItemsPagination<Entity.User>> {
    return this.service.getMany(query);
  }
}
