import { PrismaService } from '../prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateLessonDto } from './dto';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}

  // ------------------------- Create Lessons ------------------------- //
  async createLessons(groupData) {
    const { id, start_date, days, course } = groupData;
    const start = new Date(parseInt(start_date)); // 2023-10-24
    const lessons = [];
    for (let i = 0; course.lessons_count > lessons.length; i++) {
      let day = start.getDay();
      if (days.includes(day)) {
        lessons.push({
          date: new Date(start),
          group_id: id,
        });
      }
      start.setDate(start.getDate() + 1);
    }
    await this.prisma.lesson.createMany({
      data: lessons,
    });
  }

  // findAll() {
  //   return `This action returns all lesson`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} lesson`;
  // }

  // ------------------------- Update Lesson ------------------------- //
  async updateStatus(id: number, updateLessonDto: UpdateLessonDto) {
    const { status, title } = updateLessonDto;
    if (status == true || status == false) {
      const lesson = await this.prisma.lesson.findFirst({
        where: { id },
      });
      const group = await this.prisma.group.findFirst({
        where: { id: lesson.group_id },
      });
      if (!lesson)
        throw new HttpException(
          `No lesson found with ID ${id}`,
          HttpStatus.NOT_FOUND,
        );

      const allThisGroupLessons = await this.prisma.lesson.findMany({
        where: {
          group_id: lesson.group_id,
        },
        orderBy: [
          {
            id: 'desc',
          },
        ],
      });
      if (!status) {
        await this.prisma.lesson.update({
          where: { id },
          data: { status },
        });
        const last_lesson = allThisGroupLessons[0];
        const last_date = new Date(last_lesson.date);

        while (true) {
          last_date.setDate(last_date.getDate() + 1);
          let day = last_date.getDay();
          if (group.days.includes(day)) {
            await this.prisma.lesson.create({
              data: {
                date: new Date(last_date),
                group_id: group.id,
              },
            });
            break;
          }
        }
      } else {
        const now = new Date();
        const lesson_date = new Date(lesson.date);
        console.log(now, lesson_date);
        if (now >= lesson_date) {
          throw new HttpException('Date ', HttpStatus.BAD_REQUEST);
        }
        if (!lesson.status) {
          await this.prisma.lesson.update({
            where: { id },
            data: { status },
          });
          await this.prisma.lesson.delete({
            where: { id: allThisGroupLessons[0].id },
          });
        }
      }
    }
  }

  // async updateTitle(id: number, updateLessonDto: UpdateLessonDto) {
  //   const { status, title } = updateLessonDto;
  //   if (status == true || status == false) {
  //     const lesson = await this.prisma.lesson.findFirst({
  //       where: { id },
  //     });
  //     const group = await this.prisma.group.findFirst({
  //       where: { id: lesson.group_id },
  //     });
  //     if (!lesson)
  //       throw new HttpException(
  //         `No lesson found with ID ${id}`,
  //         HttpStatus.NOT_FOUND,
  //       );

  //     const allThisGroupLessons = await this.prisma.lesson.findMany({
  //       where: {
  //         group_id: lesson.group_id,
  //       },
  //       orderBy: [
  //         {
  //           id: 'desc',
  //         },
  //       ],
  //     });
  //     if (!status) {
  //       await this.prisma.lesson.update({
  //         where: { id },
  //         data: { status },
  //       });
  //       const last_lesson = allThisGroupLessons[0];
  //       const last_date = new Date(last_lesson.date);

  //       while (true) {
  //         last_date.setDate(last_date.getDate() + 1);
  //         let day = last_date.getDay();
  //         if (group.days.includes(day)) {
  //           await this.prisma.lesson.create({
  //             data: {
  //               date: new Date(last_date),
  //               group_id: group.id,
  //             },
  //           });
  //           break;
  //         }
  //       }
  //     } else {
  //       const now = new Date();
  //       const lesson_date = new Date(lesson.date);
  //       console.log(now, lesson_date);
  //       if (now >= lesson_date) {
  //         throw new HttpException('Date ', HttpStatus.BAD_REQUEST);
  //       }
  //       if (!lesson.status) {
  //         await this.prisma.lesson.update({
  //           where: { id },
  //           data: { status },
  //         });
  //         await this.prisma.lesson.delete({
  //           where: { id: allThisGroupLessons[0].id },
  //         });
  //       }
  //     }
  //   }
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} lesson`;
  // }
}
