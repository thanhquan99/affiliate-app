import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Entity, Repository } from '../db';
import { CommissionService } from '../api/client/commission/commission.service';
import commissionRepository from '../service/client/repository/commission';
import userSubscriptionRepository from '../service/client/repository/user-subscription';

@Injectable()
export class CronJobsService {
  private _commission_repository = commissionRepository;
  private _user_subscription_repository = userSubscriptionRepository;
  private commissionService = new CommissionService();

  @Cron('0 */10 * * * *') // every 10 minutes
  async handleConversion() {
    console.log('Process to automatically approve/reject pending commissions');
    const commissions =
      await this._commission_repository.findCommissionCanConvert();

    for (const commission of commissions) {
      console.log('Commission', commission);
      const userSubscription = await this._user_subscription_repository.findOne(
        {
          user_id: commission.user_id,
        },
      );
      // Reject when user already cancel subscription
      if (!userSubscription) {
        console.log('User cancel subscription, reject this commission');
        await this.commissionService.rejectCommission(commission);
        return;
      }
      // Approve when user keep subscription
      console.log('User keep subscription, approve this commission');
      await this.commissionService.approvalCommission(commission);
    }
  }
}
