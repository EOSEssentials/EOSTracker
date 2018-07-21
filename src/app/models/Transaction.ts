export interface Transaction {
  blockId: number;
  createdAt: number;
  expiration: number;
  id: string;
  numActions: number;
  pending: boolean;
  refBlockPrefix: number;
  updatedAt: number;
}
