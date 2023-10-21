import { Injectable } from '@nestjs/common';
import { CreateRoomDto, UpdateRoomDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Room } from '@prisma/client';
@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  // ------------------------- Create Room ------------------------- //
  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    let conflict = await this.prisma.room.findUnique({
      where: {
        name: createRoomDto.name,
      },
    });
    if (conflict)
      throw new HttpException(
        `This room named ${createRoomDto.name} has already been created`,
        HttpStatus.BAD_REQUEST,
      );
    try {
      const newRoom = await this.prisma.room.create({
        data: createRoomDto,
      });
      return newRoom;
    } catch (error) {
      console.error(error.message, 'path: room.service.ts -> createRoom');
    }
  }

  // ------------------------- Find All Rooms ------------------------- //
  async findAllRooms(): Promise<Room[]> {
    try {
      const allRooms = await this.prisma.room.findMany();
      return allRooms;
    } catch (error) {
      console.info(error.message, 'path: room.service.ts -> findAllRooms');
    }
  }

  // ------------------------- Find by Id Room ------------------------- //
  async findOneRoomById(id: number): Promise<Room> {
    let wantedRoom: Room;
    try {
      wantedRoom = await this.prisma.room.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error.message, 'path: room.service.ts -> findOneRoomById');
    }
    if (!wantedRoom)
      throw new HttpException(
        `Room with ${id} id not found`,
        HttpStatus.BAD_REQUEST,
      );
    return wantedRoom;
  }

  // ------------------------- Update Room ------------------------- //
  async updateRoom(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    let updatedRoom: Room;
    try {
      updatedRoom = await this.prisma.room.update({
        where: { id },
        data: updateRoomDto,
      });
    } catch (error) {
      throw new HttpException(
        `Room with ${id} id was not updated`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return updatedRoom;
  }

  // ------------------------- Remove Room ------------------------- //
  async removeRoom(id: number): Promise<Room> {
    let removedRoom: Room;
    try {
      removedRoom = await this.prisma.room.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Room with ${id} id was not deleted`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return removedRoom;
  }
}
