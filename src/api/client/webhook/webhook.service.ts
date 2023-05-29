import { Injectable } from '@nestjs/common';
import {
  COMMISSION_STATUS,
  SUBSCRIPTION,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
} from '../../../constant';
import { Entity, Repository } from '../../../db';
import { HandleEventDTO } from './webhook.dto';

@Injectable()
export class WebhookService {
  private _subscription_repository = new Repository.Subscription(
    Entity.Subscription,
  );
  private _transaction_repository = new Repository.Transaction(
    Entity.Transaction,
  );
  private _user_repository = new Repository.User(Entity.User);
  private _commission_repository = new Repository.Commission(Entity.Commission);

  async handleEvents(payload: HandleEventDTO): Promise<void> {
    const { status } = payload;

    if (status === 'success') {
      await this.handleSuccess(payload);
    }
    if (status === 'failed') {
      await this.handleFailed(payload);
    }
    return;
  }

  private async handleSuccess(payload: HandleEventDTO): Promise<void> {
    const { transaction_id, user_id } = payload;
    await this.mockData(transaction_id, user_id);

    // Handle transaction
    await this.handleTransaction(transaction_id);
    // Handle conversion
    await this.handleConversion(user_id);

    return;
  }

  private async handleTransaction(transactionId: string): Promise<void> {
    const transaction = await this._transaction_repository.findOne({
      id: transactionId,
    });
    if (!transaction) {
      // Notify error
      console.debug('Transaction not found');
    }
    if (transaction.status !== TRANSACTION_STATUS.PENDING) {
      // Notify error
      console.debug('Invalid transaction status');
    }
    const updatedTransaction = await this._transaction_repository.updateOne(
      transactionId,
      {
        status: TRANSACTION_STATUS.SUCCESS,
      },
    );
    console.log('Updated Transaction', updatedTransaction);
  }

  private async handleConversion(userId: string): Promise<void> {
    const user = await this._user_repository.findOne({ id: userId });
    if (!user?.referral_by) {
      console.log(`User does'nt have ref user`);
      return;
    }

    const existCommission = await this._commission_repository.findOne({
      user_id: userId,
    });
    if (!existCommission) {
      const insertedCommission = await this._commission_repository.insertOne({
        status: COMMISSION_STATUS.PENDING,
        user_id: user.id,
        commission: 19,
        referral_by: user?.referral_by,
      });
      console.log('Inserted Commission', insertedCommission);
      return;
    }
    if (existCommission.status === COMMISSION_STATUS.APPROVE) {
      console.log(`Already approve this commission`);
      return;
    }
    if (existCommission.status === COMMISSION_STATUS.PENDING) {
      // Do something in requirement
      console.log(`Commission status is Pending`);
      return;
    }
    if (existCommission.status === COMMISSION_STATUS.REJECT) {
      // Do something in requirement
      console.log(`Commission status is Reject`);
      return;
    }
  }

  private async handleFailed(payload: HandleEventDTO): Promise<void> {
    return;
  }

  private async mockData(transactionId: string, userId: string): Promise<void> {
    const subscription = await this._subscription_repository.findOne({
      name: SUBSCRIPTION.PREMIUM.name,
    });
    if (!subscription) {
      // Notify error
      console.debug('Not found subscription');
    }

    const user = await this._user_repository.findOne({ id: userId });
    if (!user) {
      // Notify error
      console.debug('Not found user');
    }

    await this._transaction_repository.insertOne({
      id: transactionId,
      type: TRANSACTION_TYPE.PAY_IN,
      cost: subscription.price,
      status: TRANSACTION_STATUS.PENDING,
      user_id: user.id,
      subscription,
    });
  }
}
