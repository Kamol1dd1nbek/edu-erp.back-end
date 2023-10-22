import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '| Create role' })
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: '| Get all roles' })
  @Get()
  findAllRoles() {
    return this.roleService.findAllRoles();
  }

  @ApiOperation({ summary: '| Get one role' })
  @Get(':id')
  findOneRole(@Param('id') id: string) {
    return this.roleService.findOneRole(+id);
  }

  @ApiOperation({ summary: '| Update role' })
  @Put(':id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(+id, updateRoleDto);
  }

  @ApiOperation({ summary: '| Delete role' })
  @Delete(':id')
  removeRole(@Param('id') id: string) {
    return this.roleService.removeRole(+id);
  }
}
