import { Module } from '@nestjs/common';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';

@Module({
  providers: [BattleService],
  controllers: [BattleController],
})
export class BattleModule {}
