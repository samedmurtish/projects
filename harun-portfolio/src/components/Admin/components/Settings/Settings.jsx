import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../../../database/firebase";
import { FaPlus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import supabase from "../../../../database/supabase";

export default function Settings({
  setSiteSettings,
  siteSettings,
  loading,
  setLoading,
}) {
  const [opacity, setOpacity] = useState(33);

  const [tempImage, setTempImage] = useState(null);
  const [saveActive, setSaveActive] = useState(false);

  useEffect(() => {
    setSaveActive(true);
  }, [siteSettings]);

  const getSiteSettings = async () => {
    setLoading(true);
    try {
      const docSnap = await getDoc(siteSettingsRef);
      if (docSnap.exists()) {
        setSiteSettings(docSnap.data());
        setSaveActive(false);
      }
    } catch (error) {
      console.error("Error getting document: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSiteSettings();
  }, []);

  const siteSettingsRef = doc(collection(database, "siteSettings"), "settings");

  const handleSave = async () => {
    const docSnap = await getDoc(siteSettingsRef);
    const defaultValues = {
      borderColor: "#ab012e",
      backgroundColor: "#ab012e",
      backgroundOpacity: "33",
      buttonsTextColor: "#ffffff",
      buttonsColor: "#ab012e",
      buttonsHoverColor: "#a0002b",
      buttonsActiveColor: "#920127",
      logoBackgroundColor: "#ab012e",
      logoTextColor: "#ffffff",
      aboutMeTitleColor: "#ab012e",
      aboutMeContentColor: "#ab012e",
      aboutMeContentTextColor: "#ffffff",
      aboutMeTitleTextColor: "#ffffff",
      aboutMeContentOpacity: "55",
      aboutMeImage: null,
      aboutMeImageName: null,
    };
    const siteSettingsToSave = {
      borderColor: siteSettings.borderColor ?? defaultValues.borderColor,
      backgroundColor:
        siteSettings.backgroundColor ?? defaultValues.backgroundColor,
      backgroundOpacity:
        siteSettings.backgroundOpacity ?? defaultValues.backgroundOpacity,
      buttonsTextColor:
        siteSettings.buttonsTextColor ?? defaultValues.buttonsTextColor,
      buttonsColor: siteSettings.buttonsColor ?? defaultValues.buttonsColor,
      buttonsHoverColor:
        siteSettings.buttonsHoverColor ?? defaultValues.buttonsHoverColor,
      buttonsActiveColor:
        siteSettings.buttonsActiveColor ?? defaultValues.buttonsActiveColor,
      logoBackgroundColor:
        siteSettings.logoBackgroundColor ?? defaultValues.logoBackgroundColor,
      logoTextColor: siteSettings.logoTextColor ?? defaultValues.logoTextColor,
      aboutMeTitleColor:
        siteSettings.aboutMeTitleColor ?? defaultValues.aboutMeTitleColor,
      aboutMeContentColor:
        siteSettings.aboutMeContentColor ?? defaultValues.aboutMeContentColor,
      aboutMeTitleTextColor:
        siteSettings.aboutMeTitleTextColor ??
        defaultValues.aboutMeTitleTextColor,
      aboutMeContentTextColor:
        siteSettings.aboutMeContentTextColor ??
        defaultValues.aboutMeContentTextColor,
      aboutMeContentOpacity:
        siteSettings.aboutMeContentOpacity ??
        defaultValues.aboutMeContentOpacity,
      aboutMeImage: siteSettings.aboutMeImage ?? defaultValues.aboutMeImage,
      aboutMeImageName:
        siteSettings.aboutMeImageName ?? defaultValues.aboutMeImageName,
    };
    if (docSnap.exists()) {
      await updateDoc(siteSettingsRef, siteSettingsToSave);
    } else {
      await setDoc(siteSettingsRef, siteSettingsToSave);
    }
  };

  const handleImageUpload = async (file) => {
    setLoading(true);
    try {
      const date = Date.now();
      const fileName = `aboutme-${date}`;
      const { data, error } = await supabase.storage
        .from("project_images")
        .upload(`images/${fileName}`, file);
      if (error) throw error;
      const newImageUrl = `https://xjqscviwjivzzithxfel.supabase.co/storage/v1/object/public/project_images/images/${fileName}`;
      setSiteSettings({
        ...siteSettings,
        aboutMeImage: newImageUrl,
        aboutMeImageName: fileName,
      });
      console.log("Image uploaded:", newImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      if (siteSettings.aboutMeImageName) {
        const { error } = await supabase.storage
          .from("project_images")
          .update(`images/${siteSettings.aboutMeImageName}`, file);
        if (error) throw error;
        setTempImage(URL.createObjectURL(file));
        console.log("Image updated successfully");
      }
    } catch (error) {
      console.error("Error updating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col justify-between h-full gap-7"
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      <div className="overflow-y-auto">
        <h1 className="text-2xl font-extrabold p-5 text-center self-center">
          Settings
        </h1>
        <div>
          <div className="w-full h-max flex flex-col pr-5 gap-10">
            <div className="flex flex-wrap bg-[#191919] gap-5 rounded-xl">
              <h1 className="p-5 bg-[#ab012f] text-xl w-full">
                Navigation Bar
              </h1>
              <div className="px-5 py-3 bg-[#242424] w-full h-max rounded-xl m-3 flex justify-center items-center gap-5 flex-wrap flex-col border-b-2 border-b-[#ab012f]">
                <h1 className="text-xl border-b-2 w-1/2 text-center pb-5 border-b-[#ab012f]">
                  General
                </h1>
                <div className="flex justify-around flex-wrap gap-5">
                  <div className="bg-[#202020] w-full max-w-52 h-full justify-between rounded-xl flex items-center flex-col gap-3 pb-2">
                    <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-t-lg">
                      Text Color
                    </h1>
                    <input
                      type="color"
                      className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                      title="Choose your color"
                      value={siteSettings.buttonsTextColor}
                      onChange={(e) => {
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            buttonsTextColor: e.target.value,
                          };
                        });
                      }}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                      type="button"
                      onClick={() =>
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            buttonsTextColor: "#ffffff",
                          };
                        })
                      }
                    >
                      Default
                    </button>
                  </div>
                  <div className=" bg-[#202020] w-full max-w-52 h-full justify-between rounded-xl flex items-center flex-col gap-3 pb-2">
                    <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-t-lg">
                      Background Color
                    </h1>
                    <input
                      type="color"
                      className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                      title="Choose your color"
                      value={siteSettings.backgroundColor}
                      onChange={(e) => {
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            backgroundColor: e.target.value,
                          };
                        });
                      }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={siteSettings.backgroundOpacity}
                      onChange={(e) => {
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            backgroundOpacity: e.target.value,
                          };
                        });
                        setOpacity(e.target.value);
                      }}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                      type="button"
                      onClick={() => {
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            backgroundColor: "#AB012F",
                            backgroundOpacity: 33,
                          };
                        });
                        setOpacity(33);
                      }}
                    >
                      Default
                    </button>
                  </div>
                  <div className=" bg-[#202020] w-full max-w-52 h-full justify-between rounded-xl flex items-center flex-col gap-3 pb-2">
                    <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-t-lg">
                      Border Color
                    </h1>
                    <input
                      type="color"
                      className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                      title="Choose your color"
                      value={siteSettings.borderColor}
                      onChange={(e) => {
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            borderColor: e.target.value,
                          };
                        });
                      }}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                      type="button"
                      onClick={() =>
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            borderColor: "#AB012F",
                          };
                        })
                      }
                    >
                      Default
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 bg-[#242424] w-full h-max rounded-xl m-3 flex justify-center items-center gap-5 flex-wrap flex-col border-b-2 border-b-[#ab012f]">
                <h1 className="text-xl border-b-2 w-1/2 text-center pb-5 border-b-[#ab012f]">
                  Logo
                </h1>
                <div className="flex justify-around flex-wrap">
                  <div className=" bg-[#202020] w-max h-max rounded-xl m-3 flex justify-center items-center flex-col gap-3 pb-2">
                    <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-lg">
                      Background Color
                    </h1>
                    <input
                      type="color"
                      className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                      title="Choose your color"
                      value={siteSettings.logoBackgroundColor}
                      onChange={(e) => {
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            logoBackgroundColor: e.target.value,
                          };
                        });
                      }}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                      type="button"
                      onClick={() =>
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            logoBackgroundColor: "#AB012F",
                          };
                        })
                      }
                    >
                      Default
                    </button>
                  </div>
                  <div className=" bg-[#202020] w-max h-max rounded-xl m-3 flex justify-center items-center flex-col gap-3 pb-2">
                    <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-lg">
                      Text Color
                    </h1>
                    <input
                      type="color"
                      className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                      title="Choose your color"
                      value={siteSettings.logoTextColor}
                      onChange={(e) => {
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            logoTextColor: e.target.value,
                          };
                        });
                      }}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                      type="button"
                      onClick={() =>
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            logoTextColor: "#FFFFFF",
                          };
                        })
                      }
                    >
                      Default
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 bg-[rgb(36,36,36)] w-full h-max rounded-xl m-3 flex justify-center items-center gap-5 flex-wrap flex-col border-b-2 border-b-[#ab012f]">
                <h1 className="text-xl border-b-2 w-1/2 text-center pb-5 border-b-[#ab012f]">
                  Buttons
                </h1>
                <div className="flex justify-around flex-wrap">
                  <div className=" bg-[#202020] w-max h-max rounded-xl m-3 flex justify-center items-center flex-col gap-3 pb-2">
                    <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-lg">
                      Background Color
                    </h1>
                    <input
                      type="color"
                      className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                      title="Choose your color"
                      value={siteSettings.buttonsColor}
                      onChange={(e) => {
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            buttonsColor: e.target.value,
                          };
                        });
                      }}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                      type="button"
                      onClick={() =>
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            buttonsColor: "#AB012F",
                          };
                        })
                      }
                    >
                      Default
                    </button>
                  </div>
                  <div className=" bg-[#202020] w-max h-max rounded-xl m-3 flex justify-center items-center flex-col gap-3 pb-2">
                    <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-lg">
                      Text Color
                    </h1>
                    <input
                      type="color"
                      className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                      title="Choose your color"
                      value={siteSettings.buttonsTextColor}
                      onChange={(e) => {
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            buttonsTextColor: e.target.value,
                          };
                        });
                      }}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                      type="button"
                      onClick={() =>
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            buttonsTextColor: "#FFFFFF",
                          };
                        })
                      }
                    >
                      Default
                    </button>
                  </div>
                  <div className=" bg-[#202020] w-max h-max rounded-xl m-3 flex justify-center items-center flex-col gap-3 pb-2">
                    <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-lg">
                      Mouse Over Color
                    </h1>
                    <input
                      type="color"
                      className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                      title="Choose your color"
                      value={siteSettings.buttonsHoverColor}
                      onChange={(e) => {
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            buttonsHoverColor: e.target.value,
                          };
                        });
                      }}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                      type="button"
                      onClick={() =>
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            buttonsHoverColor: "#a0002b",
                          };
                        })
                      }
                    >
                      Default
                    </button>
                  </div>
                  <div className=" bg-[#202020] w-max h-max rounded-xl m-3 flex justify-center items-center flex-col gap-3 pb-2">
                    <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-lg">
                      On Mouse Click Color
                    </h1>
                    <input
                      type="color"
                      className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                      title="Choose your color"
                      value={siteSettings.buttonsActiveColor}
                      onChange={(e) => {
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            buttonsActiveColor: e.target.value,
                          };
                        });
                      }}
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                      type="button"
                      onClick={() =>
                        setSiteSettings((prev) => {
                          return {
                            ...prev,
                            buttonsActiveColor: "#920127",
                          };
                        })
                      }
                    >
                      Default
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="p-5 bg-[#ab012f] text-xl">About Me</h1>
              <div className="flex flex-wrap bg-[#191919] gap-5 rounded-xl">
                <div className="px-5 py-3 bg-[rgb(36,36,36)] w-full h-max rounded-xl m-3 flex justify-center items-center gap-5 flex-wrap flex-col border-b-2 border-b-[#ab012f]">
                  <h1 className="text-xl border-b-2 w-1/2 text-center pb-5 border-b-[#ab012f]">
                    General
                  </h1>
                  <div className="flex justify-around flex-wrap">
                    <div className=" bg-[#202020] w-max h-max rounded-xl m-3 flex justify-center items-center flex-col gap-3 pb-2">
                      <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-lg">
                        Title Background
                      </h1>
                      <input
                        type="color"
                        className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                        title="Choose your color"
                        value={siteSettings.aboutMeTitleColor}
                        onChange={(e) => {
                          setSiteSettings((prev) => {
                            return {
                              ...prev,
                              aboutMeTitleColor: e.target.value,
                            };
                          });
                        }}
                      />
                      <button
                        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                        type="button"
                        onClick={() =>
                          setSiteSettings((prev) => {
                            return {
                              ...prev,
                              aboutMeTitleColor: "#AB012F",
                            };
                          })
                        }
                      >
                        Default
                      </button>
                    </div>
                    <div className=" bg-[#202020] w-max h-max rounded-xl m-3 flex justify-center items-center flex-col gap-3 pb-2">
                      <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-lg">
                        Content Background
                      </h1>
                      <input
                        type="color"
                        className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                        title="Choose your color"
                        value={siteSettings.aboutMeContentColor}
                        onChange={(e) => {
                          setSiteSettings((prev) => {
                            return {
                              ...prev,
                              aboutMeContentColor: e.target.value,
                            };
                          });
                        }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={siteSettings.aboutMeContentOpacity}
                        onChange={(e) => {
                          setSiteSettings((prev) => {
                            return {
                              ...prev,
                              aboutMeContentOpacity: e.target.value,
                            };
                          });
                        }}
                      />
                      <button
                        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                        type="button"
                        onClick={() =>
                          setSiteSettings((prev) => {
                            return {
                              ...prev,
                              aboutMeContentColor: "#AB012F",
                              aboutMeContentOpacity: 55,
                            };
                          })
                        }
                      >
                        Default
                      </button>
                    </div>
                    <div className=" bg-[#202020] w-max h-max rounded-xl m-3 flex justify-center items-center flex-col gap-3 pb-2">
                      <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-lg">
                        Title Text
                      </h1>
                      <input
                        type="color"
                        className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                        title="Choose your color"
                        value={siteSettings.aboutMeTitleTextColor}
                        onChange={(e) => {
                          setSiteSettings((prev) => {
                            return {
                              ...prev,
                              aboutMeTitleTextColor: e.target.value,
                            };
                          });
                        }}
                      />
                      <button
                        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                        type="button"
                        onClick={() =>
                          setSiteSettings((prev) => {
                            return {
                              ...prev,
                              aboutMeTitleTextColor: "#ffffff",
                            };
                          })
                        }
                      >
                        Default
                      </button>
                    </div>
                    <div className=" bg-[#202020] w-max h-max rounded-xl m-3 flex justify-center items-center flex-col gap-3 pb-2">
                      <h1 className="w-full bg-[#ab012f99] px-5 py-2 rounded-lg">
                        Content Text
                      </h1>
                      <input
                        type="color"
                        className="p-1 h-10 w-14 blockcursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                        title="Choose your color"
                        value={siteSettings.aboutMeContentTextColor}
                        onChange={(e) => {
                          setSiteSettings((prev) => {
                            return {
                              ...prev,
                              aboutMeContentTextColor: e.target.value,
                            };
                          });
                        }}
                      />
                      <button
                        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg py-2 w-[85%]"
                        type="button"
                        onClick={() =>
                          setSiteSettings((prev) => {
                            return {
                              ...prev,
                              aboutMeContentTextColor: "#ffffff",
                            };
                          })
                        }
                      >
                        Default
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-3 bg-[rgb(36,36,36)] w-full h-max rounded-xl m-3 flex justify-center items-center gap-5 flex-wrap flex-col border-b-2 border-b-[#ab012f] pb-10">
                  <h1 className="text-xl border-b-2 w-1/2 text-center pb-5 border-b-[#ab012f]">
                    Image
                  </h1>
                  <div className="flex flex-wrap md:w-96 md:h-96">
                    <div className="bg-[#202020] w-full h-full rounded-xl m-3 flex justify-start items-center flex-col gap-3 md:p-5">
                      <h1 className="w-full bg-[#ab012f99] px-5 p-2 rounded-lg">
                        Image
                      </h1>
                      {siteSettings.aboutMeImage || tempImage ? (
                        loading ? (
                          <div className="w-full h-full flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
                          </div>
                        ) : (
                          <div className="relative w-64 h-64 group border-2 border-[#ab012f] rounded-2xl justify-end">
                            <div className="absolute cursor-pointer backdrop-blur-sm top-0 left-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition w-full h-12 md:h-full rounded-xl flex justify-center items-center md:flex-col">
                              <label
                                htmlFor="about-me-image"
                                className="cursor-pointer bg-blue-500/50 text-white text-md md:text-xl uppercase font-extrabold hover:bg-blue-600/50 p-5 md:rounded-t-xl rounded-tl-xl w-full h-full flex justify-center items-center"
                              >
                                Change
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                id="about-me-image"
                                hidden
                                onChange={(e) => {
                                  if (!e.target.files[0]) return;
                                  handleUpdateImage(e);
                                }}
                              />
                              <button
                                onClick={() => {
                                  setSiteSettings((prev) => ({
                                    ...prev,
                                    aboutMeImage: null,
                                    aboutMeImageName: null,
                                  }));
                                  setTempImage(null);
                                }}
                                className="bg-rose-500/50 text-white text-md md:text-xl uppercase font-extrabold hover:bg-rose-600/50 p-5 rounded-tr-xl md:rounded-t-none md:rounded-b-xl w-full h-full flex justify-center items-center"
                              >
                                Remove
                              </button>
                            </div>
                            <img
                              src={
                                siteSettings.aboutMeImage +
                                  `?t=${Date.now()}` || tempImage
                              }
                              className="w-full h-full object-contain rounded-xl"
                              alt="About Me"
                            />
                          </div>
                        )
                      ) : (
                        <div className="w-full h-full rounded-lg flex justify-center items-center">
                          <label
                            htmlFor="about-me-image"
                            className="w-full h-full cursor-pointer bg-blue-600 hover:bg-blue-700 flex justify-center items-center rounded-xl"
                          >
                            <span className="text-white text-6xl">
                              <FiPlus />
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              id="about-me-image"
                              hidden
                              onChange={(e) => {
                                if (!e.target.files[0]) return;
                                handleImageUpload(e.target.files[0]);
                              }}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {saveActive && (
        <div>
          <button
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg w-full"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      )}
    </form>
  );
}
