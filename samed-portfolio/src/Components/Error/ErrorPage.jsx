import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  document.title = "Harun Spaho`s Portfolio";
  return (
    <div className="bg-red-500 flex justify-center items-center">
      <div className="h-screen w-11/12 text-center flex flex-col items-center justify-center">
        <Link
          to="/"
          className="text-7xl flex flex-col justify-center items-center bg-red-500 hover:bg-red-400 text-gray-100 hover:text-white rounded-full  rounded-b-none p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl hover:border-2 hover:border-red-300 border-red-400 border-2"
        >
          <GoHomeFill />
          <span className="text-xl font-semibold">HOME</span>
        </Link>
        <span className="text-slate-900 text-center font-bold text-7xl">
          We`re sorry, but the page you`re looking for cannot be found.
        </span>
      </div>
    </div>
  );
}
