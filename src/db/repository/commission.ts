import Objection from 'objection';
import { Entity } from '..';
import { COMMISSION_STATUS } from '../../constant';

export default class Commission {
  private entity: typeof Entity.Commission;

  constructor(entity: typeof Entity.Commission) {
    this.entity = entity;
  }

  async insertOne(
    data: Objection.PartialModelObject<Entity.Commission>,
  ): Promise<Entity.Commission> {
    const transaction = await this.entity
      .query()
      .modify('defaultSelect')
      .insertAndFetch(data);

    return transaction;
  }

  async findOne(
    filter: Objection.PartialModelObject<Entity.Commission>,
  ): Promise<Entity.Commission> {
    const objects = await this.entity.query().where(filter).limit(1);

    return objects?.[0];
  }

  async updateOne(
    id: string,
    data: Objection.PartialModelObject<Entity.Commission>,
  ): Promise<Entity.Commission> {
    const object = await this.entity
      .query()
      .updateAndFetchById(id, data)
      .modify('defaultSelect');

    return object;
  }

  async findCommissionCanConvert(): Promise<Entity.Commission[]> {
    const compareTime = Math.round(Date.now() / 1000) - 14 * 24 * 60 * 60; // 14 days
    return await this.entity
      .query()
      .where('created_at', '<=', compareTime)
      .andWhere({ status: COMMISSION_STATUS.PENDING });
  }
}
