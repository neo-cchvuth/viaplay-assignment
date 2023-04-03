import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { SharedModule } from '../src/shared/shared.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, SharedModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Viaplay Assignment');
  });

  it('/trailer/movie (GET)', () => {
    return request(app.getHttpServer())
      .get(
        '/trailer/movie?resource_link=https://content.viaplay.se/pc-se/film/arrival-2016'
      )
      .expect(200)
      .expect(
        '{"site":"YouTube","url":"https://www.youtube.com/watch?v=7W1m5ER3I1Y"}'
      );
  });

  it('/trailer/movie (GET)', () => {
    return request(app.getHttpServer())
      .get(
        '/trailer/movie?resource_link=https://content.viaplay.se/pc-se/film/delias-gone-2022'
      )
      .expect(200)
      .expect(
        '{"site":"YouTube","url":"https://www.youtube.com/watch?v=cSBeryc1Vtg"}'
      );
  });
});
