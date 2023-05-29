import { Entity, Repository } from '../../../db';

const transactionRepository = new Repository.Transaction(Entity.Transaction);
export default transactionRepository;
