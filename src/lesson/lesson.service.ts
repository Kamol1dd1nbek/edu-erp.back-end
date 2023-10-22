import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Group } from '@prisma/client';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}

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

    //     let now = new Date("2023-10-18 8:00");  // start date
    // const when = [1, 2, 3, 4, 5];           // when lesson
    // const lessons = [];                     // dars jadvali
    // const count = 5;                       // lessons count
    // for (let i = 0; count >= lessons.length ; i++) {
    //   // console.log(weak[now.getDay()]);
    //   let day = now.getDay();
    //   // console.log(weak[day])

    //   if (when.includes(day)) {
    //     lessons.push(new Date(now))
    //     console.log(now)
    //   }
    //   now.setDate(now.getDate() + 1);
    // }
    // console.log(lessons)
  }
  // notion.sa/Project-uchun-reja-122bafd34878461886de67a178fcda16
  // findAll() {
  //   return `This action returns all lesson`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} lesson`;
  // }

  // update(id: number, updateLessonDto: UpdateLessonDto) {
  //   return `This action updates a #${id} lesson`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} lesson`;
  // }
}
