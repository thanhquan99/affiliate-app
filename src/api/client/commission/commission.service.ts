import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemsPagination, QueryParams } from '../../../base/dto';
import { COMMISSION_STATUS } from '../../../constant';
import { Entity } from '../../../db';
import commissionRepository from '../../../service/client/repository/commission';
import { UpdateCommissionDTO } from '../../admin/admin-commission/admin-commission.dto';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class CommissionService {
  private _commission_repository = commissionRepository;
  private transactionService = new TransactionService();

  async rejectCommission(commission: Entity.Commission): Promise<void> {
    await this._commission_repository.updateOne(commission.id, {
      status: COMMISSION_STATUS.REJECT,
    });
    return;
  }

  async approvalCommission(commission: Entity.Commission): Promise<void> {
    await this._commission_repository.updateOne(commission.id, {
      status: COMMISSION_STATUS.APPROVE,
    });
    // Handle payout to referral user
    this.transactionService.triggerProcessPayout(commission);

    return;
  }

  async getMany(
    query: QueryParams,
  ): Promise<ItemsPagination<Entity.Commission>> {
    return await this._commission_repository.findAll(query);
  }

  async updateOne(
    id: string,
    payload: UpdateCommissionDTO,
  ): Promise<Entity.Commission> {
    const commission = await this._commission_repository.findOne({ id });
    if (!commission) {
      throw new NotFoundException('Commission not found');
    }

    if (payload.status === COMMISSION_STATUS.APPROVE) {
      await this.approvalCommission(commission);
    }
    if (payload.status === COMMISSION_STATUS.REJECT) {
      await this.rejectCommission(commission);
    }

    return this._commission_repository.findOne({ id });
  }

  async getMyCommissions(
    userId: string,
    query: QueryParams,
  ): Promise<ItemsPagination<Entity.Commission>> {
    return await this._commission_repository.findAll(query);
  }
}
