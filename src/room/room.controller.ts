import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Rooms')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: '| Create room' })
  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }

  @ApiOperation({ summary: '| Get all rooms' })
  @Get()
  findAllRooms() {
    return this.roomService.findAllRooms();
  }

  @ApiOperation({ summary: '| Get one room' })
  @Get(':id')
  findOneRoomById(@Param('id') id: string) {
    return this.roomService.findOneRoomById(+id);
  }

  @ApiOperation({ summary: '| Update room' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.updateRoom(+id, updateRoomDto);
  }

  @ApiOperation({ summary: '| Delete room' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.removeRoom(+id);
  }
}
