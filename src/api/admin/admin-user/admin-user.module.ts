import { Module } from '@nestjs/common';
import { UserService } from '../../client/user/user.service';
import { AdminUserController } from './admin-user.controller';

@Module({
  controllers: [AdminUserController],
  providers: [UserService],
})
export class AdminUserModule {}
