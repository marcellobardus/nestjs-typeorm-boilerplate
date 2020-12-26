import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule.forFeature([User]), UsersService],
})
export class UsersModule {}
