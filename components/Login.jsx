import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";
function Login() {
  const [ emailId, setEmail ] = useState("paxton@gmail.com");
  const [ password, setPassword ] = useState("Test1234!");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      }, {withCredentials: true})
      dispatch(addUser(res.data))
      return navigate("/")
    } catch (err) {
      console.log(err)
    }
  };
  const handleSignUp = async() => {
    return navigate("/signup")
  }
  return (
    <div className="flex justify-center items-center flex-grow">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <p className="flex justify-end cursor-pointer" onClick={() => handleSignUp()}>Sign-up instead?</p>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-base">Email</legend>
              <input
                value={emailId}
                type="text"
                className="input"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset mb-5">
              <legend className="fieldset-legend text-base">Password</legend>
              <input
                value={password}
                type="password"
                className="input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary text-base"
              onClick={() => handleLogin()}
            >
              Login
            </button>
          </div>          
        </div>
      </div>
    </div>
  );
}

export default Login;
