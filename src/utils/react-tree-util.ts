import type { DataNode } from 'rc-tree/lib/interface';

/**
 * 遍历获取所有子节点Id
 * @param node 节点
 */
export const traverseAllChildrenId = (node: DataNode): number[] => {
  const result = new Array<number>();
  const nodeQueue = new Array<DataNode>();
  nodeQueue.push(node);
  while (nodeQueue.length !== 0) {
    const curNode = nodeQueue.shift();
    if (curNode !== undefined) {
      // @ts-ignore
      result.push(curNode.id);
      if (!curNode.isLeaf && curNode.children !== undefined && curNode.children.length > 0) {
        curNode?.children.forEach((child) => nodeQueue.push(child));
      }
    }
  }
  return result;
};
