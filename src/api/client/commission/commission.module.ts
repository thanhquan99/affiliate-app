import { Module } from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service';
import { CommissionController } from './commission.controller';
import { CommissionService } from './commission.service';

@Module({
  controllers: [CommissionController],
  providers: [CommissionService, TransactionService],
})
export class CommissionModule {}
