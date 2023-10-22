import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateFinanceStatusDto, UpdateFinanceStatusDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { FinanceStatus } from '@prisma/client';

@Injectable()
export class FinanceStatusService {
  constructor(private readonly prisma: PrismaService) {}

  // ------------------------- Create Status ------------------------- //
  async createStatus(
    createFinanceStatusDto: CreateFinanceStatusDto,
  ): Promise<FinanceStatus> {
    const formatedName = createFinanceStatusDto.name.toLowerCase();
    let conflict = await this.prisma.financeStatus.findFirst({
      where: {
        name: formatedName,
      },
    });
    if (conflict)
      throw new HttpException(
        `This status named ${createFinanceStatusDto.name} has already been created`,
        HttpStatus.BAD_REQUEST,
      );
    try {
      const newStatus = await this.prisma.financeStatus.create({
        data: { ...createFinanceStatusDto, name: formatedName },
      });
      return newStatus;
    } catch (error) {
      console.error(
        error.message,
        'path: finance_status.service.ts -> createStatus',
      );
    }
  }

  // ------------------------- Find All Status ------------------------- //
  async findAllStatuses(): Promise<FinanceStatus[]> {
    try {
      const allStatuses = await this.prisma.financeStatus.findMany({});
      return allStatuses;
    } catch (error) {
      console.info(
        error.message,
        'finance_status.service.ts -> findAllStatuses',
      );
    }
  }

  // ------------------------- Find One Status ------------------------- //
  async findOneStatus(id: number): Promise<FinanceStatus> {
    let wantedStatus: FinanceStatus;
    try {
      wantedStatus = await this.prisma.financeStatus.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      console.info(error.message, 'finance_status.service.ts -> findOneStatus');
    }
    if (!wantedStatus)
      throw new HttpException(
        `Status with ${id} id not found`,
        HttpStatus.BAD_REQUEST,
      );
    return wantedStatus;
  }

  // ------------------------- Update Status ------------------------- //
  async updateStatus(
    id: number,
    updateFinanceStatusDto: UpdateFinanceStatusDto,
  ): Promise<FinanceStatus> {
    let updatedStatus: FinanceStatus;
    try {
      updatedStatus = await this.prisma.financeStatus.update({
        where: { id },
        data: {...updateFinanceStatusDto, name: updateFinanceStatusDto?.name?.toLowerCase()},
      });
    } catch (error) {
      throw new HttpException(
        `Status with ${id} id was not updated`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return updatedStatus;
  }

  // ------------------------- Delete Status ------------------------- //
  async removeStatus(id: number): Promise<FinanceStatus> {
    let removedStatus: FinanceStatus;
    try {
      removedStatus = await this.prisma.financeStatus.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Status with ${id} id was not deleted`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return removedStatus;
  }
}
