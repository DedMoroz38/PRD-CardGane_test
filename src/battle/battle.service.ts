import { Injectable } from '@nestjs/common';
import { SubmitRoasterDto } from './dto/submit-roaster.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BattleService {
  constructor(private prisma: PrismaService) {}

  async submitRoaster({ userId, cards }: SubmitRoasterDto) {
    await this.prisma.rosters.create({
      data: {
        battle_id: null,
        userId: userId,
        cards: cards as unknown as Prisma.JsonObject,
        created_at: new Date(),
      },
    });
  }

  async startNewRound() {
    const rosters = await this.prisma.rosters.findMany({
      where: { battle_id: null },
    });

    for (let i = 0; i < rosters.length; i += 2) {
      if (rosters[i + 1]) {
        const user1roster = rosters[i];
        const user2roster = rosters[i + 1];

        const battleId = await this.createBattleRound(
          user1roster.userId,
          user2roster.userId,
        );

        await this.prisma.rosters.updateMany({
          where: {
            id: { in: [user1roster.id, user2roster.id] },
            used: false,
          },
          data: { battle_id: battleId, used: true },
        });
      }
    }
  }

  async createBattleRound(user1_id: number, user2_id: number) {
    const winner_id = this.getRandomWinner(user1_id, user2_id);

    const battle = await this.prisma.battles.create({
      data: {
        user1_id: user1_id,
        user2_id: user2_id,
        winner_id: winner_id,
      },
    });

    return battle.id;
  }

  getRandomWinner(user1_id: number, user2_id: number) {
    const winnerId = Math.random() < 0.5 ? user1_id : user2_id;
    return winnerId;
  }
}
