export interface CreateXMindBody {
  name: string;
  isDir: boolean;
  parentId: number;
}

export interface RenameXMindBody {
  name: string;
  id: number;
}

export interface DeleteXMindBody {
  id: number[];
}

export interface DragXMindBody {
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  targetNode: { id: number; parentId: number };
  dragNode: { id: number; parentId: number };
}

export interface UpdateXMindBody {
  content: string;
  hashKey: string;
}
