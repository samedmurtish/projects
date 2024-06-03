export default function EditProfile() {
  return (
    <>
      <div className="flex flex-col py-1 w-full items-start justify-between h-full items-center justify-center">
        <div className="py-10 px-5 w-full text-slate-500 font-semibold flex flex-col justify-center items-center">
          <div className="w-full items-center flex flex-col">
            <p className="inline p-3">Profile Name</p>
            <input type="text" className="px-2 w-2/3 h-8 shadow" />
            <p className="inline p-3">Password</p>
            <input type="text" className="px-2 w-2/3 h-8 shadow" />
            <p className="inline p-3">Confirm Password</p>
            <input type="text" className="px-2 w-2/3 h-8 shadow" />
            <p className="inline p-3">Email</p>
            <input type="text" className="px-2 w-2/3 h-8 shadow" />
          </div>
        </div>
        <div className="self-center">
          <button className="rounded px-3 py-2 m-1 border-b-4 active:border-b-2 border-l-2 shadow-lg bg-blue-500 border-blue-600 text-white font-bold w-full ">
            Apply Changes
          </button>
        </div>
      </div>
    </>
  );
}
