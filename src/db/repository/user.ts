import Objection from 'objection';
import { ItemsPagination, QueryParams } from '../../base/dto';
import { v4 as uuidv4 } from 'uuid';
import { Entity } from '..';

export default class User {
  private entity: typeof Entity.User;

  constructor(entity: typeof Entity.User) {
    this.entity = entity;
  }

  async findAll(query: QueryParams): Promise<ItemsPagination<Entity.User>> {
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
    filter: Objection.PartialModelObject<Entity.User>,
  ): Promise<Entity.User> {
    const users = await this.entity
      .query()
      .where(filter)
      .modify('defaultSelect')
      .limit(1);

    return users?.[0];
  }

  async insertOne(
    data: Objection.PartialModelObject<Entity.User>,
  ): Promise<Entity.User> {
    const affiliate_code = uuidv4();
    const users = await this.entity
      .query()
      .modify('defaultSelect')
      .insertAndFetch({ ...data, affiliate_code });

    return users;
  }
}
