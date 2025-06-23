export interface Transaction {
  id: string;
  date: Date;
  type: string;
  value: string | number;
  userId?: string;
}

