import { FinanceStatusModule } from './finance_status/finance_status.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoomModule } from './room/room.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'profiles'),
      serveRoot: '/api',
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    FinanceStatusModule,
    CourseModule,
    PrismaModule,
    RoomModule,
    RoleModule,
    UserModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
