import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";

function ContactMe() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "11c0465c-e4a2-4480-b530-ea5fa05930b4");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
    <>
      <div className="md:inline hidden">
        <NavigationBar />
      </div>
      <div className="md:hidden inline">
        <NavigationBarMobile />
      </div>
      <div className="text-white flex justify-center items-center h-screen w-screen flex-col gap-10 pt-40 md:pt-20">
        <div className="bg-[rgba(255,255,255,0.05)] p-10 rounded-xl">
          <div className="text-8xl font-extrabold pb-10">
            Contact <span className="text-sky-500">Me</span> !
          </div>
          <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col">
              <span className="text-sky-400 font-bold">Name</span>
              <input type="text" name="name" className="p-2 px-4  text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-sky-400 font-bold">Email</span>
              <input
                type="email"
                name="email"
                className="p-2 px-4  text-black"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sky-400 font-bold">Message</span>
              <textarea name="message" rows={5}></textarea>
            </div>
            <button type="submit" className="bg-sky-500 p-5 font-bold text-2xl">
              Submit Form
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactMe;
