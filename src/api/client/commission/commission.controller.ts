import { Controller } from '@nestjs/common';
import { CommissionService } from './commission.service';

@Controller('commission')
export class CommissionController {
  private service = new CommissionService();
}
