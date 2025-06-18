import { useState } from "react";
import { BASE_URL } from "../utils/contants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    about: "",
    skills: [],
    photoURL: "",
    gender: "",
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
      const dataToSend = { ...formData };
      if (typeof dataToSend.skills === "string" && dataToSend.skills) {
        dataToSend.skills = dataToSend.skills
          .split(",")
          .map((skill) => skill.trim());
      }
      Object.keys(dataToSend).forEach((key) => {
        if (!dataToSend[key] || (Array.isArray(dataToSend[key]) && dataToSend[key].length === 0)) {
          delete dataToSend[key];
        }
      });
      const res = await axios.post(BASE_URL + "/signup", dataToSend, {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate("/login")
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formFields = [
    { name: "firstName", type: "text", placeholder: "First Name" },
    { name: "lastName", type: "text", placeholder: "Last Name" },
    { name: "emailId", type: "text", placeholder: "Email ID" },
    { name: "gender", type: "text", placeholder: "Gender" },
    { name: "photoURL", type: "text", placeholder: "Photo URL" },
    { name: "password", type: "password", placeholder: "Password" },
    { name: "age", type: "number", placeholder: "Age" },
    { name: "about", type: "text", placeholder: "About" },
    { name: "skills", type: "text", placeholder: "Skills (comma separated)" },
  ];

  return (
    <div className="flex justify-center items-center flex-grow">
      <div className="card bg-base-300 w-80 shadow-sm pl-5 pr-5 pt-2 pb-4 rounded-xl">
        <h1 className="flex-grow flex justify-center items-center text-2xl">
          Profile
        </h1>
        <form className="pt-5" onSubmit={handleSubmit}>
          {formFields.map(({ name, type, placeholder }) => (
            <fieldset className="fieldset" key={name}>
              <legend className="text-lg">{placeholder}</legend>
              <input
                name={name}
                type={type}
                className="input"
                placeholder={placeholder}
                onChange={handleChange}
              />
            </fieldset>
          ))}

          <div className="flex-grow flex justify-center items-center pt-5">
            <button className="btn btn-primary text-base" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
