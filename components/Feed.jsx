import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, FEED_MESSAGE } from "../utils/contants";
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
    <div className="flex-grow flex justify-center items-center">
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
    <div className="flex-grow flex justify-center items-center">
      <div className="card shadow-lg bg-base-300 border border-base-300 animate-fade-in w-full max-w-md">
        <div className="card-body items-center text-center">
          <div className="text-5xl animate-bounce">🦗</div>
          <h2 className="card-title text-lg font-semibold">
            {FEED_MESSAGE[Math.floor(Math.random() * FEED_MESSAGE.length)]}
          </h2>
          <p className="text-sm text-base-content/70">
            Feeds will appear here when the universe aligns (or your server
            responds).
          </p>
          <div className="badge badge-ghost mt-4">Nothing yet...</div>
        </div>
      </div>
    </div>
  );
};
export default Feed;
