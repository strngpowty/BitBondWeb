import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/contants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const handlePass = async (userid) => {
    const res = await axios.post(
      BASE_URL + `/request/send/ignored/${userid}`,
      {},
      { withCredentials: true }
    );
    console.log(res);
    getFeed();
  };
  const handleLike = async (userid) => {
    const res = await axios.post(
      BASE_URL + `/request/send/interested/${userid}`,
      {},
      { withCredentials: true }
    );
    console.log(res);
    getFeed();
  };
  const getFeed = async () => {
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
  console.log(feed);
  return feed?.[0] ? (
    <div className="flex-grow flex justify-center items-center pb-20">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <button
          className="btn btn-default w-full md:w-auto"
          onClick={() => handlePass(feed?.[0]._id)}
        >
          Pass
        </button>
        <UserCard feed0={feed?.[0]} />
        <button
          className="btn btn-default w-full md:w-auto"
          onClick={() => handleLike(feed?.[0]._id)}
        >
          Like
        </button>
      </div>
    </div>
  ) : (
    <p>{`💾 If (feed === null) { panic(); }`}</p>
  );
};
export default Feed;
