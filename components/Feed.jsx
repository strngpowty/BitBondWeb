import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/contants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
      dispatch(addFeed(res.data));
    } catch (err) {
        console.log(err)
    }
  };
  useEffect(() => {
    getFeed()
  }, [])
  return (
    <>
    <UserCard feed0 = {feed?.[0]}/>
    </>
  );
};
export default Feed;
