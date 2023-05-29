import { CronJobsModule } from './cron-job/cron-jobs.module';
import { RoleGuard } from './middleware/guards/role.guard';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import { SubscriptionModule } from './api/client/subscription/subscription.module';
import { UserModule } from './api/client/user/user.module';
import { WebhookModule } from './api/client/webhook/webhook.module';
import { CommissionModule } from './api/client/commission/commission.module';
import { TransactionModule } from './api/client/transaction/transaction.module';
import { AdminUserModule } from './api/admin/admin-user/admin-user.module';
import { AdminCommissionModule } from './api/admin/admin-commission/admin-commission.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    CronJobsModule,
    SubscriptionModule,
    UserModule,
    WebhookModule,
    CommissionModule,
    TransactionModule,
    AdminUserModule,
    AdminCommissionModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
