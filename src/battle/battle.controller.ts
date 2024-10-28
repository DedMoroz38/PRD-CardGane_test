import { Body, Controller, Post } from '@nestjs/common';
import { BattleService } from './battle.service';
import { SubmitRoasterDto } from './dto/submit-roaster.dto';

@Controller('battle')
export class BattleController {
  constructor(private battleService: BattleService) {}

  @Post('submit-roaster')
  submitRoaster(@Body() submitRoasterDto: SubmitRoasterDto) {
    return this.battleService.submitRoaster(submitRoasterDto);
  }

  @Post('start-battle-rounds')
  // @Roles(Role.Admin)
  // @UseGuards(RolesGuard) – ustom guard to check if the user is an admin
  async startBattleRound() {
    return this.battleService.startNewRound();
  }
}
