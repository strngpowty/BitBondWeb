import axios from "axios";
import { useState } from "react";
function Login() {
  const [ emailId, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const handleChange = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        emailId,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center flex-grow">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
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
              onClick={() => handleChange()}
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
