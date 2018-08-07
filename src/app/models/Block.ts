export interface Block {
  actionMerkleRoot: string;
  blockNumber: number;
  confirmed: number;
  id: string;
  irreversible: boolean;
  newProducers: any;
  numTransactions: number;
  prevBlockId: string;
  producer: string;
  timestamp: number;
  transactionMerkleRoot: string;
  version: number;
  chainData?: any;
}
