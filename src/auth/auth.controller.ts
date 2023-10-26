import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LoginDto } from './dto';
@ApiTags('AUTH')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '| Login' })
  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return this.authService.login(loginDto, req);
  }
}
