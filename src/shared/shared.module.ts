import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TmdbService } from './services/tmdb.service';
import { ViaplayService } from './services/viaplay.service';

@Module({
  imports: [HttpModule],
  providers: [ViaplayService, TmdbService],
  exports: [HttpModule, ViaplayService, TmdbService]
})
export class SharedModule {}
