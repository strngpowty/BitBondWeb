import EditProfile from "./EditProfile";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
function Login() {
  const user = useSelector((store) => store.user);
  return (
    <div className="flex-grow flex justify-center items-center mb-13">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <EditProfile />
        <UserCard feed0={user} />
      </div>
    </div>
  );
}

export default Login;
