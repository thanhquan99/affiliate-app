import { Module } from '@nestjs/common';
import { CommissionService } from '../../client/commission/commission.service';
import { AdminCommissionController } from './admin-commission.controller';

@Module({
  controllers: [AdminCommissionController],
  providers: [CommissionService],
})
export class AdminCommissionModule {}
