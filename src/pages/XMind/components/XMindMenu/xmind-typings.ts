export type Xmind = {
  title: string;
  key: string;
  children?: Xmind[];
  isLeaf?: boolean;
  id: number;
  parentId: number;
};
