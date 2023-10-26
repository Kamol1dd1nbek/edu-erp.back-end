import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Groups")
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({ summary: "| Create group" })
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @ApiOperation({ summary: "| Get all groups" })
  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @ApiOperation({ summary: "| Get one group" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @ApiOperation({ summary: "| Update group" })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @ApiOperation({ summary: "| Delete group" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
