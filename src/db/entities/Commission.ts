import { QueryBuilder } from 'objection';
import { Entity } from '..';
import BaseModel, { ModelFields } from './BaseModel';
import User from './User';

export default class Commission extends BaseModel {
  status: string;
  user_id: string;
  commission: number;
  modified_by?: string;
  referral_by: string;

  static get tableName(): string {
    return 'commission';
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'commission.user_id',
          to: 'users.id',
        },
      },
      refUser: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'commission.referral_by',
          to: 'users.id',
        },
      },
    };
  }

  static modifiers = {
    defaultSelect(qb: QueryBuilder<Commission>) {
      qb.select(
        'id',
        'status',
        'commission',
        'modified_by',
        'created_at',
        'updated_at',
      ).withGraphFetched({
        user: true,
        refUser: true,
      });
    },
  };
}
