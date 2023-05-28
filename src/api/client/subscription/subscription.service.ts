import { Injectable } from '@nestjs/common';
import { ItemsPagination, QueryParams } from '../../../base/dto';
import { Entity, Repository } from '../../../db';

@Injectable()
export class SubscriptionService {
  private _repository = new Repository.Subscription(Entity.Subscription);

  async getMany(
    query: QueryParams,
  ): Promise<ItemsPagination<Entity.Subscription>> {
    return await this._repository.findAll(query);
  }
}
