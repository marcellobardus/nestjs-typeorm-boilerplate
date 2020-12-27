import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app;
  let authToken;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('/signup (POST)', () => {
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

  it('/signin (POST)', () => {
    return request(app.getHttpServer())
      .post('/signip')
      .send({
        email: 'foo@bar.com',
        password: 'example',
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.token).toBeDefined();
        authToken = response.body.token;
      });
  });

  it('/test (GET)', () => {
    return request(app.getHttpServer())
      .get('/test')
      .auth(authToken, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.email).toEqual('foo@bar.com');
        expect(response.body.id).toEqual('1');
      });
  });
});
