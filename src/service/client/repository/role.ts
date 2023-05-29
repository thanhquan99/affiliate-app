import { Entity, Repository } from '../../../db';

const roleRepository = new Repository.Role(Entity.Role);
export default roleRepository;
