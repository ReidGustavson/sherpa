import styles from './HowItsMade.module.scss';

const HowItsMade = () =>(
  <div className={styles.HowItsMade}>
    <h2>{"How it's made."}</h2>
    <a href="/" style={{float:"right"}}><button>X</button></a>
    <ul style={{textAlign:'left'}}>
      <li>{"Motivation:\nLearn React"}</li>
      <li>{"Frontend:\nReact"}</li>
      <li>{"Backend:\nNodejs"}</li>
      <li>{"Hosting:\nAWS amplify"}</li>
      <li>{"Graphics:\nThreejs"}</li>
      <li>{"Redux/LocalStorage Usage:"}<ul>
        <li>{"UX:\nStored level progress."}</li>
        <li>{"Cost:\nLimited the number of api calls."}</li>
        <li>{"Performance:\nLimited rerenders to the clicked cube."}</li>
        </ul>
      </li>
    </ul>
  </div>
);

export default HowItsMade;