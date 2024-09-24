"use client";

import arrowColored from "../icons/arrowcolored.png";
import bottomBG from "../backgroundImages/bottom.svg";
import topBG from "../backgroundImages/top.svg";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { IoClose } from "react-icons/io5";
export default function Home() {
  const [clicked, setClicked] = useState(false);

  const [isAdmin, setIsAdmin] = useState(true);

  const [loading, setLoading] = useState(false);
  const [tempThumbnail, setTempThumbnail] = useState<any>(null);

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
    storageImageNames: [],
  });

  const [newJourneyRawImages, setNewJourneyRawImages] = useState<string[]>([]);

  const [thumbnail, setThumbnail] = useState<any>();

  const [journeys, setJourneys] = useState<any[]>([]);

  const [now, setNow] = useState(Date.now());

  const [editedDescription, setEditedDescription] = useState("");
  const [maximizedImage, setMaximizedImage] = useState<any>(null);

  const [date, setDate] = useState<string>("");

  const handleSeperateDateOnEdit = (e: any) => {
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

    setJourneys((prev: any) => {
      let list = [...prev];
      list.map((journey: any, index: number) => {
        if (journey.editMode) {
          list[index] = {
            ...list[index],
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
          };
          const updateJourney = async () => {
            const { data, error } = await supabase
              .from("journeys")
              .update({
                journey: journey,
              })
              .eq("id", journey.id);
            if (error) console.log(error);
            console.log(data);
          };

          updateJourney();
        }
      });
      return list;
    });
  };
  const renderImages = () => {
    return journeys.map((journey: any, index: number) => (
      <div
        className={`z-50 flex h-full w-full flex-col items-center justify-center ${
          index == 0 ? "mt-[20rem]" : "mt-0"
        }`}
        key={index}
      >
        <div className="mb-5 flex flex-col items-center justify-center p-3 text-7xl font-extrabold text-white">
          <div className="flex items-center justify-center gap-5 text-base">
            {journey.editMode ? (
              <div>
                <input
                  type="date"
                  className={`h-16 w-full rounded-full border-2 border-zinc-100 px-5 text-base text-slate-500 transition-all duration-1000 md:w-max`}
                  value={
                    date == ""
                      ? `${journey.dateNumber.year}-${journey.dateNumber.month < 10 ? "0" : ""}${journey.dateNumber.month}-${journey.dateNumber.day < 10 ? "0" : ""}${journey.dateNumber.day}`
                      : date
                  }
                  onChange={(e: any) => {
                    handleSeperateDateOnEdit(e.target.value);

                    setDate(e.target.value);
                  }}
                  required
                  disabled={loading}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-5xl text-white">{journey.date.year}</h2>
                <h2 className="text-4xl text-slate-400">
                  {journey.date.month}
                </h2>
                <h2 className="text-3xl text-slate-500">{journey.date.day}</h2>
              </div>
            )}
          </div>
          {journey.description ? (
            <div className="mt-3 text-5xl font-semibold text-slate-500">
              <span className="mr-2 text-slate-600">"</span>
              {journey.editMode ? (
                <input
                  className="p-3 px-5 text-lg"
                  type="text"
                  placeholder={journey.description}
                  value={editedDescription}
                  onChange={(e: any) => setEditedDescription(e.target.value)}
                />
              ) : (
                <span id="handwrite">{journey.description}</span>
              )}
              <span className="ml-2 text-slate-600">"</span>
            </div>
          ) : (
            journey.editMode && (
              <span className="mt-3 flex text-5xl">
                <span className="mr-3 text-slate-600">"</span>
                <input
                  className="p-3 px-5 text-lg text-slate-500"
                  type="text"
                  placeholder={"New Description"}
                  value={editedDescription}
                  onChange={(e: any) => setEditedDescription(e.target.value)}
                />
                <span className="ml-2 text-slate-600">"</span>
              </span>
            )
          )}
          {journey.editMode && (
            <button
              className="mt-3 bg-green-500 p-3 px-5 text-lg hover:bg-green-600 active:bg-green-700"
              onClick={() => handleEditJourney(index, journey.id)}
            >
              Apply Changes
            </button>
          )}
        </div>
        <div className="h-max w-screen rounded-3xl bg-slate-100 p-5 text-white md:h-full md:w-1/2 md:min-w-[450px]">
          <div className="relative flex flex-col">
            <div className="flex flex-wrap justify-center gap-2">
              {journey.editMode && (
                <label
                  className={`flex h-32 w-32 cursor-pointer items-center justify-center rounded-3xl border-2 border-transparent bg-blue-500 text-4xl text-white opacity-100 transition-all duration-1000 hover:border-white hover:border-opacity-40 hover:duration-300`}
                >
                  +
                  <input
                    type="file"
                    accept="image/*"
                    name="images"
                    hidden
                    onChange={(e: any) =>
                      handleAddToTempImages(e.target.files, index)
                    }
                    multiple
                    disabled={loading}
                  />
                </label>
              )}
              {journey.images.map((image: any, imageIndex: number) => (
                <div
                  className={`relative h-32 w-32 rounded-3xl bg-white object-cover transition-all duration-300 ease-in-out ${!journey.editMode ? "hover:flex-grow-[1]" : ""} `}
                  key={imageIndex}
                >
                  <img
                    className={`h-full w-full rounded-3xl bg-white object-cover transition-all duration-300 ease-in-out ${!journey.editMode ? "hover:flex-grow-[1]" : ""}`}
                    src={image}
                    key={imageIndex}
                  />

                  {!journey.editMode ? (
                    <div
                      className={`group absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 rounded-3xl transition-all hover:bg-black/50`}
                    >
                      <button
                        className={`rounded-xl bg-blue-500 p-2 px-4 opacity-0 transition-all hover:bg-blue-600 active:bg-blue-700 group-hover:opacity-100`}
                        onClick={() => {
                          maximizeImage(image);
                        }}
                      >
                        Maximize
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`group absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 rounded-3xl transition-all hover:bg-black/50`}
                    >
                      <button
                        className={`rounded-xl bg-red-500 p-2 px-4 opacity-0 transition-all hover:bg-red-600 active:bg-red-700 group-hover:opacity-100`}
                        onClick={() => {
                          handleRemoveImageFromJourney(index, imageIndex);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              className={`absolute ${journey.editMode ? "-bottom-[10rem]" : "bottom-[-5rem]"} flex items-center justify-center gap-2 self-center transition-all`}
            >
              {isAdmin && (
                <button
                  className="w-[7rem] rounded-lg bg-blue-400 p-3 px-5 text-xl font-semibold text-white hover:bg-blue-500 active:bg-blue-600"
                  onClick={() => handleJourneyEditButton(index)}
                >
                  Edit
                </button>
              )}
              <div
                className={`group relative h-32 w-32 transition-all hover:scale-[1.03]`}
              >
                <img
                  className={`h-full w-full self-center rounded-full border-2 bg-black object-cover transition-all hover:scale-110`}
                  src={
                    tempThumbnail
                      ? URL.createObjectURL(tempThumbnail)
                      : journey.thumbnail + "?" + new Date().getTime()
                  }
                />

                {journey.editMode && (
                  <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 opacity-0 transition-all group-hover:opacity-100">
                    <label className="cursor-pointer rounded-xl bg-blue-500 p-2 px-4 opacity-0 transition-all hover:bg-blue-600 active:bg-blue-700 group-hover:opacity-100">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        name="images"
                        hidden
                        onChange={(e: any) =>
                          handleJourneyEditThumbnail(e.target.files[0])
                        }
                        disabled={loading}
                      ></input>
                    </label>
                  </div>
                )}
              </div>

              {isAdmin && (
                <button
                  className="w-[7rem] rounded-lg bg-red-400 p-3 px-5 text-xl font-semibold text-white hover:bg-red-500 active:bg-red-600"
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
            className="mb-32 mt-24 h-48 w-48 md:mb-12"
          />
        ) : null}
      </div>
    ));
  };
  const handleJourneyEditThumbnail = (image: any) => {
    setTempThumbnail(image);
  };

  const maximizeImage = (image: any) => {
    setMaximizedImage(image);
  };
  const closeMaximizedImage = () => {
    setMaximizedImage(null);
  };

  const handleAddToTempImages = (images: any, journeyID: number) => {
    setJourneys((prev: any) => {
      const list = [...prev];
      list.map((journey: any, index: number) => {
        list[index].rawImages = [];
        if (index == journeyID) {
          Array.from(images).map((image: any) => {
            list[index].rawImages.push(image);
            list[index].images.push(URL.createObjectURL(image));
          });
        }
      });
      return list;
    });
  };

  const handleRemoveImageFromJourney = (journeyID: number, imageID: number) => {
    setJourneys((prev: any) => {
      const list = [...prev];
      list.forEach((journey: any, index: number) => {
        if (index === journeyID) {
          journey.images = journey.images.filter(
            (image: any, imageIndex: number) => imageIndex !== imageID,
          );
          journey.rawImages = journey.rawImages.filter(
            (image: any, imageIndex: number) => imageIndex !== imageID,
          );
          const deleteImageFromDatabase = async () => {
            const fileName: any = journey.storageImageNames[imageID];
            const { data, error } = await supabase.storage
              .from("journey.images")
              .remove(fileName);
            if (error) {
              console.log("Error deleting image: ", error);
            }
            console.log(data, fileName);
          };
          deleteImageFromDatabase();
          journey.storageImageNames.splice(imageID, 1);

          const updateJourney = async () => {
            const { data, error } = await supabase
              .from("journeys")
              .update({
                journey: journey,
                images: journey.images,
                storageImageNames: journey.storageImageNames,
              })
              .eq("id", journey.id);
            if (error) console.log(error);
            console.log(data);
          };

          updateJourney();
        }
      });
      return list;
    });
  };
  useEffect(() => {
    console.log(journeys);
  }, [journeys]);

  const handleEditJourney = async (journeyID: number, actualID: number) => {
    setJourneys((prev: any) => {
      const list = [...prev];
      if (editedDescription != "")
        list[journeyID].description = editedDescription;
      list[journeyID].editMode = false;
      return list;
    });

    if (tempThumbnail) {
      const handleUpdateThumbnail = async () => {
        const fileName = `images/thumbnail_${journeys[journeyID].now}`;
        const { data, error } = await supabase.storage
          .from("journey.images")
          .update(fileName, tempThumbnail, {
            cacheControl: "3600",
            upsert: false,
          });
        if (error) {
          console.log(error);
        }
        console.log(data);
      };
      await handleUpdateThumbnail();

      setTempThumbnail(null);
    }

    let uploadedImageURLs: any = [];

    for (let i = 0; i < journeys[journeyID].rawImages.length; i++) {
      const image = journeys[journeyID].rawImages[i];

      if (image) {
        const fileName = `images/journey_${i + 1 + journeys[journeyID].images.length}_${journeys[journeyID].now}`;
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
            imageURL.data.publicUrl,
          );
          setJourneys((prev: any) => {
            const list = [...prev];
            list[journeyID].storageImageNames =
              list[journeyID].storageImageNames.concat(fileName);
            return list;
          });
        }
      }
    }

    setJourneys((prev: any) => {
      const list = [...prev];
      list[journeyID].images = list[journeyID].images.concat(uploadedImageURLs);

      const updateJourney = async () => {
        const { data, error } = await supabase
          .from("journeys")
          .update({
            journey: list[journeyID],
            storageImageNames: list[journeyID].storageImageNames,
          })
          .eq("id", actualID);
        if (error) console.log(error);
        console.log(data);
      };

      const updateImages = async () => {
        list[journeyID].images = list[journeyID].images.filter(
          (image: any) => !image.startsWith("blob:"),
        );

        const { data, error } = await supabase
          .from("journeys")
          .update({
            images: list[journeyID].images,
          })
          .eq("id", actualID);
        if (error) console.log(error);
        console.log(data);
      };

      updateJourney();
      updateImages();

      return list;
    });
  };

  const handleJourneyEditButton = (journeyID: number) => {
    journeys.map((journey: any) => {
      if (journey.editMode) {
        journey.editMode = false;
      }
    });

    setEditedDescription("");

    return setJourneys((prev: any) => {
      const list = [...prev];
      console.log(list[journeyID]);
      list[journeyID].editMode = !list[journeyID].editMode;
      console.log(journeyID, list[journeyID].editMode);
      return list;
    });
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
      for (let i = 0; i < journeys[indexId].storageImageNames.length; i++) {
        const prefix: any = journeys[indexId].storageImageNames[i];

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
    setJourneys([]);
    const { data, error } = await supabase
      .from("journeys")
      .select("*")
      .order("id", { ascending: true });
    if (error) {
      console.log(error);
    } else {
      data.map((data: any) => {
        setJourneys((prev: any) => {
          let list = data.journey;
          list.images = data.images;
          list.thumbnail = data.thumbnail;
          list.now = data.now;
          list.id = data.id;
          list.editMode = false;
          list.rawImages = [];
          list.storageImageNames = data.storageImageNames;
          console.log(list);
          return [...prev, list];
        });
      });
    }
  };

  const handlePostJourney = async () => {
    setNow(Date.now());
    console.log("posting, ", newJourney);

    const uploadJourney = async (
      images: any,
      thumbnail: any,
      storageImageNames: any,
    ) => {
      const { data, error } = await supabase.from("journeys").insert({
        journey: newJourney,
        now,
        images,
        thumbnail,
        storageImageNames,
      });
      if (error) {
        console.log(error);
      } else {
        setLoading(false);
      }
    };

    let uploadedImageURLs: any = [];
    let storageImageNames: any = [];
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
          imageURL.data.publicUrl,
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
            storageImageNames.push(fileName);
            console.log(
              `Image ${i + 1} uploaded successfully:`,
              imageURL.data.publicUrl,
            );
          }
        }
      }

      await uploadJourney(uploadedImageURLs, thumbnailURL, storageImageNames);
    };
    await uploadImages();

    setJourneys((prev: any) => [...prev, newJourney]);

    setNewJourneyRawImages([]);

    getJourneys();
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
      storageImageNames: [],
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
    <main className="flex h-full select-none flex-col items-center justify-center">
      <div className="relative h-[100vh] w-screen">
        {maximizedImage && (
          <div className="fixed z-[1000] flex h-screen w-screen items-center justify-center">
            <div
              className="fixed z-[999] h-full w-full bg-black/80"
              onClick={() => closeMaximizedImage()}
            />
            <div
              className="text-yellow absolute right-8 top-5 z-[1111] cursor-pointer text-5xl font-extrabold text-white"
              onClick={() => closeMaximizedImage()}
            >
              <IoClose />
            </div>
            <img src={maximizedImage} className="z-[1000] h-max w-max" />
          </div>
        )}

        <img
          src={bottomBG.src}
          className="pointer-events-none relative h-full w-full object-cover"
        />
        <div className="absolute left-1/2 top-[40%] z-[100] flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5 text-center text-5xl font-semibold text-slate-500 lg:flex-row lg:gap-10">
          {isAdmin && (
            <form
              className="flex items-center justify-center gap-5"
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
                className={`text-white ${
                  clicked ? "opacity-0" : "left-1/2 opacity-100"
                } z-[200] flex transition-all duration-150 ease-in-out`}
                onClick={(e) => handleAddButton(e)}
              >
                <button className="rounded-lg bg-green-400 p-3 px-5 text-xl font-semibold text-white hover:bg-green-500 active:bg-green-600">
                  Add Memory
                </button>
              </div>
              {loading && (
                <div className="loader absolute z-[100] h-full w-full"></div>
              )}
              <div className="fixed bottom-48 left-0 right-0 top-0 -translate-y-1/2 sm:bottom-5 md:bottom-12 lg:relative lg:-translate-y-0">
                <div
                  className={`relative ${
                    clicked
                      ? "min-w-screen max-w-screen h-screen bg-white lg:h-[25rem] lg:min-w-[36rem] lg:max-w-[45rem] lg:bg-[rgba(255,255,255,0.3)]"
                      : "h-0 w-0 overflow-hidden overflow-y-hidden bg-[rgba(255,255,255,0.0)]"
                  } flex flex-wrap overflow-y-auto rounded-xl p-3 transition-all duration-700`}
                >
                  <div className="flex h-max w-full flex-wrap items-start justify-start gap-2 overflow-y-auto md:w-max">
                    <label
                      className={`${
                        clicked
                          ? "h-32 w-full text-4xl opacity-100 md:w-32"
                          : "h-0 w-0 text-[0px] opacity-0"
                      } mt-[21rem] flex cursor-pointer items-center justify-center rounded-lg border-2 border-transparent bg-blue-500 text-white transition-all duration-1000 hover:border-white hover:border-opacity-40 hover:duration-300 md:mt-0`}
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
                          clicked ? "h-32 w-32" : "h-0 w-0"
                        } flex cursor-pointer items-center justify-center rounded-lg border-2 border-transparent bg-blue-500 bg-transparent object-cover text-white transition-all duration-300 hover:border-white hover:border-opacity-40 hover:bg-[rgba(255,255,255,0.2)] hover:duration-300`}
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
                  className={`absolute left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:top-[0%] md:flex ${
                    clicked
                      ? `${
                          newJourney.thumbnail ? "h-36 w-36" : "h-16 w-32"
                        } h-16 border-2 text-3xl opacity-100`
                      : "h-0 w-0 border-0 text-[0px] opacity-0"
                  } rounded-full ${
                    newJourney.thumbnail
                      ? "hover:h-32 hover:w-32"
                      : "hover:h-36 hover:w-36"
                  } flex cursor-pointer items-center justify-center self-center justify-self-center border-white bg-white object-cover text-white transition-all duration-1000 hover:duration-300`}
                >
                  {newJourney.thumbnail ? (
                    <img
                      src={newJourney.thumbnail}
                      className="flex h-full w-full items-center justify-center rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-green-500">
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
                  className={`absolute left-1/2 top-[35%] z-10 -translate-x-1/2 -translate-y-1/2 md:hidden ${
                    clicked
                      ? `${
                          newJourney.thumbnail ? "h-36 w-36" : "h-32 w-32"
                        } h-16 border-2 text-3xl opacity-100`
                      : "h-0 w-0 border-0 text-[0px] opacity-0"
                  } rounded-full ${
                    newJourney.thumbnail
                      ? "hover:h-32 hover:w-32"
                      : "hover:h-36 hover:w-36"
                  } flex cursor-pointer items-center justify-center self-center justify-self-center border-white object-cover text-white transition-all duration-1000 hover:duration-300`}
                >
                  {newJourney.thumbnail ? (
                    <img
                      src={newJourney.thumbnail}
                      className="flex h-full w-full items-center justify-center rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-green-500">
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
                      ? "absolute left-1/2 top-0 z-0 h-full w-full bg-white md:hidden"
                      : "left-1/2 h-0 w-0"
                  } -translate-x-1/2 transition-all duration-[1500ms]`}
                />
                <div
                  className={`fixed left-1/2 top-[7rem] flex h-max -translate-x-1/2 translate-y-1/2 items-center justify-center gap-3 bg-white pb-5 transition duration-1000 md:absolute md:bottom-0 md:top-[14rem] md:h-44 md:bg-transparent ${
                    clicked ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-1 px-3 md:flex-row md:gap-3 md:px-0">
                    <input
                      type="text"
                      className={`${
                        clicked
                          ? "h-16 w-full border-2 text-base md:w-48"
                          : "h-0 w-0 border-0 text-[0px]"
                      } text-ellipsis rounded-full border-zinc-100 p-5 text-lg transition-all duration-1000`}
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
                          ? "h-16 w-full border-2 text-base md:w-max"
                          : "h-0 w-0 border-0 text-[0px]"
                      } rounded-full border-zinc-100 px-5 transition-all duration-1000`}
                      onChange={(e) => handleSeperateDate(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <button
                    className={`${
                      clicked
                        ? "h-16 w-32 border-2 text-base opacity-100"
                        : "h-0 w-0 border-0 text-[0px] opacity-0"
                    } mr-3 flex cursor-pointer items-center justify-center self-center justify-self-center rounded-full border-white bg-blue-500 object-cover text-white transition-all duration-1000 hover:bg-blue-600 hover:duration-300 active:bg-blue-600 md:mr-0 md:hover:h-36 md:hover:w-36`}
                    disabled={loading}
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          )}
          {isAdmin && <span className="text-base text-white">OR</span>}

          <div
            className={`flex w-full flex-col items-center justify-center ${
              isAdmin ? "md:w-[40rem]" : "w-full"
            }`}
          >
            <p className="w-full px-5">
              Scroll down to begin the journey of our memories!
            </p>
            <img
              src={arrowColored.src}
              className="mt-5 h-48 w-48 self-center justify-self-center md:mt-12"
            />
          </div>
        </div>
      </div>
      <div className="relative flex h-full w-screen flex-col items-center justify-center">
        <img
          src={topBG.src}
          className="pointer-events-none absolute top-0 h-[100vh] w-full object-cover"
        />
        {renderImages()}
      </div>
    </main>
  );
}
