export interface Action {
  account: string;
  authorizations?: any[];
  blockId: number;
  createdAt: number;
  data?: any;
  id: number;
  seq: number;
  name: string;
  transaction: string;
}