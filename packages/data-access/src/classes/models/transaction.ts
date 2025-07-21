export interface Transaction {
  _id: string;
  date: Date;
  type: string;
  value: number;
  userId?: string;
  createdAt: string
  categoryId?: string;
  methodId?: string;
}



