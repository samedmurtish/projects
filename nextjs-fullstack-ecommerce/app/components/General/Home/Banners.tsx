import React, { useEffect } from "react";
import banner1 from "../../../../images/banner1.jpg";
import banner2 from "../../../../images/banner2.jpg";
import banner3 from "../../../../images/banner3.jpg";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
export default function Banners() {
  const [bannerTurn, setBannerTurn] = React.useState(0);
  const [bannerWidth, setBannerWidth] = React.useState(0);
  const [banners, setBanners] = React.useState([banner1, banner2, banner3]);

  const time = 7000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBannerWidth((prev: any) => {
        if (prev >= 100) {
          setBannerTurn((prev: any) => {
            return prev === banners.length - 1 ? 0 : prev + 1;
          });
        }
        return prev > 100 ? 0 : prev + (100 / time) * 4;
      });
    }, 100 / time);
    return () => clearInterval(intervalId);
  }, []);

  const renderBannerLoading = () => {
    return banners.map((banner: any, index: number) => (
      <div
        key={banner.src + index}
        className="w-full h-2 cursor-pointer"
        style={{
          backgroundColor: index == bannerTurn ? "rgba(12,147,209,0.3)" : " ",
        }}
        onClick={() => {
          setBannerTurn(index);
          setBannerWidth(0);
        }}
      >
        <div
          className="bg-sky-500 h-2 w-0 rounded-sm"
          style={{
            width: bannerTurn == index ? `${bannerWidth}%` : "100%",
            backgroundColor:
              index == bannerTurn ? "rgb(14 165 233)" : "rgba(12,147,209,0.3)",
          }}
        />
      </div>
    ));
  };

  return (
    <div className="w-3/4 mx-auto my-0 pt-5 select-none">
      <div className="w-full overflow-hidden flex justify-center items-center">
        <div className="relative w-full">
          <img
            src={banners[bannerTurn].src}
            className="w-full object-cover h-[500px] select-none"
          />
          <div
            className="absolute top-0 right-10 bottom-0 m-auto flex justify-center items-center w-16 h-16 hover:w-[4.5rem] hover:h-[4.5rem] hover:right-[2.18rem] transition-width ease-out duration-300 rounded-full bg-[rgba(255,255,255,1)] text-5xl cursor-pointer"
            onClick={() => {
              setBannerWidth(0);
              setBannerTurn((prev: any) => {
                return prev === banners.length - 1 ? 0 : prev + 1;
              });
            }}
          >
            <MdNavigateNext />
          </div>
          <div
            className="absolute top-0 left-10 bottom-0 m-auto flex justify-center items-center w-16 h-16 hover:w-[4.5rem] hover:h-[4.5rem] hover:left-[2.18rem] transition-width ease-out duration-300  rounded-full bg-[rgba(255,255,255,1)] text-5xl cursor-pointer"
            onClick={() => {
              setBannerWidth(0);
              setBannerTurn((prev: any) => {
                return prev === 0 ? banners.length - 1 : prev - 1;
              });
            }}
          >
            <MdNavigateBefore />
          </div>
          <div className="absolute bottom-0 left-0 w-full flex gap-1 border-t-2 bg-white">
            {renderBannerLoading()}
          </div>
        </div>
      </div>
    </div>
  );
}
