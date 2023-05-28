import { QueryBuilder } from 'objection';
import BaseModel from './BaseModel';

export default class Subscription extends BaseModel {
  name: string;
  price: string;

  static get tableName() {
    return 'subscription';
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static modifiers = {
    defaultSelect(qb: QueryBuilder<Subscription>) {
      qb.select('id', 'name', 'price');
    },
  };
}
