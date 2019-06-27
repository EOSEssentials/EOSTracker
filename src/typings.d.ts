/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Window { ConfettiGenerator: any }

declare module 'eosjs';

declare module "*.json" {
  const value: any;
  export default value;
}