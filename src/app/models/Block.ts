import { Transaction } from './Transaction';

export interface Block {
  actionMerkleRoot: string;
  blockNumber: number;
  confirmed: number;
  id: string;
  irreversible?: boolean;
  newProducers: any;
  numTransactions: number;
  prevBlockId: string;
  producer: string;
  timestamp: number;
  timestampISO: string;
  transactionMerkleRoot: string;
  version: number;
  transactions?: Transaction[];
  chainData?: any;
}
