import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/contants";
import axios from "axios";

function EditProfile() {
  const user = useSelector((store) => store.user);
  console.log("user", user);
  const [formData, setFormData] = useState({
    password: "",
    age: "",
    about: "",
    skills: [],
    photoURL: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(BASE_URL + "/profileEdit", formData, {
        withCredentials: true,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (user) {
      setFormData({
        password: user.password || "",
        age: user.age || "",
        about: user.about || "",
        skills: user.skills || [],
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  return (
    <div className="card bg-base-300 w-80 shadow-sm pl-5 pr-5 pt-2 pb-4 rounded-xl">
      <h1 className="flex-grow flex justify-center items-center text-2xl">
        Profile
      </h1>
      <form className="pt-5" onSubmit={(e) => handleSubmit(e)}>
        <fieldset className="fieldset">
          <legend className="text-lg">Photo URL</legend>
          <input
            name="photoURL"
            value={formData.photoURL}
            type="text"
            className="input"
            placeholder="Photo URL"
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="text-lg">Password</legend>
          <input
            name="password"
            value={formData.password}
            type="password"
            className="input"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="text-lg">Age</legend>
          <input
            name="age"
            value={formData.age}
            type="number"
            className="input"
            placeholder="Age"
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="text-lg">About</legend>
          <input
            name="about"
            value={formData.about}
            type="text"
            className="input"
            placeholder="About"
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="text-lg">Skills</legend>
          <input
            name="skills"
            value={formData.skills}
            type="text"
            className="input"
            placeholder="Skills"
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <div className="flex-grow flex justify-center items-center pt-5">
          <button className="btn btn-primary text-base" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
