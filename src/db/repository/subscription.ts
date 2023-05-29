import Objection from 'objection';
import { Entity } from '..';
import { ItemsPagination, QueryParams } from '../../base/dto';

export default class Subscription {
  private entity: typeof Entity.Subscription;

  constructor(entity: typeof Entity.Subscription) {
    this.entity = entity;
  }

  async findAll(
    query: QueryParams,
  ): Promise<ItemsPagination<Entity.Subscription>> {
    const objects = await this.entity
      .query()
      .modify('defaultSelect')
      .page(query.page, query.pageSize);
    return {
      data: objects.results,
      pagination: {
        currentPage: query?.page || 1,
        pageSize: query?.pageSize || 10,
        totalItems: objects.total,
      },
    };
  }

  async findOne(
    filter: Objection.PartialModelObject<Entity.Subscription>,
  ): Promise<Entity.Subscription> {
    const objects = await this.entity.query().where(filter).limit(1);

    return objects?.[0];
  }
}
