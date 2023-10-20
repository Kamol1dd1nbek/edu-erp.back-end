import { Injectable } from '@nestjs/common';
import { CreateRoomDto, UpdateRoomDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(createRoomDto: CreateRoomDto) {
    try {
      const conflict = await this.prisma.room.findUnique({
        where: {
          name: createRoomDto.name,
        },
      });
      if (conflict)
        throw new HttpException(
          `This room named ${createRoomDto.name} has already been created`,
          HttpStatus.BAD_REQUEST,
        );
      const newRoom = await this.prisma.room.create({
        data: createRoomDto,
      });
      return {
        status: HttpStatus.CREATED,
        msg: `Room: '${createRoomDto.name}' successfully created`,
        new_room: newRoom
      }
    } catch (error) {
      console.error(error, 'path: room.service.ts -> createRoom');
    }
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
