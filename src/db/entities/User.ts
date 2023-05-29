import { QueryBuilder } from 'objection';
import Role from './Role';
import BaseModel from './BaseModel';
import Commission from './Commission';

export default class User extends BaseModel {
  role_id: string;
  email: string;
  affiliate_code: string;
  referral_by?: string;

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
      commission: {
        relation: BaseModel.HasOneRelation,
        modelClass: Commission,
        join: {
          from: 'users.id',
          to: 'commission.user_id',
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
        'referral_by',
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
    selectInConversion(qb: QueryBuilder<BaseModel>) {
      qb.select('*').withGraphFetched({
        role: {
          $modify: ['defaultSelect'],
        },
        commission: true,
      });
    },
  };
}
