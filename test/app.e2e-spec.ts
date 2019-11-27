import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { response } from 'express';

describe('AppController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200);
  });
  let token;
  it('/get-token (POST)', done => {
    const payload = 'wsfsdfsdfsdf898888';
    return (
      request(app.getHttpServer())
        .post('/get-token')
        .send({ payload })
        .expect(201)
        // .expect({ response: new RegExp(`${payload}-\\\d*`) })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(new RegExp(`${payload}-\\d*`).test(res.body.response)).toBe(
            true,
          );
          token = res.body.response;
          done();
        })
    );
  });
  it('/test (POST)', () => {
    return (
      request(app.getHttpServer())
        .post('/test')
        .set({ 'x-access-token': token })
        .send({})
        // .send({ payload })
        .expect(201)
        .expect('Прошел')
    );
  });
  for (let i = 0; i < 8; i++) {
    it(`/vote 1 (POST) ${i % 3} ${i}`, () => {
      return (
        request(app.getHttpServer())
          .post('/vote')
          .set({ 'x-access-token': token })
          .send({ payload: `Тестер${i % 3}` })
          // .send({ payload })
          .expect(201)
          .expect({ response: true })
      );
    });
  }
  it(`/results (GET) `, () => {
    return (
      request(app.getHttpServer())
        .get('/results')
        .set({ 'x-access-token': token })
        // .send({ payload: `Тестер${i % 3}` })
        // .send({ payload })
        .expect(200)
        .expect([
          { votes: 3, name: 'Тестер0', position: 1 },
          { votes: 3, name: 'Тестер1', position: 2 },
          { votes: 2, name: 'Тестер2', position: 3 },
        ])
    );
  });

  it('/get-token (POST)', done => {
    const payload = 'yeruiywer898888';
    return (
      request(app.getHttpServer())
        .post('/get-token')
        .send({ payload })
        .expect(201)
        // .expect({ response: new RegExp(`${payload}-\\\d*`) })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(new RegExp(`${payload}-\\d*`).test(res.body.response)).toBe(
            true,
          );
          token = res.body.response;
          done();
        })
    );
  });
  it('/test (POST)', () => {
    return (
      request(app.getHttpServer())
        .post('/test')
        .set({ 'x-access-token': token })
        .send({})
        // .send({ payload })
        .expect(201)
        .expect('Прошел')
    );
  });
  for (let i = 0; i < 10; i++) {
    it(`/vote 2 (POST) ${i % 4} ${i}`, () => {
      return (
        request(app.getHttpServer())
          .post('/vote')
          .set({ 'x-access-token': token })
          .send({ payload: `Тестер${i % 3}` })
          // .send({ payload })
          .expect(201)
          .expect({ response: true })
      );
    });
  }
  it(`/results (GET) `, () => {
    return (
      request(app.getHttpServer())
        .get('/results')
        .set({ 'x-access-token': token })
        // .send({ payload: `Тестер${i % 3}` })
        // .send({ payload })
        .expect(200)
        .expect([
          { votes: 4, name: 'Тестер0', position: 1 },
          { votes: 3, name: 'Тестер1', position: 2 },
          { votes: 3, name: 'Тестер2', position: 3 },
        ])
    );
  });
});
