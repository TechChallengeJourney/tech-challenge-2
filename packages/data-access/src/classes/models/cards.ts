export interface Card {
  _id: string;
  userId: string;
  cardNumber: number;
  name: string;
  functions: string[]; // Ex: ["credit"]
  variant: string[]; // Ex: ["black"]
  expirationDate: string; // ISO string
  cvv: number;
  flag: string; // Ex: "Elo"
  blocked: boolean;
  limit: number; // Ex: 35000
}
