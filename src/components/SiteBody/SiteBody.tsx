import React, { FC } from 'react';
import styles from './SiteBody.module.scss';

interface SiteBodyProps {}

const SiteBody: FC<SiteBodyProps> = () => (
  <div className={styles.SiteBody} data-testid="SiteBody">
    SiteBody Component
  </div>
);

export default SiteBody;
