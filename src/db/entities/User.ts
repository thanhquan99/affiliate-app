import { QueryBuilder } from 'objection';
import Role from './Role';
import BaseModel from './BaseModel';

export default class User extends BaseModel {
  role_id: number;
  email: string;
  affiliate_code: string;
  referral_by?: number;

  // Relation field
  role?: Partial<Role>;

  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      role: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role_id',
          to: 'role.id',
        },
      },
      refUser: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'users.referral_by',
          to: 'users.id',
        },
      },
    };
  }

  static modifiers = {
    defaultSelect(qb: QueryBuilder<BaseModel>) {
      qb.select(
        'id',
        'email',
        'affiliate_code',
        'created_at',
        'updated_at',
      ).withGraphFetched({
        role: {
          $modify: ['defaultSelect'],
        },
        refUser: {
          $modify: ['selectInRef'],
        },
      });
    },
    selectInRef(qb: QueryBuilder<BaseModel>) {
      qb.select('email', 'id');
    },
  };
}
