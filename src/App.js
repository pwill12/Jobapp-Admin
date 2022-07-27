import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import Pageerror from "./components/Pageerror";
import "./style/dark.scss";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { DarkModeContext } from "./context/darkModeContext";
import Posts from "./pages/posts/Posts";
import { CircularProgress } from "@mui/material";
import User from "./pages/user/User";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const user = useSelector((state) => state.recruiter.currentUser);
  const fetching = useSelector((state) => state.recruiter.isFetching);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {user ? (
              <>
                <Route index element={<Home />} />{" "}
                {/* <Route path="login" element={<Login />} /> */}{" "}
                <Route path="users">
                  <Route path=":userId" element={<Single />} />{" "}
                  <Route
                    path="new"
                    element={<New inputs={userInputs} title="Add New User" />}
                  />{" "}
                </Route>{" "}
                <Route path="user">
                  <Route path=":usersId" element={<User />} />{" "}
                </Route>{" "}
                <Route path="postjob">
                    <Route index element={<Posts />} />
                    <Route element={<Login />} />
                </Route>
                <Route path="products">
                  <Route index element={<List />} />{" "}
                  <Route path=":productId" element={<Single />} />{" "}
                  <Route
                    path="new"
                    element={
                      <New inputs={productInputs} title="Add New Product" />
                    }
                  />{" "}
                </Route>{" "}
              </>
            ) : (
              <Route index element={<Login />} />
            )}{" "}
            <Route path="*" element={<Pageerror />} />
          </Route>{" "}
        </Routes>{" "}
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
