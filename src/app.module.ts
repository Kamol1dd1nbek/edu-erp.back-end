import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { CourseModule } from './course/course.module';
import { FinanceStatusModule } from './finance_status/finance_status.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    RoomModule,
    CourseModule,
    FinanceStatusModule,
    RoleModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
