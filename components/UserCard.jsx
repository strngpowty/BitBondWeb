import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserCard = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);
  const feed0 = feed?.[0];
  console.log(feed0);

  if (!user) {
    navigate("/login")
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
            <h2 className="card-title">Card Title</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Like Button */}
        <button className="btn btn-default w-full md:w-auto">Like</button>
      </div>
    </div>
  );
};

export default UserCard;
