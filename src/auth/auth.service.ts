import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { JwtPayload, Tokens } from './types';
import { userSelect } from '../user/templates';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  // , res: Response
  // ------------------------- Log In------------------------- //
  async login(loginDto: LoginDto, req: Request) {
    const { username, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user)
      throw new HttpException(
        'Username or password wrong!',
        HttpStatus.BAD_REQUEST,
      );
    const isMatchPassword = await bcrypt.compare(
      password,
      user.hashed_password,
    );

    if (!isMatchPassword)
      throw new HttpException(
        'Username or password wrong!',
        HttpStatus.BAD_REQUEST,
      );
    if (!user.status)
      throw new HttpException(
        'Your status is not active',
        HttpStatus.FORBIDDEN,
      );
    const tokens = await this.getTokens(user, req);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        hashed_refresh_token,
      },
      select: userSelect,
    });
    return { user: updatedUser, tokens };
  }

  async logOut() {
    // await this.smsService.sendSms("+998996307834", "2006")
  }

  // Get tokens
  async getTokens(user: User, req: Request): Promise<Tokens> {
    const agent = await bcrypt.hash(req.headers['user-agent'], 7);
    const jwPayload: JwtPayload = {
      id: user.id,
      status: user.status,
      role_id: user.role_id,
      agent,
    };
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(jwPayload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        }),
        this.jwtService.signAsync(jwPayload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }),
      ]);
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      console.log(error.message, ' path: auth.service.ts -> getTokens');
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST);
    }
  }
}
