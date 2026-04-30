export type ValueOf<T extends object> = T[keyof T];

export interface ListResponse<T> {
  previous: number | null;
  next: number | null;
  count: number;
  results: T[];
}
