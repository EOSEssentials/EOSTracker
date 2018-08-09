export interface Transaction {
  blockId: number;
  createdAt: number;
  createdAtISO: string;
  expiration: number;
  expirationISO: string;
  id: string;
  numActions: number;
  pending: boolean;
  refBlockPrefix: number;
  updatedAt: number;
  updatedAtISO: string;
  chainData?: any;
}
