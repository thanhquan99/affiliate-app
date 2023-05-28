import { ModelFields } from 'src/db/entities/BaseModel';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronJobsService {
  @Cron('0 */10 * * * *')
  async handleCron() {
    console.log('Run cronjob');
  }
}
