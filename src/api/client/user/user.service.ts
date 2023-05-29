import { CreateUserDTO } from './user.dto';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Entity, Repository } from '../../../db';
import { ROLE } from '../../../constant';
import Objection from 'objection';
import { ItemsPagination, QueryParams } from '../../../base/dto';
import userRepository from '../../../service/client/repository/user';
import roleRepository from '../../../service/client/repository/role';
import { IConversionSummary } from './user.interface';
import commissionRepository from '../../../service/client/repository/commission';

@Injectable()
export class UserService {
  private _repository = userRepository;
  private _role_repository = roleRepository;
  private _commission_repository = commissionRepository;

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

  async getMany(query: QueryParams): Promise<ItemsPagination<Entity.User>> {
    return await this._repository.findAll(query);
  }

  async getMyConversions(
    query: QueryParams,
    userId: string,
  ): Promise<ItemsPagination<Entity.User>> {
    const user = await this._repository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this._repository.findUserConversions(userId, query);
  }

  async getMyReferrals(
    query: QueryParams,
    userId: string,
  ): Promise<ItemsPagination<Entity.User>> {
    const user = await this._repository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this._repository.findUserReferrals(userId, query);
  }

  async getMyConversionSummary(userId: string): Promise<IConversionSummary> {
    const user = await this._repository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this._commission_repository.getUserConversionSummary(userId);
  }
}
