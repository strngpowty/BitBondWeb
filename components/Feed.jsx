import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/contants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const handlePass = () => {

  }
  const handleLike =() => {

  }
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
<<<<<<< HEAD
    <div className="flex-grow flex justify-center items-center pb-20">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <button className="btn btn-default w-full md:w-auto" onClick={handlePass}>Pass</button>
        <UserCard feed0={feed?.[0]} />
        <button className="btn btn-default w-full md:w-auto" onClick={handleLike}>Like</button>
      </div>
    </div>
=======
    <>
    <UserCard feed0 = {feed?.[0]}/>
    </>
>>>>>>> abdc0b4ad4c93c6589e93418b4f0234ec5147179
  );
};
export default Feed;
