import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CredentialsDto } from './dtos';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() dto: CredentialsDto) {
    const exisiting = await this.usersService.repository.findOne({
      email: dto.email,
    });

    // TODO stuff below should be done by the db server, unnecessary db request

    if (exisiting) {
      throw new HttpException(
        'User with the given id already exists',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const newlyCreatedUserId = await this.usersService.insert(
      dto.email,
      dto.password,
    );

    return {
      id: newlyCreatedUserId,
    };
  }
}
