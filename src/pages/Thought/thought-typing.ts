export type ThoughtBasic = {
  title: string;
  content: string;
  html: string;
  tag: string[];
};
export type Thought = {
  hashKey: string;
  createTime: number;
  updateTime: number;
} & ThoughtBasic;
