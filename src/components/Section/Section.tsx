import { FC } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  name?: string;
}

const Section: FC<SectionProps> = ({name='Unknown'}) => {
  return (
    <div className={styles.Section} data-testid={'Section-'+name}>
      <h1>{name} Component</h1>
    </div>
)};

export default Section;
