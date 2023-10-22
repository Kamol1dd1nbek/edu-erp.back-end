import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  // ------------------------- Create Role ------------------------- //
  async createRole(
    createRoleDto: CreateRoleDto,
  ): Promise<Role> {
    const formatedName = createRoleDto.name.toLowerCase();
    let conflict = await this.prisma.role.findFirst({
      where: {
        name: formatedName,
      },
    });
    if (conflict)
      throw new HttpException(
        `This status named ${createRoleDto.name.toLowerCase()} has already been created`,
        HttpStatus.BAD_REQUEST,
      );
    try {
      const newRole = await this.prisma.role.create({
        data: { ...createRoleDto, name: formatedName },
      });
      return newRole;
    } catch (error) {
      console.error(
        error.message,
        'path: role.service.ts -> createRole',
      );
    }
  }

  // ------------------------- Find All Role ------------------------- //
  async findAllRoles(): Promise<Role[]> {
    try {
      const allRolees = await this.prisma.role.findMany({});
      return allRolees;
    } catch (error) {
      console.info(
        error.message,
        'role.service.ts -> findAllRoles',
      );
    }
  }

  // ------------------------- Find One Role ------------------------- //
  async findOneRole(id: number): Promise<Role> {
    let wantedRole: Role;
    try {
      wantedRole = await this.prisma.role.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      console.info(error.message, 'role.service.ts -> findOneRole');
    }
    if (!wantedRole)
      throw new HttpException(
        `Role with ${id} id not found`,
        HttpStatus.BAD_REQUEST,
      );
    return wantedRole;
  }

  // ------------------------- Update Role ------------------------- //
  async updateRole(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    let updatedRole: Role;
    try {
      updatedRole = await this.prisma.role.update({
        where: { id },
        data: {...updateRoleDto, name: updateRoleDto?.name?.toLowerCase()},
      });
    } catch (error) {
      throw new HttpException(
        `Role with ${id} id was not updated`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return updatedRole;
  }

  // ------------------------- Delete Role ------------------------- //
  async removeRole(id: number): Promise<Role> {
    let removedRole: Role;
    try {
      removedRole = await this.prisma.role.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Role with ${id} id was not deleted`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return removedRole;
  }
}
