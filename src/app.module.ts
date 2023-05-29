import { CronJobsModule } from './cron-job/cron-jobs.module';
import { RoleGuard } from './middleware/guards/role.guard';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import { SubscriptionModule } from './api/client/subscription/subscription.module';
import { UserModule } from './api/client/user/user.module';
import { WebhookModule } from './api/client/webhook/webhook.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    CronJobsModule,
    SubscriptionModule,
    UserModule,
    WebhookModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
