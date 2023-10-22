import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { FinanceStatusService } from './finance_status.service';
import { FinanceStatusController } from './finance_status.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FinanceStatusController],
  providers: [FinanceStatusService],
})
export class FinanceStatusModule {}
