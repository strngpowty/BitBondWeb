import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserCard = ({feed0}) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  if (!user) {
    return navigate("/login");
  }

  return (
    <div className="flex-grow flex justify-center items-center pb-20">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Pass Button */}
        <button className="btn btn-default w-full md:w-auto">Pass</button>

        {/* Card */}
        <div className="card bg-base-300 w-80 shadow-sm">
          <figure>
            <img
              src={feed0?.photoURL}
              alt="User Image"
              className="object-cover w-full h-64"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {feed0?.firstName + " " + feed0?.lastName}
            </h2>
            <h4>{feed0?.age + ", " + feed0?.about}</h4>
            {feed0?.skills && (
              <h6>
                Skills :
                {" "+feed0.skills.map(
                  (skill) =>
                    skill.charAt(0).toUpperCase() + skill.slice(1)
                ).join(", ")}
              </h6>
            )}
            <p>{}</p>
          </div>
        </div>

        {/* Like Button */}
        <button className="btn btn-default w-full md:w-auto">Like</button>
      </div>
    </div>
  );
};

export default UserCard;
