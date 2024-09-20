"use client";

import arrowColored from "../icons/arrowcolored.png";

import bottomBG from "../backgroundImages/bottom.svg";
import topBG from "../backgroundImages/top.svg";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [clicked, setClicked] = useState(false);

  const [isAdmin, setIsAdmin] = useState(true);

  const [loading, setLoading] = useState(false);

  const [newJourney, setNewJourney] = useState({
    thumbnail: "",
    description: "",
    date: {
      day: "",
      month: "",
      year: 0,
    },
    dateNumber: {
      day: 0,
      month: 0,
      year: 0,
    },
    images: [],
    rawImages: [],
  });

  const [newJourneyRawImages, setNewJourneyRawImages] = useState<string[]>([]);

  const [thumbnail, setThumbnail] = useState<any>();

  const [journeys, setJourneys] = useState<any[]>([]);

  const [now, setNow] = useState(Date.now());

  const renderImages = () => {
    return journeys.map((journey: any, index: number) => (
      <div
        className={`flex flex-col w-full h-full z-50 justify-center items-center ${
          index == 0 ? "mt-[20rem]" : "mt-0 "
        }`}
        key={index}
      >
        <div className="text-7xl font-extrabold text-white p-3 flex flex-col justify-center items-center mb-5">
          <h2>{journey.date.year}</h2>
          <h2 className="text-4xl text-slate-400">{journey.date.month}</h2>
          <h2 className="text-3xl text-slate-500">{journey.date.day}</h2>
          {journey.description && (
            <p
              className="text-slate-500 font-semibold text-5xl mt-3"
              id="handwrite"
            >
              <span className="text-slate-600 mr-3">"</span>
              {journey.description}
              <span className="text-slate-600 ml-2">"</span>
            </p>
          )}
        </div>
        <div className="bg-slate-100 w-screen md:w-1/2 md:h-full h-max text-white p-5 md:min-w-[450px] rounded-3xl">
          <div className="relative flex flex-col">
            <div className="flex gap-2 justify-center flex-wrap ">
              {journey.images.map((image: any, index: number) => (
                <img
                  className="w-32 h-32 bg-white rounded-3xl transition-all ease-in-out duration-300 object-cover hover:flex-grow-[1]"
                  src={image}
                  key={index}
                ></img>
              ))}
            </div>
            <div className="absolute self-center flex justify-center items-center gap-2 bottom-[-5rem]">
              {isAdmin && (
                <button className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 font-semibold text-white text-xl p-3 px-5 rounded-lg w-[7rem]">
                  Edit
                </button>
              )}
              <img
                className="w-32 h-32 rounded-full self-center bg-black border-2 hover:w-36 hover:h-36 transition-all object-cover"
                src={journey.thumbnail}
              />
              {isAdmin && (
                <button
                  className="bg-red-400 hover:bg-red-500 active:bg-red-600 font-semibold text-white text-xl p-3 px-5 rounded-lg w-[7rem]"
                  onClick={() => handlDeleteJourney(index, journey.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
        {index != journeys.length - 1 ? (
          <img
            src={arrowColored.src}
            className="w-48 h-48 mt-24 mb-32 md:mb-12"
          />
        ) : null}
      </div>
    ));
  };

  const handlDeleteJourney = async (indexId: number, id: number) => {
    const deleteJourneyImages = async () => {
      const deleteJourneyThumbnail = async () => {
        const prefix: any = `images/thumbnail_${journeys[indexId].now}`;
        const { data, error } = await supabase.storage
          .from("journey.images")
          .remove(prefix);
        if (error) {
          return console.log(error);
        } else {
          console.log(data);
        }
      };
      await deleteJourneyThumbnail();
      for (let i = 0; i < journeys[indexId].images.length; i++) {
        const prefix: any = `images/journey_${i + 1}_${journeys[indexId].now}`;

        console.log(prefix, journeys[indexId]);
        const { data, error } = await supabase.storage
          .from("journey.images")
          .remove(prefix);

        if (error) {
          return console.log(error);
        } else {
          console.log(data);
        }
      }
    };
    await deleteJourneyImages();

    const { data, error } = await supabase
      .from("journeys")
      .delete()
      .eq("id", id);
    if (error) {
      return console.log(error);
    }
    getJourneys();
  };

  const handleAddButton = (e: any) => {
    setClicked(!clicked);
    e.target.remove();
  };

  const addImage = (e: any) => {
    Array.from(e).map((image: any) => {
      setNewJourney((prev: any) => ({
        ...prev,
        images: [...prev.images, URL.createObjectURL(image)],
      }));
      setNewJourneyRawImages((prev: any) => [...prev, image]);
    });
  };

  const handleRemoveImage = (index: number) => {
    setNewJourney((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index),
    }));
  };

  useEffect(() => {
    getJourneys();
  }, []);

  const getJourneys = async () => {
    const { data, error } = await supabase
      .from("journeys")
      .select("*")
      .order("id", { ascending: true });
    if (error) {
      console.log(error);
    } else {
      data.map((data: any) => {
        setJourneys((prev: any) => {
          let list = JSON.parse(data.journey);
          list.images = data.images;
          list.thumbnail = data.thumbnail;
          list.now = data.now;
          list.id = data.id;
          return [...prev, list];
        });
      });
    }
  };

  const handlePostJourney = async () => {
    setNow(Date.now());
    console.log("posting, ", newJourney);

    const uploadJourney = async (images: any, thumbnail: any) => {
      const { data, error } = await supabase.from("journeys").insert({
        journey: JSON.stringify(newJourney),
        now,
        images,
        thumbnail,
      });
      if (error) {
        console.log(error);
      } else {
        setLoading(false);
      }
    };

    let uploadedImageURLs: any = [];
    let thumbnailURL: any = "";
    const uploadImages = async () => {
      setLoading(true);
      const fileName = `images/thumbnail_${now}`;
      const { data, error } = await supabase.storage
        .from("journey.images")
        .upload(fileName, thumbnail, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.log("Error uploading thumbnail:", error);
        return setLoading(false);
      } else {
        const imageURL = supabase.storage
          .from("journey.images")
          .getPublicUrl(fileName);
        thumbnailURL = imageURL.data.publicUrl;
        console.log(
          "Thumbnail uploaded successfully:",
          imageURL.data.publicUrl
        );
      }

      for (let i = 0; i < newJourneyRawImages.length; i++) {
        const image = newJourneyRawImages[i];
        if (image) {
          const fileName = `images/journey_${i + 1}_${now}`;
          const { data, error } = await supabase.storage
            .from("journey.images")
            .upload(fileName, image, {
              cacheControl: "3600",
              upsert: false,
            });

          if (error) {
            console.log(`Error uploading image ${i + 1}:`, error);
            return setLoading(false);
          } else {
            const imageURL = supabase.storage
              .from("journey.images")
              .getPublicUrl(fileName);
            uploadedImageURLs.push(imageURL.data.publicUrl);
            console.log(
              `Image ${i + 1} uploaded successfully:`,
              imageURL.data.publicUrl
            );
          }
        }
      }

      await uploadJourney(uploadedImageURLs, thumbnailURL);
    };
    await uploadImages();

    setJourneys((prev: any) => [...prev, newJourney]);

    setNewJourneyRawImages([]);

    return setNewJourney({
      thumbnail: "",
      description: "",
      date: {
        day: "",
        month: "",
        year: 0,
      },
      dateNumber: {
        day: 0,
        month: 0,
        year: 0,
      },
      images: [],
      rawImages: [],
    });
  };

  const handleSeperateDate = (e: any) => {
    var date = new Date(e);
    const getDayName: any = () => {
      return date.toLocaleDateString("en-EN", { weekday: "long" });
    };
    const getMonthName: any = () => {
      return date.toLocaleDateString("en-EN", { month: "long" });
    };

    let dayName: any = getDayName();
    let monthName: any = getMonthName();

    let year = Number(e.toString().substring(0, 4));
    let month = Number(e.toString().substring(5, 7));
    let day = Number(e.toString().substring(8, 10));

    setNewJourney((prev: any) => ({
      ...prev,
      date: {
        day: dayName,
        month: monthName,
        year: year,
      },
      dateNumber: {
        day,
        month,
        year,
      },
    }));
  };

  const handleAddThumbnail = (e: any) => {
    setThumbnail(e);
    return (
      e != undefined &&
      setNewJourney((prev: any) => ({
        ...prev,
        thumbnail: URL.createObjectURL(e),
      }))
    );
  };

  const handleSetDescription = (e: any) => {
    return setNewJourney((prev: any) => ({
      ...prev,
      description: e,
    }));
  };

  return (
    <main className="flex h-full flex-col items-center justify-center select-none">
      <div className="h-[100vh] w-screen">
        <img
          src={bottomBG.src}
          className="relative w-full h-full object-cover pointer-events-none"
        />
        <div className="text-slate-500 font-semibold z-[100] text-5xl absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full flex justify-center items-center flex-col gap-5 lg:gap-10 lg:flex-row">
          {isAdmin && (
            <form
              className="flex justify-center items-center gap-5"
              onSubmit={(e) => {
                e.preventDefault();

                if (!newJourney.thumbnail) {
                  alert("Please select a thumbnail.");
                  return;
                }

                if (newJourney.images.length <= 0) {
                  alert("Please select at least one image.");
                  return;
                }

                if (newJourney.images.length > 0 && newJourney.thumbnail) {
                  handlePostJourney();
                }
              }}
            >
              <div
                className={`text-white  ${
                  clicked ? "opacity-0" : "opacity-100 left-1/2"
                } transition-all duration-150 ease-in-out z-[200] flex`}
                onClick={(e) => handleAddButton(e)}
              >
                <button className="bg-green-400 hover:bg-green-500 active:bg-green-600 font-semibold text-white text-xl p-3 px-5 rounded-lg">
                  Add Memory
                </button>
              </div>
              {loading && (
                <div className="w-full h-full absolute loader z-[100]"></div>
              )}
              <div className="fixed lg:relative sm:bottom-5 md:bottom-12 bottom-48 top-0 left-0 right-0 -translate-y-1/2 lg:-translate-y-0">
                <div
                  className={`relative ${
                    clicked
                      ? "min-w-screen lg:min-w-[36rem]  max-w-screen lg:max-w-[45rem] h-screen lg:h-[25rem] bg-white lg:bg-[rgba(255,255,255,0.3)]"
                      : "w-0 h-0 bg-[rgba(255,255,255,0.0)] overflow-hidden overflow-y-hidden"
                  } transition-all duration-700 rounded-xl flex flex-wrap p-3 overflow-y-auto `}
                >
                  <div className="w-full md:w-max h-max flex flex-wrap overflow-y-auto items-start justify-start gap-2">
                    <label
                      className={`${
                        clicked
                          ? "w-full md:w-32 h-32 text-4xl opacity-100"
                          : "w-0 h-0 text-[0px] opacity-0"
                      } mt-[21rem] md:mt-0 flex justify-center items-center bg-blue-500 transition-all text-white rounded-lg cursor-pointer border-2 border-transparent hover:border-white hover:border-opacity-40 duration-1000 hover:duration-300`}
                    >
                      +
                      <input
                        type="file"
                        accept="image/*"
                        name="images"
                        hidden
                        onChange={(e: any) => addImage(e.target.files)}
                        multiple
                        disabled={loading}
                      />
                    </label>
                    {newJourney.images.map((image: any, index: any) => (
                      <img
                        className={`${
                          clicked ? "w-32 h-32" : "w-0 h-0"
                        } flex justify-center items-center bg-blue-500 transition-all text-white rounded-lg cursor-pointer border-2 border-transparent hover:border-white hover:border-opacity-40 duration-300 hover:duration-300 bg-transparent hover:bg-[rgba(255,255,255,0.2)] object-cover`}
                        src={image}
                        key={index}
                        onClick={() => {
                          !loading && handleRemoveImage(index);
                        }}
                      />
                    ))}
                  </div>
                </div>
                <label
                  className={`absolute hidden md:flex md:top-[0%] -translate-y-1/2 -translate-x-1/2 left-1/2 ${
                    clicked
                      ? `${
                          newJourney.thumbnail ? "w-36  h-36" : "w-32 h-16"
                        } h-16 border-2 opacity-100 text-3xl`
                      : "w-0 h-0 border-0 opacity-0 text-[0px]"
                  } rounded-full ${
                    newJourney.thumbnail
                      ? " hover:w-32 hover:h-32 "
                      : " hover:w-36 hover:h-36 "
                  } transition-all hover:duration-300  duration-1000 object-cover self-center justify-self-center flex justify-center items-center cursor-pointer text-white border-white bg-white`}
                >
                  {newJourney.thumbnail ? (
                    <img
                      src={newJourney.thumbnail}
                      className="w-full h-full object-cover rounded-full flex justify-center items-center"
                    />
                  ) : (
                    <div className="bg-green-500 w-full h-full flex justify-center items-center rounded-full">
                      +
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e: any) => handleAddThumbnail(e.target.files[0])}
                    name="thumbnail"
                    disabled={loading}
                  />
                </label>
                <label
                  className={`absolute top-[35%] md:hidden z-10 -translate-y-1/2 -translate-x-1/2 left-1/2 ${
                    clicked
                      ? `${
                          newJourney.thumbnail ? "w-36  h-36" : "w-32 h-32"
                        } h-16 border-2 opacity-100 text-3xl`
                      : "w-0 h-0 border-0 opacity-0 text-[0px]"
                  } rounded-full ${
                    newJourney.thumbnail
                      ? " hover:w-32 hover:h-32 "
                      : " hover:w-36 hover:h-36 "
                  } transition-all hover:duration-300  duration-1000 object-cover self-center justify-self-center flex justify-center items-center cursor-pointer text-white border-white`}
                >
                  {newJourney.thumbnail ? (
                    <img
                      src={newJourney.thumbnail}
                      className="w-full h-full object-cover rounded-full flex justify-center items-center"
                    />
                  ) : (
                    <div className="bg-green-500 w-full h-full flex justify-center items-center rounded-full">
                      +
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e: any) => handleAddThumbnail(e.target.files[0])}
                    disabled={loading}
                  />
                </label>
                <div
                  className={`${
                    clicked
                      ? "h-full w-full left-1/2 absolute top-0 z-0 bg-white md:hidden"
                      : "h-0 w-0 left-1/2"
                  } -translate-x-1/2 duration-[1500ms] transition-all `}
                />
                <div
                  className={`flex fixed md:absolute top-[7rem] pb-5 md:top-[14rem] md:bottom-0 -translate-x-1/2 translate-y-1/2 left-1/2 gap-3 justify-center items-center h-max md:h-44 bg-white md:bg-transparent transition duration-1000 ${
                    clicked ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <div className="flex md:flex-row flex-col gap-1 md:gap-3	px-3 md:px-0">
                    <input
                      type="text"
                      className={`${
                        clicked
                          ? "h-16 text-base w-full md:w-48 border-2"
                          : "h-0 text-[0px] border-0 w-0"
                      }
											 rounded-full p-5 text-lg text-ellipsis transition-all duration-1000 border-zinc-100`}
                      disabled={loading}
                      value={newJourney.description}
                      placeholder="Journey description.."
                      onChange={(e: any) =>
                        handleSetDescription(e.target.value)
                      }
                    />

                    <input
                      type="date"
                      className={`${
                        clicked
                          ? "h-16 text-base w-full md:w-max border-2"
                          : "h-0 text-[0px] border-0 w-0"
                      } px-5 rounded-full transition-all duration-1000 border-zinc-100`}
                      onChange={(e) => handleSeperateDate(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <button
                    className={`${
                      clicked
                        ? "w-32 h-16 border-2 opacity-100 text-base"
                        : "w-0 h-0 border-0 opacity-0 text-[0px]"
                    } rounded-full md:hover:w-36 md:hover:h-36 transition-all hover:duration-300  duration-1000 object-cover self-center justify-self-center flex justify-center items-center bg-blue-500 cursor-pointer active:bg-blue-600 hover:bg-blue-600 text-white border-white mr-3 md:mr-0`}
                    disabled={loading}
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          )}
          {isAdmin && <span className="text-white text-base">OR</span>}

          <div
            className={`flex flex-col items-center justify-center w-full ${
              isAdmin ? "md:w-[40rem]" : "w-full"
            }`}
          >
            <p className="px-5 w-full">
              Scroll down to begin the journey of our memories!
            </p>
            <img
              src={arrowColored.src}
              className="w-48 h-48 mt-5 md:mt-12 self-center justify-self-center"
            />
          </div>
        </div>
      </div>
      <div className="w-screen h-full flex justify-center items-center flex-col relative ">
        <img
          src={topBG.src}
          className="absolute w-full h-[100vh] top-0 object-cover pointer-events-none"
        />
        {renderImages()}
      </div>
    </main>
  );
}
