import Objection from 'objection';
import { Entity } from '..';

export default class Role {
  private entity: typeof Entity.Role;

  constructor(entity: typeof Entity.Role) {
    this.entity = entity;
  }

  async findOne(
    filter: Objection.PartialModelObject<Entity.Role>,
  ): Promise<Entity.Role> {
    const roles = await this.entity
      .query()
      .modify('defaultSelect')
      .where(filter)
      .limit(1);

    return roles?.[0];
  }
}
