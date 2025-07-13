export interface Card {
  _id: string;
  userId: string;
  cardNumber: string;
  name: string;
  functions: string[]; // Ex: ["credit"]
  variant: string[]; // Ex: ["black"]
  expirationDate: string; // ISO string
  cvv: number;
  flag: string; // Ex: "Elo"
  blocked: boolean;
  limit: string | number; // Ex: "35.000,00"
}
