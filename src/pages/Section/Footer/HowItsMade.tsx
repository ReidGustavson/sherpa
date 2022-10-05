import { Link } from 'react-router-dom';
import styles from './HowItsMade.module.scss';

const HowItsMade = () =>(
  <div className={styles.HowItsMade}>
    <h2>{"How it's made"}</h2>
    <Link to="/" style={{float:"right"}}><button>X</button></Link>
    <ul style={{textAlign:'left'}}>
      <li>{"Frontend:\nReact"}</li>
      <li>{"Backend:\nNodejs"}</li>
      <li>{"Hosting:\nAWS amplify"}</li>
      <li>{"Graphics:\nThreejs"}</li>
      <li>{"Redux/LocalStorage Advantages:"}<ul>
        <li>{"UX:\nStores level progress"}</li>
        <li>{"Cost:\nLimits the number of api callss"}</li>
        <li>{"Performance:\nLimits rerenders to the clicked cube"}</li>
        </ul>
      </li>
      <li>{"Motivation For Making:\nLearn React"}</li>
    </ul>
  </div>
);

export default HowItsMade;