import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';

import { compare } from 'bcrypt';
import { User } from 'src/users/user.entity';
import { JwtBodyInterface } from './interfaces/jwt.body.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.repository.findOne({ email });
    if (!user) return null;

    const passwordOk = await compare(password, user.password);

    if (!passwordOk) return null;

    return user;
  }

  async issueJwt(user: User): Promise<string> {
    const payload: JwtBodyInterface = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }
}
