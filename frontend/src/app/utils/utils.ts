import { HttpErrorResponse } from '@angular/common/http';

const NETWORK_ERR_MSG = 'Failed! Check your internet connection.';

export function getResErrMsg(res: unknown): string | null {
  if (res instanceof HttpErrorResponse) {
    if (res.error) {
      if (res.error instanceof ProgressEvent && res.status === 0) {
        return NETWORK_ERR_MSG;
      }
      const detail = res.error['detail'] as unknown;
      if (typeof detail === 'string') {
        return detail;
      }
      const nonFieldErrors = res.error['non_field_errors'] as unknown[] | undefined;
      if (nonFieldErrors && typeof nonFieldErrors[0] === 'string') {
        return nonFieldErrors[0];
      }
    }
    if (res.status === 403) return 'Forbidden.';
  }
  return null;
}

export function createResErrorHandler(
  messageSignal: { set: (value: string) => void },
  defaultMessage: string,
) {
  return (res: unknown) => messageSignal.set(getResErrMsg(res) || defaultMessage);
}

export function mergeTailwindCNs(aCN: string | string[], bCN: string | string[]) {
  const aCNs = typeof aCN === 'string' ? aCN.split(' ') : aCN;
  const bCNs = typeof bCN === 'string' ? bCN.split(' ') : bCN;
  return aCNs
    .filter((a) => !bCNs.some((b) => a.split('-')[0] === b.split('-')[0]))
    .concat(bCNs)
    .join(' ');
}

export function sortByDate<T>(
  items: readonly T[],
  dateSelector: (item: T) => Date | string,
  order: 'asc' | 'desc' = 'desc',
): T[] {
  return [...items].sort(
    (a, b) =>
      (new Date(dateSelector(a)).getTime() - new Date(dateSelector(b)).getTime()) *
      (order === 'desc' ? -1 : 1),
  );
}

export function mergeDistinctBy<T, K>(
  base: readonly T[],
  next: readonly T[],
  keySelector: (value: T) => K,
): T[] {
  const result: T[] = [];
  const seen = new Set<K>();
  const appendDistinct = (value: T) => {
    const key = keySelector(value);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(value);
    }
  };
  base.forEach(appendDistinct);
  next.forEach(appendDistinct);
  return result;
}
