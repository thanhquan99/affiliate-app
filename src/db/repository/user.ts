import Objection from 'objection';
import { ItemsPagination, QueryParams } from '../../base/dto';
import { v4 as uuidv4 } from 'uuid';
import { Entity } from '..';
import { COMMISSION_STATUS } from '../../constant';

export default class User {
  private entity: typeof Entity.User;

  constructor(entity: typeof Entity.User) {
    this.entity = entity;
  }

  async findAll(query: QueryParams): Promise<ItemsPagination<Entity.User>> {
    const { page = 1, pageSize = 10 } = query;
    const objects = await this.entity
      .query()
      .modify('defaultSelect')
      .page(page - 1, pageSize);

    return {
      data: objects.results,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
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

  async findUserConversions(
    userId: string,
    query: QueryParams,
  ): Promise<ItemsPagination<Entity.User>> {
    const { page = 1, pageSize = 10 } = query;

    const getCommissionOfUser = Entity.Commission.query()
      .select('user_id')
      .where({ referral_by: userId });

    const objects = await this.entity
      .query()
      .whereIn('id', getCommissionOfUser)
      .modify('selectInConversion')
      .page(page - 1, pageSize);

    return {
      data: objects.results,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalItems: objects.total,
      },
    };
  }

  async findUserReferrals(
    userId: string,
    query: QueryParams,
  ): Promise<ItemsPagination<Entity.User>> {
    const { page = 1, pageSize = 10 } = query;

    const objects = await this.entity
      .query()
      .where({ referral_by: userId })
      .modify('defaultSelect')
      .page(page - 1, pageSize);

    return {
      data: objects.results,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalItems: objects.total,
      },
    };
  }
}
