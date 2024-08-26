import { supabase } from "@/app/lib/supabase";
import { redirect } from "next/dist/server/api-utils";
import React, { useEffect, useState } from "react";

export default function BannerManagement() {
  const [banners, setBanners] = useState<any>([]);
  const [now, setNow] = useState(Date.now());
  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState<any>([]);

  const getCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) return console.log(error);
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleIsPublicChange = async (index: number) => {
    const { data, error } = await supabase
      .from("banners")
      .update({ is_public: !banners[index].is_public })
      .eq("id", banners[index].id);

    if (data) console.log(data);
    else console.log(error);

    setBanners((prev: any) => {
      const newBanners = [...prev];
      newBanners[index].is_public = !banners[index].is_public;
      console.log(newBanners[index]);
      return newBanners;
    });
  };

  const postBanner = async (image: any) => {
    if (image) {
      setNow(Date.now());
      const fileName = `images/banner_${now}`;
      const { data, error } = await supabase.storage
        .from("banners")
        .upload(fileName, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.log("Error uploading thumbnail:", error);
      } else {
        const imageURL = supabase.storage
          .from("banners")
          .getPublicUrl(fileName);

        const upload = await supabase.from("banners").insert({
          redirect_to: "/",
          image: imageURL.data.publicUrl,
          now,
        });

        console.log(
          "Banner uploaded successfully:",
          imageURL.data.publicUrl,
          upload
        );
      }
    }
    getBanners();
  };

  const handleOnDrop = (e: any, index: number) => {
    setDragging(false);
    e.preventDefault();

    const targetIndex = index;
    const bannerIndex = e.dataTransfer.getData("index");
    const parsedBannerIndex = parseInt(bannerIndex);

    setBanners((prev: any) => {
      const newBanners: any[] = [...prev];

      [newBanners[parsedBannerIndex], newBanners[targetIndex]] = [
        newBanners[targetIndex],
        newBanners[parsedBannerIndex],
      ];

      newBanners.forEach((banner: any, index: number) => {
        banner.orderIndex = index;
      });

      console.log("Updated newBanners:", newBanners);
      return newBanners;
    });

    setTimeout(() => {
      updateBanners();
    }, 0);
  };

  const updateBanners = async () => {
    const updates = banners.map((banner: any, index: number) => {
      return supabase
        .from("banners")
        .update({ orderIndex: banner.orderIndex })
        .eq("id", banner.id);
    });

    try {
      await Promise.all(updates);
      console.log("Successfully updated banners order in the database.");
    } catch (error) {
      console.log("Error updating banners order:", error);
    }
  };

  const getBanners = async () => {
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("orderIndex", { ascending: true });
    if (error) return console.log(error);

    let tempBanners: any = [];

    data.map((banner: any, index: number) => {
      return tempBanners.push(banner);
    });

    setBanners(tempBanners);
    console.log(tempBanners);
  };

  useEffect(() => {
    getBanners();
  }, []);

  const renderCategoriesOptions = () => {
    return categories.map((category: any) => (
      <option value={category.name}>{category.name}</option>
    ));
  };

  const handleCategoryChange = async (e: any, index: number) => {
    const { data, error } = await supabase
      .from("banners")
      .update({ redirect_to: e })
      .eq("id", banners[index].id);

    if (data) console.log(data);
    else console.log(error);

    setBanners((prev: any) => {
      const newBanners = [...prev];
      newBanners[index].redirect_to = e;
      console.log(newBanners[index]);
      return newBanners;
    });
  };

  const handleUpdateImage = async (index: number, image: any) => {
    let newImageText = banners[index].image;
    for (let index = newImageText.length; index > 0; index--) {
      if (newImageText[index] === "?") {
        newImageText = newImageText.slice(0, index);
        break;
      }
    }

    const updatedThumbnail = `${newImageText}?t=${new Date().getTime()}`;

    const fileName = `images/banner_${banners[index].now}`;
    const { data, error } = await supabase.storage
      .from("banners")
      .update(fileName, image, {
        cacheControl: "3600",
        upsert: false,
      });

    setTimeout(async () => {
      const { data, error } = await supabase
        .from("banners")
        .update({ image: updatedThumbnail })
        .eq("id", banners[index].id);

      if (error) {
        console.log("Error updating image:", error);
      } else {
        console.log("Banner updated successfully:");
        getBanners();
      }
    }, 0);

    if (error) {
      console.log("Error updating image:", error);
    } else {
      console.log("Banner updated successfully:");
    }
  };

  const handleDeleteBanner = async (index: number) => {
    const { data, error } = await supabase
      .from("banners")
      .delete()
      .eq("id", banners[index].id);
    if (data) {
      console.log(data);
      getBanners();
    } else {
      console.log(error);
    }

    setBanners((prev: any) => {
      const newBanners = [...prev];
      newBanners.splice(index, 1);
      return newBanners;
    });
  };

  const renderMainBanners = () => {
    return (
      <div className="w-full h-full justify-center items-center flex flex-col">
        <div className="flex justify-center items-center gap-5">
          <div className="flex gap-5">
            <label className="w-52 h-16 bg-blue-500 text-white text-lg flex justify-center items-center cursor-pointer">
              Choose File
              <input
                type="file"
                onChange={(e: any) => {
                  postBanner(e.target.files[0]);
                }}
                className="sr-only"
                accept="image/*"
              />
            </label>
          </div>
        </div>
        <div className="flex gap-5 flex-wrap overflow-y-auto justify-center items-center mt-10 px-[10rem] w-full">
          {banners.map((banner: any, index: number) => {
            return (
              <div
                key={banner?.id + index + banner?.now}
                className={`flex justify-center items-center bg-white w-52 hover:${
                  dragging ? "w-52" : "w-96"
                } transition-width duration-300 ease-in-out flex-col`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  handleOnDrop(e, index);
                }}
              >
                <div
                  className={`w-full h-10 bg-indigo-500 text-white font-semibold text-xl flex justify-center items-center`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    handleOnDrop(e, index);
                  }}
                >
                  {index + 1}
                </div>
                <img
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "banner",
                      JSON.stringify(banners[index])
                    );
                    e.dataTransfer.setData("type", "main");
                    e.dataTransfer.setData("index", index.toString());
                    setDragging(true);
                  }}
                  src={banner?.image}
                  key={banner?.id + index + banner?.now}
                  className="w-full h-52 object-contain py-5"
                />
                <div className="w-full h-full text-black flex justify-center items-center bg-slate-100 p-2 ">
                  <select
                    value={banner?.redirect_to}
                    className="w-full flex justify-center items-center h-8 px-1"
                    onChange={(e) =>
                      handleCategoryChange(e.target.value, index)
                    }
                  >
                    <option value="/">Redirect To</option>
                    {renderCategoriesOptions()}
                  </select>
                </div>
                <div className="w-full h-full text-black flex justify-center items-center bg-slate-100 p-2 ">
                  <div
                    className={`bg-${
                      banner?.is_public ? "green" : "red"
                    }-500 rounded-full w-[1.10rem] h-[.95rem] mr-2`}
                  />
                  <select
                    value={banner?.is_public ? "true" : "false"}
                    className="w-full flex justify-center items-center h-8 px-1"
                    onChange={() => handleIsPublicChange(index)}
                  >
                    <option value="true">Public</option>
                    <option value="false">Private</option>
                  </select>
                </div>
                <div className="w-full flex justify-center items-center [&_button]:w-full [&_button]:p-3">
                  <button className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700">
                    <label className="cursor-pointer">
                      Update
                      <input
                        type="file"
                        onChange={(e: any) => {
                          handleUpdateImage(index, e.target.files[0]);
                        }}
                        className="sr-only"
                        accept="image/*"
                      />
                    </label>
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 active:bg-red-700"
                    onClick={() => handleDeleteBanner(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      {renderMainBanners()}
    </div>
  );
}
