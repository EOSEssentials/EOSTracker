export type Result<T> = {
  isError: true;
  error: any;
} | {
  isError: false;
  value: T;
}
