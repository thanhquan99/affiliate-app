import { Entity, Repository } from '../../../db';

const userRepository = new Repository.User(Entity.User);
export default userRepository;
