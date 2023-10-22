import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LessonService } from '../lesson/lesson.service';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService,
    private readonly lossonService: LessonService) {}

  // ------------------------- Create Group ------------------------- //
  async createGroup(createGroupDto: CreateGroupDto) {
    const { name } = createGroupDto;
    const conflict = await this.prisma.group.findFirst({
      where: {
        name,
      },
    });
    if (conflict)
      throw new HttpException(
        `This group named ${name} has already been created`,
        HttpStatus.BAD_REQUEST,
      );
    try {
      const newGroup = await this.prisma.group.create({
        data: createGroupDto,
        include: {
          course: true
        }
      });
      await this.lossonService.createLessons(newGroup);
      return newGroup;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        `Group with '${name}' name was not created`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ------------------------- Get All Groups ------------------------- //
  async findAll() {
    try {
      const allGroups = await this.prisma.group.findMany({
        include: {
          course: {
            select: {
              name: true,
            },
          },
        },
      });
      return { count: allGroups.length, allGroups };
    } catch (error) {
      console.log(error.message, "path: ");
      
    }
  }

  // ------------------------- Get One Group ------------------------- //
  findOne(id: number) {
    
  }

  // ------------------------- Update Group ------------------------- //
  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  // ------------------------- Remove Group ------------------------- //
  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
