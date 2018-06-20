export interface Action {
  account: string;
  authorizations?: any[];
  blockId: number;
  createdAt: number;
  data?: any;
  id: string;
  name: string;
  transaction: string;
}