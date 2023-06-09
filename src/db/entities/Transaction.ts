import { QueryBuilder } from 'objection';
import { Entity } from '..';
import BaseModel, { ModelFields } from './BaseModel';
import User from './User';

export default class Transaction extends BaseModel {
  status: string;
  type: string;
  user_id: string;
  cost: number;
  subscription?: ModelFields<Entity.Subscription>;
  // Relation field
  user?: ModelFields<Entity.User>;

  static get tableName(): string {
    return 'transaction';
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'transaction.user_id',
          to: 'users.id',
        },
      },
    };
  }

  static modifiers = {
    defaultSelect(qb: QueryBuilder<Transaction>) {
      qb.select('*').withGraphFetched({
        user: true,
      });
    },
  };
}
