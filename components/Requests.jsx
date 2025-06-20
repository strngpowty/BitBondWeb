import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, REQUESTS_MESSAGE } from "../utils/contants";

function Requests() {
  const [receivedRequest, setReceivedRequests] = useState();
  const getConnections = async () => {
    const receivedRequests = await axios.get(
      BASE_URL + "/user/requests/received",
      { withCredentials: true }
    );
    setReceivedRequests(receivedRequests);
  };
  console.log(receivedRequest);
  const handleRequestAccept = async (requestId) => {
    const res = await axios.post(
      BASE_URL + `/request/review/accepted/${requestId}`,
      {},
      {
        withCredentials: true,
      }
    );
    getConnections();
    console.log(res);
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
    console.log(res);
  };
  useEffect(() => {
    getConnections();
  }, []);
  return receivedRequest?.data?.data.length > 0 ? (
    <div className="mx-auto w-full max-w-sm">
      <h1 className="my-5 text-2xl font-bold text-center">Requests</h1>
      {receivedRequest &&
        receivedRequest?.data?.data.map((user, index) => (
          <div
            key={index}
            className="card card-side bg-base-300 shadow-sm h-fit my-4"
          >
            <figure>
              <img src={user?.fromUserId?.photoURL} alt="Movie" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {user?.fromUserId?.firstName + " " + user?.fromUserId?.lastName}
              </h2>
              <p>
                {[user?.fromUserId?.age, user?.fromUserId?.about]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              {user?.fromUserId?.skills && (
                <p>
                  Skills :
                  {" " +
                    user?.fromUserId?.skills
                      .map(
                        (skill) =>
                          skill.charAt(0).toUpperCase() + skill.slice(1)
                      )
                      .join(", ")}
                </p>
              )}
              <div className="flex gap-2">
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
  ) : (
    <div className="flex-grow flex justify-center items-center">
      <div className="card shadow-lg bg-base-300 border border-base-300 animate-fade-in w-full max-w-md">
        <div className="card-body items-center text-center">
          <div className="text-5xl animate-bounce">📭</div>
          <h2 className="card-title text-lg font-semibold">
            {
              REQUESTS_MESSAGE[
                Math.floor(Math.random() * REQUESTS_MESSAGE.length)
              ]
            }
          </h2>
          <p className="text-sm text-base-content/70">
            Check back later — someone might be curious about your awesome self.
          </p>
          <div className="badge badge-ghost mt-4">Still waiting...</div>
        </div>
      </div>
    </div>
  );
}

export default Requests;
