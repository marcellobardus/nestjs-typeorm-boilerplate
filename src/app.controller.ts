import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { Request as ExpressRequest } from 'express';

import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guard';
import { CredentialsDto } from './dtos';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() dto: CredentialsDto) {
    const id = await this.usersService.insert(dto.email, dto.password);
    return { success: id !== null, id };
  }

  @Post('signin')
  async signin(@Body() dto: CredentialsDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.authService.issueJwt(user);
    return { token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async testProtected(@Request() req: ExpressRequest) {
    return req.user;
  }
}
