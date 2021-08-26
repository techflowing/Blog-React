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
