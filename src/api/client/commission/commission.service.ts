import { Injectable } from '@nestjs/common';
import { COMMISSION_STATUS } from '../../../constant';
import { Entity, Repository } from '../../../db';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class CommissionService {
  private _commission_repository = new Repository.Commission(Entity.Commission);
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
    await this.transactionService.triggerProcessPayout(commission);
  }
}
