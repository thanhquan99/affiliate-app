import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemsPagination, QueryParams } from '../../base/dto';
import { Entity } from '../../db';
import { SubscriptionService } from './subscription.service';

@UsePipes(ValidationPipe)
@Controller('subscription')
export class SubscriptionController {
  private service = new SubscriptionService();

  @Get()
  getMany(
    @Query() query: QueryParams,
  ): Promise<ItemsPagination<Entity.Subscription>> {
    return this.service.getMany(query);
  }
}
