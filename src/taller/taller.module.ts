import { Module } from '@nestjs/common';
import { TallerService } from './taller.service';
import { TallerController } from './taller.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [TallerController],
  providers: [TallerService],
  imports: [DatabaseModule]
})
export class TallerModule {}
