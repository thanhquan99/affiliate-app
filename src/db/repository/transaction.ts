import Objection from 'objection';
import { Entity } from '..';
import { ItemsPagination, QueryParams } from '../../base/dto';

export default class Transaction {
  private entity: typeof Entity.Transaction;

  constructor(entity: typeof Entity.Transaction) {
    this.entity = entity;
  }

  async insertOne(
    data: Objection.PartialModelObject<Entity.Transaction>,
  ): Promise<Entity.Transaction> {
    const transaction = await this.entity
      .query()
      .modify('defaultSelect')
      .insertAndFetch(data);

    return transaction;
  }

  async findOne(
    filter: Objection.PartialModelObject<Entity.Transaction>,
  ): Promise<Entity.Transaction> {
    const objects = await this.entity
      .query()
      .modify('defaultSelect')
      .where(filter)
      .limit(1);

    return objects?.[0];
  }

  async updateOne(
    id: string,
    data: Objection.PartialModelObject<Entity.Transaction>,
  ): Promise<Entity.Transaction> {
    const object = await this.entity
      .query()
      .updateAndFetchById(id, data)
      .modify('defaultSelect');

    return object;
  }
}
