import { Md5 } from 'ts-md5/dist/md5';

export const md5String = (content: string): string => {
  return Md5.hashStr(content);
};
