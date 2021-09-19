export type VisitorStatisticModel = {
  scene: string;
  location: string;
  uv: number;
  pv: number;
};

export type AboutConfig = {
  wechat: string;
  aboutMe: string;
  aboutSite: string;
  timeLine: string[];
  thanks: {
    title: string;
    link: string;
  }[];
  email: string;
  github: string;
};
