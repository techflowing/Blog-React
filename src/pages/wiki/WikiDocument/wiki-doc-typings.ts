export type WikiDocument = {
  title: string;
  key: string;
  children?: WikiDocument[];
  isLeaf?: boolean;
  id: number;
  parentId: number;
};
