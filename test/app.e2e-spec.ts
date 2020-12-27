import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app;
  let authToken;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('/api/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/signup')
      .send({
        email: 'foo@bar.com',
        password: 'example',
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.success).toBeTruthy();
      });
  });

  it('/api/signin (POST)', () => {
    return request(app.getHttpServer())
      .post('/signin')
      .send({
        email: 'foo@bar.com',
        password: 'example',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.token).toBeDefined();
        authToken = response.body.token;
      });
  });

  it('/api/test (GET)', () => {
    return request(app.getHttpServer())
      .get('/test')
      .auth(authToken, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.email).toEqual('foo@bar.com');
        expect(response.body.id).toEqual(1);
      });
  });
});
