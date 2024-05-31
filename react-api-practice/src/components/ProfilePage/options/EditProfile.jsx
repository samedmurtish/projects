export default function EditProfile() {
  return (
    <>
      <div className="flex flex-col py-1 w-full items-start justify-between h-full">
        <div className="py-10 px-5 w-full text-slate-500 font-semibold">
          <p>Profile Name </p>
          <input type="text" className="w-5/6" />
          <p>Email </p>
          <input type="text" className="w-5/6" />
        </div>
        <div className="self-center">
          <button className=" rounded px-3 py-2 m-1 border-b-4 active:border-b-2 border-l-2 shadow-lg bg-blue-500 border-blue-600 text-white font-bold w-full ">
            Apply Changes
          </button>
        </div>
      </div>
    </>
  );
}
