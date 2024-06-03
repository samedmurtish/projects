import React from "react";

export default function AboutSite() {
  return (
    <div className="shadow bg-white text-xs text-gray-500 text-pretty flex border-2 border-b-0 border-gray-100">
      <div className="w-5/6 mx-auto my-0 flex justify-between h-56">
        <div className="w-full h-full flex flex-col justify-center items-center border-2 border-gray-100 border-b-0 border-t-0">
          <span className="paymentIcon icons"></span>
          <p className="font-bold text-xl py-2">100% SECURE PAYMENTS</p>
          <p className="text-gray-400 text-center w-60">
            Moving your card details to a much more secured place
          </p>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center border-2 border-gray-100 border-b-0 border-t-0 border-l-0">
          <span className="trustpayIcon icons"></span>
          <p className="font-bold text-xl py-2">TRUSTPAY</p>
          <p className="text-gray-400 text-center w-60">
            100% Payment Protection. <br />
            Easy Return Policy.
          </p>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <span className="costumerCareIcon icons"></span>
          <p className="font-bold text-xl py-2">HELP CENTER</p>
          <p className="text-gray-400 text-center w-60">
            Got a question? Look no further. <br /> Browse our FAQs or submit
            your query here.
          </p>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center border-2 border-gray-100 border-b-0 border-t-0 ">
          <span className="shopOnGoIcon icons"></span>
          <p className="font-bold text-xl py-2">SHOP ON THE GO</p>
          <p className="text-gray-400 text-center w-60">
            Download the app and get exciting app only offers at your
            fingertips.
          </p>
        </div>
      </div>
    </div>
  );
}
