import { useSelector } from "react-redux";
import ThemeSwitcher from "../components/ThemeSwitcher";

function Navbar() {
  const user = useSelector((store) => store.user);
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1 bg-base-700 ">
          <a className="btn text-xl border-2 border-primary">⌬BitBond</a>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
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
