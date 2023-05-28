import { Injectable } from '@nestjs/common';
import { ItemsPagination, QueryParams } from '../../base/dto';
import { Entity, Repository } from '../../db';
import { knex } from '../../db/entities';

@Injectable()
export class SubscriptionService {
  private _repository = new Repository.Subscription(knex);

  async getMany(
    query: QueryParams,
  ): Promise<ItemsPagination<Entity.Subscription>> {
    return await this._repository.findAll(query);
  }
}
