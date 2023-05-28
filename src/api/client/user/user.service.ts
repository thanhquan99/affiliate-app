import { CreateUserDTO } from './user.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Entity, Repository } from '../../../db';
import { ROLE } from '../../../constant';
import Objection from 'objection';

@Injectable()
export class UserService {
  private _repository = new Repository.User(Entity.User);
  private _role_repository = new Repository.Role(Entity.Role);

  async createOne(payload: CreateUserDTO): Promise<Entity.User> {
    const { ref_code, email } = payload;
    const role = await this._role_repository.findOne({ name: ROLE.CUSTOMER });

    const existUser = await this._repository.findOne({ email });
    if (existUser) {
      throw new BadRequestException('email already in use');
    }

    const insertData: Objection.PartialModelObject<Entity.User> = {
      email,
      role_id: role.id,
    };

    if (ref_code) {
      const refUser = await this._repository.findOne({
        affiliate_code: ref_code,
      });
      if (!refUser) {
        throw new BadRequestException('ref code invalid');
      }
      insertData.referral_by = refUser.id;
    }

    return await this._repository.insertOne(insertData);
  }
}
