import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../database/firebase";
export default function NavigationBarMobile() {
  const pages = [
    { link: "about", title: "About Me" },
    { link: "projects", title: "My Projects" },
    { link: "cv", title: "CV" },
  ];

  const [menuOpened, setMenuOpened] = useState(false);

  document.title = "Harun Spaho`s Portfolio";

  const [settings, setSettings] = useState({
    borderColor: "#ab012e",
    backgroundColor: "#ab012e",
    backgroundOpacity: "33",
    buttonsTextColor: "#ffffff",
    buttonsColor: "#ab012e",
    buttonsHoverColor: "#a0002b",
    buttonsActiveColor: "#920127",
    logoBackgroundColor: "#ab012e",
    logoTextColor: "#ffffff",
  });

  const siteSettingsRef = doc(database, "siteSettings", "settings");

  const getSiteSettings = async () => {
    try {
      const docSnap = await getDoc(siteSettingsRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      } else {
        await setDoc(siteSettingsRef, {
          borderColor: "#ab012e",
          backgroundColor: "#ab012e",
          backgroundOpacity: "33",
          buttonsTextColor: "#ffffff",
          buttonsColor: "#ab012e",
          buttonsHoverColor: "#a0002b",
          buttonsActiveColor: "#920127",
          logoBackgroundColor: "#ab012e",
          logoTextColor: "#ffffff",
        });
        console.log("Document initialized with default colors");
      }
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  };
  useEffect(() => {
    getSiteSettings();
  }, []);

  const renderNav = () => {
    return pages.map((value, valueIndex) => (
      <Link
        to={`/${value.link}`}
        key={valueIndex}
        className="flex justify-center items-center px-5 pb-2"
      >
        <div
          className="p-3 border-b-2 border-b-transparent hover:border-b-white border-b-[#cf5f5f] cursor-pointer w-full transition hover:bg-[#ac002e] bg-[#a0002b] active:bg-[#920127] flex justify-center"
          style={{
            color: settings.buttonsTextColor,
            backgroundColor: settings.buttonsColor,
            borderColor: settings.borderColor,
          }}
        >
          <p>{value.title}</p>
        </div>
      </Link>
    ));
  };

  return (
    <>
      <div
        className={`border-b-2 fixed w-full backdrop-blur-lg shadow-2xl z-[1000000]`}
        style={{
          borderColor: settings.borderColor,
          backgroundColor: `rgba(${parseInt(
            settings.backgroundColor.slice(1, 3),
            16
          )}, ${parseInt(settings.backgroundColor.slice(3, 5), 16)}, ${parseInt(
            settings.backgroundColor.slice(5, 7),
            16
          )}, ${settings.backgroundOpacity / 100})`,
        }}
      >
        <div className="flex justify-between items-center text-white font-semibold py-5 text-xl mx-auto my-0 w-5/6 ">
          <Link
            className="py-3 rounded-xl p-3 px-5 min-w-[5rem] inline-flex justify-center items-center text-wrap"
            to="/"
            style={{
              color: settings.logoTextColor,
              backgroundColor: settings.logoBackgroundColor,
            }}
          >
            <span className="text-xl font-extrabold text-center">
              HARUN SPAHO
            </span>
          </Link>
          <div
            className="rounded-full p-2 cursor-pointer"
            style={{
              color: settings.buttonsTextColor,
              backgroundColor: settings.buttonsColor,
            }}
            onClick={() => setMenuOpened(!menuOpened)}
          >
            <HiOutlineMenu />
          </div>
        </div>

        {menuOpened && (
          <div
            className="h-screen w-2/5 fixed right-0 text-white backdrop-blur-lg"
            style={{
              backgroundColor: settings.backgroundColor,
            }}
          >
            <div className="font-semibold py-3">{renderNav()}</div>
          </div>
        )}
      </div>
    </>
  );
}
