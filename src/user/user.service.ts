import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserSelectType } from '../types';
import { userSelect } from './templates';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // ------------------------- Create User ------------------------- //
  async createUser(createUserDto: CreateUserDto): Promise<UserSelectType> {
    const { username, role_id } = createUserDto;
    const role = await this.prisma.role.findFirst({
      where: { id: role_id },
    });
    if (!role)
      throw new HttpException(
        `No role found with id ${role_id}`,
        HttpStatus.BAD_REQUEST,
      );
    const conflict = await this.prisma.user.findUnique({
      where: { username },
    });
    if (conflict)
      throw new HttpException(
        `User with phone number ${createUserDto.username} already exists`,
        HttpStatus.CONFLICT,
      );
    const hashed_password = await bcrypt.hash(
      username,
      parseInt(process.env.BCRYPT_SALT) || 8,
    );
    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...createUserDto,
          hashed_password,
          role_id,
        },
        select: userSelect,
      });
      return newUser;
    } catch (error) {
      throw new HttpException(`The process failed`, HttpStatus.BAD_REQUEST);
    }
  }

  // ------------------------- Find All Users ------------------------- //
  async findAllUsers(): Promise<UserSelectType[]> {
    try {
      const allUsers = await this.prisma.user.findMany({
        select: userSelect,
      });
      return allUsers;
    } catch (error) {
      console.log(error.message, 'path: user.service.ts -> create user');
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  // ------------------------- Find One User By Id ------------------------- //
  async findOneUser(id: number): Promise<UserSelectType> {
    let wantedUser: UserSelectType;
    try {
      wantedUser = await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: userSelect,
      });
    } catch (error) {
      console.log(error.message, 'path: user.service.ts -> findOneUser');
    }
    if (!wantedUser)
      throw new HttpException(
        `User with ${id} id not found`,
        HttpStatus.BAD_REQUEST,
      );
    return wantedUser;
  }

  // ------------------------- Find One User ------------------------- //
  async findOne2(id: number) {
    return `This action returns a #${id} user`;
  }

  // ------------------------- Update User ------------------------- //
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return 'updated';
  }

  // ------------------------- Delete User ------------------------- //
  async removeUser(id: number) {
    return `This action removes a #${id} user`;
  }
}
 