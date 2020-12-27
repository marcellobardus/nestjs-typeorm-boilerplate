import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new account', async () => {
    const account = { email: 'foo@bar.com', password: 'example' };
    const creationSuccess = await service.insert(
      account.email,
      account.password,
    );
    expect(creationSuccess).toBeDefined();

    const recreationAttempt = await service.insert(
      account.email,
      account.password,
    );

    expect(recreationAttempt).toBeNull();
  });
});
