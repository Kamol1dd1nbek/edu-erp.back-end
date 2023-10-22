import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LessonModule } from '../lesson/lesson.module';

@Module({
  imports: [PrismaModule, LessonModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
