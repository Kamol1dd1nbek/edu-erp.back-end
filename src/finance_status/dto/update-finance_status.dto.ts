import { PartialType } from '@nestjs/swagger';
import { CreateFinanceStatusDto } from './create-finance_status.dto';

export class UpdateFinanceStatusDto extends PartialType(CreateFinanceStatusDto) {}
