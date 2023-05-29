import { Module } from '@nestjs/common';
import { CommissionService } from '../api/client/commission/commission.service';
import { CronJobsService } from './cron-jobs.service';

@Module({
  providers: [CronJobsService, CommissionService],
})
export class CronJobsModule {}
