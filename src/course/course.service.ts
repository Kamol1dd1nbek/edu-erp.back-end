import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Course } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  // ------------------------- Create Course ------------------------- //
  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    let conflict = await this.prisma.course.findFirst({
      where: {
        name: createCourseDto.name,
      },
    });
    if (conflict)
      throw new HttpException(
        `This course named ${createCourseDto.name} has already been created`,
        HttpStatus.BAD_REQUEST,
      );
    try {
      const newCourse = await this.prisma.course.create({
        data: createCourseDto,
      });
      return newCourse;
    } catch (error) {
      console.error(error.message, 'path: course.service.ts -> createCourse');
    }
  }

  // ------------------------- Find All Courses ------------------------- //
  async findAllCourses(): Promise<Course[]> {
    try {
      const allCourses = await this.prisma.course.findMany({});
      return allCourses;
    } catch (error) {
      console.log(error.message, 'path: course.service.ts -> findAllCourses');
    }
  }

  // ------------------------- Find Course -------------------------//
  async findOneCourse(id: number): Promise<Course> {
    let wantedCourse: Course;
    try {
      wantedCourse = await this.prisma.course.findFirst({
        where: { id },
      });
    } catch (error) {
      console.log(error.message, 'course.service.ts -> findOneCourse');
    }
    if (!wantedCourse)
      throw new HttpException(
        `Course with ${id} id not found`,
        HttpStatus.BAD_REQUEST,
      );
    return wantedCourse;
  }

  // ------------------------- Update Course -------------------------//
  async updateCourse(
    id: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    let updatedCourse: Course;
    try {
      updatedCourse = await this.prisma.course.update({
        where: { id },
        data: updateCourseDto,
      });
    } catch (error) {
      throw new HttpException(
        `Course with ${id} id was not updated`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return updatedCourse;
  }

  // ------------------------- Remove Course -------------------------//
  async removeCourse(id: number): Promise<Course> {
    let removedCourse: Course;
    try {
      removedCourse = await this.prisma.course.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Course with ${id} id was not deleted`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return removedCourse;
  }
}
