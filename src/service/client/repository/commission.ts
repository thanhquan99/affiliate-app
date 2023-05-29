import { Entity, Repository } from '../../../db';

const commissionRepository = new Repository.Commission(Entity.Commission);
export default commissionRepository;
