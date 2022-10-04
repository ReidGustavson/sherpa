import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <a href='/help'>HELP!</a>
      <a href='https://github.com/ReidGustavson/sherpa/tree/sudoku'>Source Code</a>
      <a href='https:/www.linkedin.com/in/reid-g'>LinkedIn</a>
    </div>
  )
}

export default Footer