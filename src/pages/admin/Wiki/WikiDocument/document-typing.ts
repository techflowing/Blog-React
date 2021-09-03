export interface CreateDocumentBody {
  name: string;
  projectKey: string;
  isDir: boolean;
  parentId: number;
}

export interface RenameDocumentBody {
  name: string;
  projectKey: string;
  documentId: number;
}

export interface DeleteDocumentBody {
  projectKey: string;
  documentId: number[];
}

export interface DragDocumentBody {
  projectKey: string;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  targetNode: { id: number; parentId: number };
  dragNode: { id: number; parentId: number };
}

export interface updateDocumentBody {
  content: string;
  hashKey: string;
}
