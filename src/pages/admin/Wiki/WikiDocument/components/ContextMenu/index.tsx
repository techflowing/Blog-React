import React from 'react';
import { List } from 'antd';
import Text from 'antd/es/typography/Text';
import styles from './index.less';

export type ContextMenuItem = {
  key: string;
  title: string;
  onItemClick: () => void;
};

export type ContextMenuType = {
  pageX: number;
  pageY: number;
  item: ContextMenuItem[];
  onClickMask: () => void;
};

/**
 * 右键菜单
 */
const ContextMenu: React.FC<ContextMenuType> = (props) => {
  return (
    <div
      className={styles.overlay}
      onClick={() => {
        props.onClickMask();
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: `${props.pageX}px`,
          top: `${props.pageY}px`,
          zIndex: 10000,
        }}
      >
        <List
          className={styles.contextMenuList}
          bordered
          dataSource={props.item}
          renderItem={(item) => (
            <List.Item>
              <Text
                key={item.key}
                onClick={() => {
                  item.onItemClick();
                }}
              >
                {item.title}
              </Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ContextMenu;
