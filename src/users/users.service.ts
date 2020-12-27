import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  public repository: Repository<User>;

  constructor(
    @InjectRepository(User)
    usersRepository: Repository<User>,
  ) {
    this.repository = usersRepository;
  }

  async insert(email: string, password: string): Promise<number | null> {
    const user = new User();
    user.email = email;
    user.password = password;
    return user
      .save()
      .then(user => user.id)
      .catch(() => null);
  }
}
