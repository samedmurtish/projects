import React from "react";

export default function UserInfo() {
  return (
    <>
      <div className="shadow bg-white py-10 text-xs text-gray-500 text-pretty flex border-1 border-gray-100">
        <div className="flex w-11/12 mx-auto my-0">
          <div className="w-full h-full flex flex-col">
            <div>
              <p className="text-lg">PAYMENT</p>
            </div>
            <br />
            <div className="flex items-center">
              <span className="visaIcon icons"></span>
              <span className="amexIcon icons ml-2"></span>
              <span className="mastercardIcon icons ml-2"></span>
              <span className="clubIcon icons ml-2"></span>
              <span className="cashondeliveryIcon icons ml-2"></span>
              <span className="neftbankIcon icons ml-2"></span>
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <div>
              <p className="text-lg">CONNECT</p>
            </div>
            <br />
            <div className="flex items-center">
              <img
                src="https://i4.sdlcdn.com/img/footer/facebook@4x.png"
                className="w-9"
              />
              <img
                src="https://i4.sdlcdn.com/img/footer/twitter@4x.png"
                className="w-9 ml-2"
              />
              <img
                src="https://i4.sdlcdn.com/img/footer/instagram@4x.png"
                className="w-9 ml-2"
              />
              <img
                src="https://i4.sdlcdn.com/img/footer/linkedin@4x.png"
                className="w-9 ml-2"
              />
              <img
                src="https://i4.sdlcdn.com/img/footer/youtube@4x.png"
                className="w-9 ml-2"
              />
              <img
                src="https://i4.sdlcdn.com/img/footer/Telegram-Logo_112x112.png"
                className="w-8 ml-2"
              />
              <img
                src="https://i1.sdlcdn.com/img/footer/whatsapp-logo-112x112.png"
                className="w-9 ml-2"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
