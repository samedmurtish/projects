import React, { useEffect, useState } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import NavigationBarMobile from "../NavigationBar/NavigationBarMobile";

import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobexd,
  SiFigma,
  SiAdobeindesign,
} from "react-icons/si";
import { collection, doc, getDoc } from "firebase/firestore";
import { database } from "../../database/firebase";

export default function Content() {
  const [siteSettings, setSiteSettings] = useState({
    borderColor: "#ab012e",
    backgroundColor: "#ab012e",
    backgroundOpacity: "33",
    buttonsTextColor: "#ffffff",
    buttonsColor: "#ab012e",
    buttonsHoverColor: "#a0002b",
    buttonsActiveColor: "#920127",
    logoBackgroundColor: "#ab012e",
    logoTextColor: "#ffffff",
    aboutMeContentColor: "#ab012e",
    aboutMeTitleColor: "#ab012e",
    aboutMeContentTextColor: "#ffffff",
    aboutMeTitleTextColor: "#ffffff",
    aboutMeContentOpacity: "55",
  });

  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const siteSettingsRef = collection(database, "siteSettings");
  const getSiteSettings = async () => {
    setLoading(true);
    try {
      const docRef = doc(siteSettingsRef, "settings");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSiteSettings(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  };
  useEffect(() => {
    getSiteSettings();
  }, []);

  const skills = [
    {
      name: "Photoshop",
      icon: <SiAdobephotoshop />,
      progress: 100,
      color: "#2EA0F4",
    },
    {
      name: "Illustrator",
      icon: <SiAdobeillustrator />,
      progress: 90,
      color: "#FF9800",
    },
    {
      name: "Indesign",
      icon: <SiAdobeindesign />,
      progress: 70,
      color: "#F33B85",
    },
    { name: "XD", icon: <SiAdobexd />, progress: 70, color: "#F728BA" },
    {
      name: "Figma",
      icon: <SiFigma />,
      progress: 70,
      color: "rgb(56 189 248)",
    },
  ];

  const handleSkills = () => {
    return skills.map((value, valueIndex) => (
      <div key={valueIndex} className="md:w-4/12 w-1/3">
        <div
          className="flex flex-col justify-center items-center w-full gap-5"
          style={{ color: value.color }}
        >
          <span className="text-7xl">{value.icon}</span>
          <div className="h-[10px] w-full bg-gray-500">
            <div
              className="h-[10px] bg-gray-100"
              style={{ width: `${value.progress}%` }}
            ></div>
          </div>
          <span className="text-lg font-extrabold text-nowrap">
            {value.progress} <span className="text-white">%</span>
          </span>
        </div>
      </div>
    ));
  };

  document.title = "Harun Spaho's Portfolio";
  return (
    <div className="select-none w-screen">
      {loading && !imageLoaded && (
        <div className="absolute top-0 right-0 bg-[#ab012e] w-full h-full flex justify-center items-center gap-5 z-[10000000000] flex-col text-white text-4xl font-extrabold">
          <div className="border-white/50 h-20 w-20 animate-spin rounded-full border-8 border-t-white" />
          Loading Page...
        </div>
      )}
      <div className="hidden md:block">
        <NavigationBar />
      </div>
      <div className="block md:hidden">
        <NavigationBarMobile />
      </div>
      <div className="h-full w-full text-white font-semibold pt-10 md:pt-20">
        <div className="mx-auto my-0 md:w-3/4">
          <div className="flex w-full h-full">
            <div className="flex flex-col md:flex-row ml-0 mt-20 gap-5 justify-center items-center md:items-start">
              <img
                src={siteSettings.aboutMeImage + `?t=${Date.now()}`}
                alt="Harun Spaho"
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className="w-4/5 md:w-[35%] h-max rounded-3xl shadow-xl"
              />
              <div className="flex flex-col gap-3">
                <div className="my-20 md:my-0 overflow-hidden text-wrap text-ellipsis truncate p-3 md:p-6 rounded-3xl cursor-help md:w-full mx-3">
                  <p
                    className="text-3xl md:text-[2.5vw] font-bold pb-6 flex justify-center items-center md:justify-normal md:items-baseline p-5 rounded-xl"
                    style={{
                      backgroundColor: siteSettings.aboutMeTitleColor,
                      color: siteSettings.aboutMeTitleTextColor,
                    }}
                  >
                    <span id="about-easter-egg" className="pr-3">
                      About{" "}
                    </span>{" "}
                    me{" "}
                    <span
                      className="text-transparent pl-3 w-0 md:w-max"
                      id="easteregg"
                    >
                      (Harun Spaho)
                    </span>
                  </p>
                  <div className="w-full h-1 bg-[#212121]"></div>
                  <p
                    className="font-thin text-xl md:text-[1.5vw] h-max p-4 md:p-5 rounded-xl text-justify"
                    style={{
                      backgroundColor: `rgba(${parseInt(
                        siteSettings.aboutMeContentColor.slice(1, 3),
                        16
                      )}, ${parseInt(
                        siteSettings.aboutMeContentColor.slice(3, 5),
                        16
                      )}, ${parseInt(
                        siteSettings.aboutMeContentColor.slice(5, 7),
                        16
                      )}, ${siteSettings.aboutMeContentOpacity / 100})`,
                      color: siteSettings.aboutMeContentTextColor,
                    }}
                  >
                    I am <span className="font-bold">Harun Spaho </span>from the
                    small town of <span className="font-normal">Struga</span> in{" "}
                    <span className="font-normal">North Macedonia</span>. I am
                    currently studying in the{" "}
                    <span className="font-normal">Graphic Design</span>{" "}
                    department at{" "}
                    <span className="font-normal">
                      International Balkan University
                    </span>
                    . <br />
                    <br /> When I work on my projects, I{" "}
                    <span className="font-normal">give my all</span> I want them
                    to be perfect down to the{" "}
                    <span className="font-normal">smallest pixel</span>. I
                    consistently finish assignments on time, sometimes even{" "}
                    <span className="font-normal">earlier</span>. I`m always
                    eager to create something{" "}
                    <span className="font-normal">new</span> and{" "}
                    <span className="font-normal">fun</span>, and I can work in
                    a variety of different styles.
                  </p>
                </div>
                <div className="flex flex-row flex-wrap md:flex-nowrap xl:flex lg:flex md:hidden sm:flex text-8xl lg:flex-row justify-center md:justify-between gap-10 md:gap-16 my-0 self-center">
                  {handleSkills()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
