import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/contants";

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
  return (
    <div className="flex-grow flex-col flex items-center">
      <h1 className="my-5 text-2xl font-bold">Connections</h1>
      {connections &&
        connections?.data?.data.map((user, index) => (
          <div key={index} className="card card-side bg-base-300 shadow-sm h-fit">
            <figure>
              <img
                src= {user?.photoURL}
                alt="Movie"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{user?.firstName +" "+ user?.lastName}</h2>
              <p>{user?.age +" "+ user?.about}</p>
              <p>{user?.skills}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Connections;
