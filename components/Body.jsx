import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/contants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

function Body() {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispacth(addUser(user?.data));
    } catch (err) {
      if (err.status === 401) navigate("/login");
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userData) fetchUser();
  }, []);

  return (
    <>
    <div className="">
      <Navbar />
    </div>
    <div className="flex flex-grow overflow-auto py-4">      
      <Outlet />
    </div>
    <div className="">      
      <Footer />
    </div>
    </>
  );
}

export default Body;
