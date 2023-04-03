import { Module } from '@nestjs/common';

import { TrailerController } from './trailer.controller';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [TrailerController]
})
export class TrailerModule {}
