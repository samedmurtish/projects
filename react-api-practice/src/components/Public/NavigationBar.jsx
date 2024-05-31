import { Link, Outlet } from "react-router-dom";

export default function NavigationBar() {
  return (
    <>
      <div className="absolute w-screen h-20 bg-blue-400 text-center justify-center align-center items-center flex text-white font-semibold shadow">
        <Link
          to="/home"
          className="p-5 rounded px-3 py-2 m-1 border-b-4 active:border-b-2 border-l-2 shadow-lg bg-blue-500 border-blue-600"
        >
          Home
        </Link>
        <Link
          to="/profile"
          className="p-5 rounded px-3 py-2 m-1 border-b-4 active:border-b-2 border-l-2 shadow-lg bg-blue-500 border-blue-600"
        >
          Profile
        </Link>
      </div>
      <Outlet />
    </>
  );
}
