interface Card {
  id: number;
}

export class SubmitRoasterDto {
  cards: {
    line1: Card[];
    line2: Card[];
    line3: Card[];
  };
  userId: number;
}
