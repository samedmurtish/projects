import PropTypes from "prop-types";

export default function RenderUsers({ user }) {
  return (
    <>
      <div className="user-data-container flex flex-col m-5 w-60 shadow-2xl hover:scale-105 transition-all duration-150 select-none">
        <div className="user-title flex-2 h-10 bg-blue-900 rounded-t-lg flex items-center justify-center font-bold">
          {user.name}
        </div>
        <div className="bg-blue-950 h-1"></div>
        <div className="user-details h-20 flex-2 bg-gray-900 rounded-b-lg text-gray-400 flex  justify-center items-center p-5">
          <p>
            {user.address.street}
            <span className="text-gray-300 font-bold">,</span>{" "}
            <span className="font-bold text-blue-800">{user.address.city}</span>
            <span className="text-gray-300 font-bold">,</span>{" "}
            {user.address.zipcode}
          </p>
        </div>
      </div>
    </>
  );
}

RenderUsers.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
