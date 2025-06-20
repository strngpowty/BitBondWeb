import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, CONNECTIONS_MESSAGE } from "../utils/contants";

function Connections() {
  const [connections, setConnections] = useState();
  const getConnections = async () => {
    const connectionsResponse = await axios.get(
      BASE_URL + "/user/connections",
      { withCredentials: true }
    );
    setConnections(connectionsResponse);
  };
  console.log("connections", connections);
  useEffect(() => {
    getConnections();
  }, []);
  return connections?.data?.data.length > 3 ? (
    <div className="mx-auto w-full max-w-sm">
      <h1 className="my-5 text-2xl font-bold text-center">Connections</h1>
      {connections &&
        connections?.data?.data.map((user, index) => (
          <div
            key={index}
            className="card card-side bg-base-300 shadow-sm h-fit my-4"
          >
            <figure>
              <img src={user?.photoURL} alt="Movie" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {user?.firstName + " " + user?.lastName}
              </h2>
              <p>{[user?.age, user?.about].filter(Boolean).join(", ")}</p>
              {user?.skills && (
                <p>
                  Skills :
                  {" " +
                    user.skills
                      .map(
                        (skill) =>
                          skill.charAt(0).toUpperCase() + skill.slice(1)
                      )
                      .join(", ")}
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  ) : (
    <div className="flex-grow flex justify-center items-center">
      <div className="card shadow-lg bg-base-300 border border-base-300 animate-fade-in w-full max-w-md">
        <div className="card-body items-center text-center">
          <div className="text-5xl animate-pulse">🧍‍♂️</div>
          <h2 className="card-title text-lg font-semibold">
            {
              CONNECTIONS_MESSAGE[
                Math.floor(Math.random() * CONNECTIONS_MESSAGE.length)
              ]
            }
          </h2>
          <p className="text-sm text-base-content/70">
            You haven’t connected with anyone yet. Start building your circle!
          </p>
          <div className="badge badge-ghost mt-4">Flying solo 🪁</div>
        </div>
      </div>
    </div>
  );
}

export default Connections;
