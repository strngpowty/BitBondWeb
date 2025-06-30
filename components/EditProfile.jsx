import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/contants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { InfoAlert } from "./Alert";

function EditProfile() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log("user", user);
  const [formData, setFormData] = useState({
    password: "",
    age: "",
    about: "",
    skills: [],
    photo: null,
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
      const form = new FormData();

      if (formData.password) form.append("password", formData.password);
      if (formData.age) form.append("age", formData.age);
      if (formData.about) form.append("about", formData.about);

      if (formData.skills.length > 0) {
        if (typeof formData.skills === "string") {
          formData.skills
            .split(",")
            .map((s) => s.trim())
            .forEach((skill) => form.append("skills", skill));
        } else {
          formData.skills.forEach((skill) => form.append("skills", skill));
        }
      }

      if (formData.photo) form.append("photo", formData.photo); // 👈 file append

      const res = await axios.patch(`${BASE_URL}/profile/edit`, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        const updatedUser = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        dispatch(addUser(updatedUser.data));
      }
    } catch (err) {
      console.log("Error submitting form", err);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        password: "",
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
        <div className="form-control w-full mb-4">
          <label
            htmlFor="photo-upload"
            className="btn btn-outline btn-primary w-full"
          >
            {"Upload Profile Photo"}
          </label>
          <input
            id="photo-upload"
            type="file"
            name="photo"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, photo: e.target.files[0] }))
            }
          />
        </div>
        <fieldset className="fieldset">
          <legend className="text-lg">Password</legend>
          <input
            name="password"
            value={formData.password}
            type="password"
            className="input"
            placeholder="Password"
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
