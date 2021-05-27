// import axios from "axios";
// import { useDispatch } from "react-redux";
import Routes from "./routes/index";

// import { loadUser } from "./store/actions/userActions";

function App() {
  // const dispatch = useDispatch();

  // axios.defaults.headers.common["auth-token"] =
  //   typeof window !== "undefined" ? localStorage.getItem("token") : "";

  // dispatch(loadUser());
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
