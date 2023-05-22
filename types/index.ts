export type UserType = {
  id?: string;
  userName: string;
  color: string;
};

export type Category = {
  id: string;
  name: string;
  chartColor: string;
  userId: string;
  type: string;
};

export type Transaction = {
  id: string;
  date: Date;
  categoryId: string;
  amount: string;
  accountId: string;
  note: string;
  transactionType: string;
};
