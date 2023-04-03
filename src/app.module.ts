import {
  ConsoleLogger,
  MiddlewareConsumer,
  Module,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedModule } from './shared/shared.module';
import { TrailerModule } from './features/trailer/trailer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot(), SharedModule, TrailerModule],
  controllers: [AppController],
  providers: [AppService, ConsoleLogger]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
