import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FinanceStatusService } from './finance_status.service';
import { CreateFinanceStatusDto, UpdateFinanceStatusDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Finance Status")
@Controller('finance-status')
export class FinanceStatusController {
  constructor(private readonly financeStatusService: FinanceStatusService) {}

  @ApiOperation({ summary: "| Create status" })
  @Post()
  createStatus(@Body() createFinanceStatusDto: CreateFinanceStatusDto) {
    return this.financeStatusService.createStatus(createFinanceStatusDto);
  }

  @ApiOperation({ summary: "| Fina all statuses" })
  @Get()
  findAllStatuses() {
    return this.financeStatusService.findAllStatuses();
  }

  @ApiOperation({ summary: "| Find one status" })
  @Get(':id')
  findOneStatus(@Param('id') id: string) {
    return this.financeStatusService.findOneStatus(+id);
  }

  @ApiOperation({ summary: "| Update status" })
  @Put(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateFinanceStatusDto: UpdateFinanceStatusDto,
  ) {
    return this.financeStatusService.updateStatus(+id, updateFinanceStatusDto);
  }

  @ApiOperation({ summary: "| Delete status" })
  @Delete(':id')
  removeStatus(@Param('id') id: string) {
    return this.financeStatusService.removeStatus(+id);
  }
}
