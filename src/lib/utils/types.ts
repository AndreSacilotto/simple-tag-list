
export type OmitIndexer<T, IndexerT> = { [K in keyof T as IndexerT extends K ? never : K]: T[K] };

export interface RecursiveObj<T>
{
  [key: string]: RecursiveObj<T> | T,
}