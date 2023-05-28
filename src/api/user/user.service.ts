import { CreateUserDTO } from './user.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Entity, Repository } from '../../db';
import { knex } from '../../db/entities';

@Injectable()
export class UserService {
  private _repository = new Repository.User(knex);

  async createOne(payload: CreateUserDTO): Promise<Entity.User> {
    const { ref_code } = payload;
    if (!ref_code) {
      return await this._repository.insertOne({ email: payload.email });
    }

    const refUser = await this._repository.findOne({
      affiliate_code: ref_code,
    });
    if (!refUser) {
      throw new BadRequestException('ref code invalid');
    }
    return await this._repository.insertOne({
      email: payload.email,
      referral_by: refUser.id,
    });
  }
}
