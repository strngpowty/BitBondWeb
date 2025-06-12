import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/contants";

function Requests() {
  const [receivedRequest, setReceivedRequests] = useState();
  const getConnections = async () => {
    const receivedRequests = await axios.get(
      BASE_URL + "/user/requests/received",
      { withCredentials: true }
    );
    setReceivedRequests(receivedRequests);
  };
  console.log(receivedRequest)
  const handleRequestAccept = async (requestId) => {
    const res = await axios.post(
      BASE_URL + `/request/review/accepted/${requestId}`,
      {},
      {
        withCredentials: true,
      }
    );
    getConnections();
    console.log(res)
  };
  const handleRequestReject = async (requestId) => {
    const res = await axios.post(
      BASE_URL + `/request/review/rejected/${requestId}`,
      {},
      {
        withCredentials: true,
      }
    );
    getConnections();
    console.log(res)
  };
  useEffect(() => {
    getConnections();
  }, []);
  return (
    <div className="flex-grow flex-col flex items-center">
      <h1 className="my-5 text-2xl font-bold">Requests</h1>
      {receivedRequest &&
        receivedRequest?.data?.data.map((user, index) => (
          <div
            key={index}
            className="card card-side bg-base-300 shadow-sm h-fit"
          >
            <figure>
              <img src={user?.fromUserId?.photoURL} alt="Movie" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {user?.fromUserId?.firstName + " " + user?.fromUserId?.lastName}
              </h2>
              <p>{user?.fromUserId?.age + " " + user?.fromUserId?.about}</p>
              <p>{user?.fromUserId?.skills}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleRequestAccept(user._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleRequestReject(user._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Requests;
