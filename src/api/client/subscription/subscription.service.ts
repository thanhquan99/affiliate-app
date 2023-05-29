import { Injectable } from '@nestjs/common';
import { ItemsPagination, QueryParams } from '../../../base/dto';
import { Entity } from '../../../db';
import subscriptionRepository from '../../../service/client/repository/subscription';

@Injectable()
export class SubscriptionService {
  private _repository = subscriptionRepository;

  async getMany(
    query: QueryParams,
  ): Promise<ItemsPagination<Entity.Subscription>> {
    return await this._repository.findAll(query);
  }
}
