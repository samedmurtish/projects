import React from "react";

export default function AboutUs() {
  return (
    <div>
      <div className="shadow bg-white py-10 text-xs text-gray-500 text-pretty flex border-2 border-gray-100 ">
        <div className="w-5/6 mx-auto my-0 flex justify-between">
          <div className="flex flex-col">
            <p className="font-bold pb-5 text-base">POLICY INFO</p>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Privacy Policy
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Terms of Sale
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Terms of Use
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Report Abuse & Takedown Policy
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Know Your BIS Standard
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Products Under Cumpulsory BIS
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Certification
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              FAQ
            </a>
          </div>
          <div className="flex flex-col">
            <p className="font-bold pb-5 text-base">COMPANY</p>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Impact@Snapdeal
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Careers
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Blog
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Sitemap
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Contact Us
            </a>
          </div>{" "}
          <div className="flex flex-col">
            <p className="font-bold pb-5 text-base">SNAPDEAL BUSINESS</p>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Shopping App
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Sell on Snapdeal
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Media Enquiries
            </a>
          </div>{" "}
          <div className="flex flex-col">
            <p className="font-bold pb-5 text-base">POPULAR LINKS</p>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Lehenga
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Kid`s Clothing
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Sarees
            </a>
            <a className="text-gray-400 hover:text-gray-500 transition hover:underline cursor-pointer">
              Winter Wear
            </a>
          </div>{" "}
          <div className="flex flex-col  w-80">
            <p className="font-bold pb-5 text-base">SUBSCRIBE</p>
            <div className="flex mb-5">
              <input
                type="text"
                className="px-3 border-2 border-gray-200"
                placeholder="Your email address"
              />
              <button className="text-white bg-gray-800 hover:bg-gray-700 transition h-9 w-32 px-6 flex justify-center items-center text-center">
                SUBSCRIBE
              </button>
            </div>
            <p className="text-gray-500">
              Register now to get updates on promotions and coupons.{" "}
              <a className="text-blue-400 hover:text-blue-500 transition hover:underline cursor-pointer">
                Or Download App
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
