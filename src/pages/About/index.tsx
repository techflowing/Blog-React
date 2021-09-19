import React, { useEffect, useState } from 'react';
import { Col, Image, message, Row, Typography } from 'antd';
import ProCard from '@ant-design/pro-card';
import styles from './index.less';
import EditorMarkdownHtml from '@/components/editormd/EditorMarkdownHtml';
import ContentFooterLayout from '@/components/layout/ContentFooterLayout';
import VisitorStatistic from '@/pages/About/components/VisitorStatistic';
import type { AboutConfig, VisitorStatisticModel } from '@/pages/About/about-typing';
import { getVisitorStatistic } from '@/pages/About/service';
import { ConfigKey, StatisticLocation, StatisticScene } from '@/pages/common-constants';
import { readConfig } from '@/services/config-service';

const { Text, Link } = Typography;

const About: React.FC = () => {
  const [aboutConfig, setAboutConfig] = useState<AboutConfig>();
  const [navigate, setNavigate] = useState<VisitorStatisticModel>();
  const [wiki, setWiki] = useState<VisitorStatisticModel>();
  const [xmind, setXMind] = useState<VisitorStatisticModel>();
  const [guestBook, setGuestBook] = useState<VisitorStatisticModel>();
  const [about, setAbout] = useState<VisitorStatisticModel>();

  /**
   * 获取统计项
   * @param data 数据
   * @param location location 地址
   */
  const getVisitorStatisticMode = (
    data: VisitorStatisticModel[],
    location: string,
  ): VisitorStatisticModel | undefined => {
    if (data === undefined) {
      return undefined;
    }
    return data.find(
      (item) => item.scene === StatisticScene.MainPage && item.location === location,
    );
  };

  useEffect(() => {
    readConfig(ConfigKey.About).then((resp) => {
      if (resp.code === 0) {
        setAboutConfig(resp.data?.content);
      } else {
        message.error(`获取配置数据失败：${resp.message}`);
      }
    });
    getVisitorStatistic().then((resp) => {
      if (resp.code === 0) {
        const date = resp.data;
        setNavigate(getVisitorStatisticMode(date, StatisticLocation.Navigate));
        setWiki(getVisitorStatisticMode(date, StatisticLocation.Wiki));
        setXMind(getVisitorStatisticMode(date, StatisticLocation.XMind));
        setGuestBook(getVisitorStatisticMode(date, StatisticLocation.GuestBook));
        setAbout(getVisitorStatisticMode(date, StatisticLocation.About));
      } else {
        message.error(`获取访问统计数据失败：${resp.message}`);
      }
    });
  }, []);

  return (
    <ContentFooterLayout>
      <Row gutter={[16, 16]} className={styles.container}>
        <Col offset={2} span={15} className={styles.aboutContainer}>
          <ProCard title={'关于我'}>
            <EditorMarkdownHtml name="aboutUs" content={aboutConfig?.aboutMe || ''} />
          </ProCard>

          <ProCard title={'关于本站'}>
            <EditorMarkdownHtml name={'aboutSite'} content={aboutConfig?.aboutSite || ''} />
          </ProCard>

          <ProCard title={'大事记'}>
            <ul>
              {aboutConfig?.timeLine?.map((item) => (
                <li className={styles.timeLineItem} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </ProCard>

          <ProCard title={'致谢'}>
            <ul>
              {aboutConfig?.thanks?.map((item) => (
                <li className={styles.thanksItem} key={item.title}>
                  <Link href={item.link} target={'_blank'}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </ProCard>
        </Col>
        <Col span={5} className={styles.aboutContainer}>
          <ProCard>
            <div className={styles.contactMeContainer}>
              <Image width={180} src={aboutConfig?.wechat} preview={false} />
              <Text type={'secondary'} className={styles.scanContactMe}>
                微信扫码联系我
              </Text>
              <div className={styles.contactMeMoreContainer}>
                <a target={'_blank'} href={aboutConfig?.github}>
                  <Image width={40} src={'/github.png'} preview={false} />
                </a>
                <a target={'_blank'} href={`mailto:${aboutConfig?.email}`}>
                  <Image width={40} src={'/email.png'} preview={false} />
                </a>
              </div>
            </div>
          </ProCard>
          <ProCard title={'访问统计'}>
            {navigate && <VisitorStatistic title={'导航站'} pv={navigate.pv} uv={navigate.uv} />}
            {wiki && <VisitorStatistic title={'知识库'} pv={wiki.pv} uv={wiki.uv} />}
            {xmind && <VisitorStatistic title={'思维导图'} pv={xmind.pv} uv={xmind.uv} />}
            {guestBook && <VisitorStatistic title={'留言板'} pv={guestBook.pv} uv={guestBook.uv} />}
            {about && <VisitorStatistic title={'关于'} pv={about.pv} uv={about.uv} />}
          </ProCard>
        </Col>
      </Row>
    </ContentFooterLayout>
  );
};
export default About;
