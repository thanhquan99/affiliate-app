import { Injectable } from '@nestjs/common';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '../../../constant';
import { Entity } from '../../../db';
import transactionRepository from '../../../service/client/repository/transaction';

@Injectable()
export class TransactionService {
  private _transaction_repository = transactionRepository;

  async triggerProcessPayout(commission: Entity.Commission) {
    // Handle payout to referral user
    const payoutTransaction = await this._transaction_repository.insertOne({
      status: TRANSACTION_STATUS.PENDING,
      type: TRANSACTION_TYPE.PAY_OUT,
      cost: 19,
      user_id: commission.referral_by,
    });
    // Send message to queue to process payout
    await this.mockSendMessageToQueueAndProcess(payoutTransaction.id);
  }

  private async mockSendMessageToQueueAndProcess(
    transactionId: string,
  ): Promise<void> {
    const transaction = await this._transaction_repository.findOne({
      id: transactionId,
    });
    if (!transaction) {
      //Notify error
      console.debug('Transaction not found');
    }

    await this.mockPayoutToUser(transaction);
    await this._transaction_repository.updateOne(transaction.id, {
      status: TRANSACTION_STATUS.SUCCESS,
    });

    return;
  }

  private async mockPayoutToUser(
    transaction: Entity.Transaction,
  ): Promise<void> {
    console.log(
      `Payout to user ${transaction?.user?.email}: ${transaction.cost}`,
    );
    return;
  }
}
