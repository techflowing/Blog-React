export type NavigationNode = {
  title: string;
  children: NavigationNode[] | SiteNode[];
};

export type SiteNode = {
  title: string;
  describe: string;
  url: string;
};
