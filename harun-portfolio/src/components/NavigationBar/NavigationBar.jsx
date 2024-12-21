import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SnackbarShow from "../../MuiElements/SnackbarShow";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../database/firebase";

export default function NavigationBar({ siteSettings, from }) {
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

  const siteSettingsRef = doc(collection(database, "siteSettings"), "settings");

  useEffect(() => {
    getSiteSettings();
  }, []);

  useEffect(() => {
    if (from === "admin") setSettings({ ...siteSettings });
  }, [siteSettings]);

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
    console.log(settings);
  }, [settings]);

  const pages = [
    { link: "about", title: "About Me" },
    { link: "projects", title: "My Projects" },
    { link: "cv", title: "CV" },
  ];

  const [categories, setCategories] = useState([]);
  const categoriesRef = collection(database, "categories");
  const [showBar, setShowBar] = useState({
    clicked: false,
    message: "Redirecting!",
  });

  const getCategories = async () => {
    try {
      const data = await getDocs(categoriesRef);
      setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error(error);
    }
  };

  const [hoverState, setHoverState] = useState({});
  const [activeState, setActiveState] = useState({});

  const renderNav = () => {
    return pages.map((value, valueIndex) => (
      <Link
        to={`/${value.link}`}
        key={valueIndex}
        className="flex justify-center items-center"
        onClick={() => {
          if (value.link === "projects") getCategories();
        }}
      >
        <div
          className="p-3 border-b-2 border-b-transparent hover:border-b-white cursor-pointer w-max transition rounded-t-lg flex"
          onMouseEnter={() =>
            setHoverState((prev) => ({ ...prev, [valueIndex]: true }))
          }
          onMouseLeave={() =>
            setHoverState((prev) => ({ ...prev, [valueIndex]: false }))
          }
          onMouseDown={() =>
            setActiveState((prev) => ({ ...prev, [valueIndex]: true }))
          }
          onMouseUp={() =>
            setActiveState((prev) => ({ ...prev, [valueIndex]: false }))
          }
          style={{
            color: settings.buttonsTextColor,
            backgroundColor: hoverState[valueIndex]
              ? settings.buttonsHoverColor
              : activeState[valueIndex]
              ? settings.buttonsActiveColor
              : settings.buttonsColor,
          }}
        >
          <p>{value.title}</p>
        </div>
        {valueIndex !== pages.length - 1 && (
          <div className="h-[30px] w-[1px] mx-3"></div>
        )}
      </Link>
    ));
  };

  return (
    <>
      <SnackbarShow get={showBar} set={setShowBar} />
      <div
        className={`border-b-2 fixed w-full backdrop-blur-lg`}
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
        <div className="flex justify-between items-center text-white font-semibold py-5 text-xl mx-auto my-0 w-3/4">
          <Link
            className="py-3 rounded-xl p-3 px-5 min-w-[5rem] mr-5 inline-flex justify-center items-center text-wrap"
            to="/"
            style={{
              color: settings.logoTextColor,
              backgroundColor: settings.logoBackgroundColor,
            }}
          >
            <span className="text-3xl font-extrabold text-center">
              HARUN SPAHO
            </span>
          </Link>
          <div
            className="flex px-5 rounded-xl"
            style={{
              backgroundColor: settings.buttonsColor,
              color: settings.buttonsTextColor,
            }}
          >
            {renderNav()}
          </div>
        </div>
      </div>
    </>
  );
}
