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

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
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
    };
  }

  static modifiers = {
    defaultSelect(qb: QueryBuilder<BaseModel>) {
      qb.select(
        'email',
        'affiliate_code',
        'created_at',
        'updated_at',
      ).withGraphFetched({
        role: {
          $modify: ['defaultSelect'],
        },
      });
    },
  };
}
