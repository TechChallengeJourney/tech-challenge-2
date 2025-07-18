enum CardFlag {
  Visa = "Visa",
  MasterCard = "MasterCard",
  Elo = "Elo",
}

export interface CardData {
  name: string;
  cardNumber: number;
  expirationDate: string;
  limit: number;
  expend?: string;
  blocked: boolean;
  flag: CardFlag;
  functions: string[];
  userId: string | null;
  variant: string;
  cvv: number | null;
  _id: string | null;
}