import { useDispatch, useSelector } from "react-redux";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Link } from "react-router-dom"
import { BASE_URL } from "../utils/contants";
import axios from "axios"
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      document.activeElement?.blur();
      await axios.post(BASE_URL + "/logout", {} ,{withCredentials: true})
      dispatch(removeUser())
      navigate("/login")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1 bg-base-700 ">
          <Link to="/" className="btn text-xl border-2 border-primary">⌬BitBond</Link>
        </div>
        <div className="flex gap-2 items-center">
          <p className="justify-center items-center flex-grow">{user && "Welcome, " + user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase() +  " !"}
</p>
          <div className="dropdown dropdown-end">
            {user && (
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Photo" src={user.photoURL} />
                </div>
              </div>
            )}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between" onClick={() => document.activeElement?.blur()}>
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={() => {document.activeElement?.blur(); handleLogout()}}>Logout</a>
              </li>
              <li>
                <ThemeSwitcher />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
