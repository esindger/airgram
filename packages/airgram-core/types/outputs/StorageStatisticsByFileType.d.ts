import { FileTypeUnion } from './'

export type StorageStatisticsByFileTypeUnion = StorageStatisticsByFileType

/** Contains the storage usage statistics for a specific file type */
export interface StorageStatisticsByFileType {
  _: 'storageStatisticsByFileType';
  /** File type */
  fileType: FileTypeUnion;
  /** Total size of the files */
  size: number;
  /** Total number of files */
  count: number;
}
