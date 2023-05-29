import { Entity, Repository } from '../../../db';

const subscriptionRepository = new Repository.Subscription(Entity.Subscription);
export default subscriptionRepository;
