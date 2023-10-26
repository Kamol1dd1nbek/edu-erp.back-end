import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
// import { SmsModule } from '../sms/sms.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
