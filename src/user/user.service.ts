import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserSelectType } from '../types';
import { QueryParams, userSelect } from './templates';
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
    let hashed_password: string;
    try {
      hashed_password = await bcrypt.hash(username, 7);
    } catch (error) {
      console.log(
        error.message,
        ' path: user.service.ts -> createUser -> hashshed_password',
      );
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
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

  // ------------------------- Find Users With Options ------------------------- //
  async findUsersWithOptional(q: QueryParams) {
    try {
      const wantedUsers = await this.prisma.user.findMany({
        where: {
          OR: [
            //or AND :)
            q.id ? { id: Number(q?.id) } : {},
            q.username
              ? {
                  username: {
                    contains: q?.username,
                  },
                }
              : {},
            q.role
              ? {
                  role: {
                    name: q?.role,
                  },
                }
              : {},
          ],
        },
        select: userSelect,
        take: Number(q?.limit) || 10,
        skip: Number((+q?.page - 1) * +(q?.limit || 10)) || 1,
      });
      const count = await this.prisma.user.count({
        where: {
          role: {
            name: q?.role,
          },
        },
      });

      return { count, users: wantedUsers };
    } catch (error) {
      console.log(
        error.message,
        ' path: user.service.ts -> findUsersWithOptional',
      );
    }
  }

  // ------------------------- Update User ------------------------- //
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    // const
  }

  // ------------------------- Delete User ------------------------- //
  async removeUser(id: number) {
    return `This action removes a #${id} user`;
  }
}
