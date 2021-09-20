import { postVisitorStatistic } from '@/pages/About/service';
import { StatisticLocation, StatisticScene } from '@/pages/common-constants';
import { consoleLog } from '@/utils/common-util';

const sendVisitorStatistic = (scene: string, location: string) => {
  postVisitorStatistic({ params: { scene, location } }).then((resp) => {
    if (resp.code !== 0) {
      consoleLog(`上报埋点失败：${resp.message}`);
    }
  });
};

export const onRouteChangeStatistic = (location: Location) => {
  switch (location.pathname) {
    case '/navigation':
      sendVisitorStatistic(StatisticScene.MainPage, StatisticLocation.Navigate);
      break;
    case '/wiki':
      sendVisitorStatistic(StatisticScene.MainPage, StatisticLocation.Wiki);
      break;
    case '/xmind':
      sendVisitorStatistic(StatisticScene.MainPage, StatisticLocation.XMind);
      break;
    case '/guestbook':
      sendVisitorStatistic(StatisticScene.MainPage, StatisticLocation.GuestBook);
      break;
    case '/about':
      sendVisitorStatistic(StatisticScene.MainPage, StatisticLocation.About);
      break;
    default:
  }
};
