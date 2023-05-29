import Objection from 'objection';
import { Entity } from '..';

export default class UserSubscription {
  private entity: typeof Entity.UserSubscription;

  constructor(entity: typeof Entity.UserSubscription) {
    this.entity = entity;
  }

  async insertOne(
    data: Objection.PartialModelObject<Entity.UserSubscription>,
  ): Promise<Entity.UserSubscription> {
    const object = await this.entity
      .query()
      .modify('defaultSelect')
      .insertAndFetch(data);

    return object;
  }

  async findOne(
    filter: Objection.PartialModelObject<Entity.UserSubscription>,
  ): Promise<Entity.UserSubscription> {
    const objects = await this.entity.query().where(filter).limit(1);

    return objects?.[0];
  }

  async updateOne(
    id: string,
    data: Objection.PartialModelObject<Entity.UserSubscription>,
  ): Promise<Entity.UserSubscription> {
    const object = await this.entity
      .query()
      .updateAndFetchById(id, data)
      .modify('defaultSelect');

    return object;
  }
}
