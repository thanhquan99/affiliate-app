import { QueryBuilder } from 'objection';
import { Entity } from '..';
import BaseModel, { ModelFields } from './BaseModel';
import Subscription from './Subscription';
import User from './User';

export default class UserSubscription extends BaseModel {
  user_id: string;
  subscription_id: string;
  // Relation filed
  user?: ModelFields<Entity.User>;
  subscription?: ModelFields<Entity.Subscription>;

  static get tableName(): string {
    return 'user_subscription';
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_subscription.user_id',
          to: 'users.id',
        },
      },
      subscription: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Subscription,
        join: {
          from: 'user_subscription.subscription_id',
          to: 'subscription.id',
        },
      },
    };
  }

  static modifiers = {
    defaultSelect(qb: QueryBuilder<UserSubscription>) {
      qb.select('*').withGraphFetched({
        user: true,
        subscription: true,
      });
    },
  };
}
