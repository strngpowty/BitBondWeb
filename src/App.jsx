import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Body from "../components/Body";
import Login from "../components/Login";
import Profile from "../components/Profile";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Feed from "../components/Feed";
import Connections from "../components/Connections"
import Requests from "../components/Requests";
import SignUp from "../components/SignUp"
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/receivedRequests" element={<Requests />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
