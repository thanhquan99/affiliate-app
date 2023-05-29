import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemsPagination, QueryParams } from '../../../base/dto';
import { IdParam } from '../../../base/params';
import { Entity } from '../../../db';
import { CommissionService } from '../../client/commission/commission.service';
import { UpdateCommissionDTO } from './admin-commission.dto';

@ApiTags('Admin')
@UsePipes(ValidationPipe)
@Controller('admin/commissions')
export class AdminCommissionController {
  private service = new CommissionService();

  @Get()
  getMany(
    @Query() query: QueryParams,
  ): Promise<ItemsPagination<Entity.Commission>> {
    return this.service.getMany(query);
  }

  @Put('/:id')
  updateOne(
    @Body() payload: UpdateCommissionDTO,
    @Param() params: IdParam,
  ): Promise<Entity.Commission> {
    return this.service.updateOne(params.id, payload);
  }
}
