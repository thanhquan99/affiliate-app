import { QueryBuilder } from 'objection';
import BaseModel from './BaseModel';

export default class Role extends BaseModel {
  name: string;

  static get tableName() {
    return 'role';
  }

  static modifiers = {
    defaultSelect(qb: QueryBuilder<Role>) {
      qb.select('id', 'name');
    },
  };
}
