import {
  useNavigate,
  useLocation
} from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state || { from: { pathname: "/private" } }

  const nav = () => navigate(from, {replace: true});

  return (
    <div>
      <p>Hello World!</p>
      <div>
        <button onClick={nav}>Restricted Page</button>
      </div>
    </div>
  );
}

export default HomePage;