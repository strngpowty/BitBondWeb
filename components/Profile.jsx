import EditProfile from "./EditProfile";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
function Login() {
  const user = useSelector((store) => store.user);
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        <EditProfile />
        <UserCard feed0={user} />
      </div>
    </div>
  );
}

export default Login;
