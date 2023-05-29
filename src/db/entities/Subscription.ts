import { QueryBuilder } from 'objection';
import BaseModel from './BaseModel';

export default class Subscription extends BaseModel {
  name: string;
  price: number;

  static get tableName(): string {
    return 'subscription';
  }

  static modifiers = {
    defaultSelect(qb: QueryBuilder<Subscription>) {
      qb.select('id', 'name', 'price');
    },
  };
}
