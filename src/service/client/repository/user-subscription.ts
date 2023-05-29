import { Entity, Repository } from '../../../db';

const userSubscriptionRepository = new Repository.UserSubscription(
  Entity.UserSubscription,
);
export default userSubscriptionRepository;
