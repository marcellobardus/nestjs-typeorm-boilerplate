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

  /**
   *
   * @param email - user email
   * @param password - user password
   * @returns - user's id after insert
   */
  async insert(email: string, password: string): Promise<number> {
    const user = new User();
    user.email = email;
    user.password = password;
    await this.repository.insert(user);
    return user.id;
  }
}
