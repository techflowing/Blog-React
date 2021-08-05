import React from 'react';
import styles from './index.less';

const Logo: React.FC = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.outerCircle}>
        <div className={styles.innerCircle}></div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
export default Logo;
