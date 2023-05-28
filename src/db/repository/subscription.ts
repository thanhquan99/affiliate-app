import Knex from 'knex';
import Objection, { Model } from 'objection';
import { Entity } from '..';
import { ItemsPagination, QueryParams } from '../../base/dto';

export default class Subscription {
  private _builder: Objection.QueryBuilder<
    Entity.Subscription,
    Entity.Subscription[]
  >;

  constructor(knex: Knex) {
    this._builder = Entity.Subscription.query(knex);
  }

  async findAll(
    query: QueryParams,
  ): Promise<ItemsPagination<Entity.Subscription>> {
    const objects = await this._builder
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
}
