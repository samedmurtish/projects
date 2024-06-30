import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";

export default function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "394b58e9-4289-482c-bff0-cc32bdc9c27e");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div>
      <div className="lg:inline hidden">
        <NavigationBar />
      </div>
      <div className="lg:hidden inline">
        <NavigationBarMobile />
      </div>
      <div className="pt-24 md:pt-32 flex justify-center items-center w-full flex-col">
        <div
          className="text-[#EFAB3A] flex w-max md:w-1/2 text-3xl justify-center pb-10"
          id="font"
        >
          Contact Us
        </div>
        <div className="text-white py-5 text-2xl flex justify-center items-center font-semibold">
          <span className="text-[#05A981] pr-3 font-extrabold">(+389)</span>{" "}
          071-123-456
        </div>
        <div className="w-max md:w-1/2 flex flex-row justify-center items-center py-10">
          <div className="bg-slate-300 w-full h-[1px]" />
          <div className="flex w-max text-white px-3 ">OR</div>
          <div className="bg-slate-300 w-full h-[1px]" />
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 w-max md:w-1/2"
        >
          <div className="flex flex-col">
            <span id="font" className="text-2xl text-[#EFAB3A]">
              Name
            </span>
            <input type="text" className="px-2 py-1" name="name" required />
          </div>
          <div className="flex flex-col">
            <span id="font" className="text-2xl text-[#EFAB3A]">
              Email
            </span>
            <input type="email" className="px-2 py-1" name="email" required />
          </div>
          <div className="flex flex-col ">
            <span id="font" className="text-2xl text-[#EFAB3A]">
              Message
            </span>
            <textarea
              name="message"
              className="px-2 py-1"
              rows={4}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[rgba(255,255,255,0.1)] text-[#05A981] h-[50px] text-2xl hover:bg-[rgba(255,255,255,0.2)] active:bg-[rgba(255,255,255,0.2)] border-b-2 border-b-[#05A981] transition"
            id="font"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
