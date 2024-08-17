import { supabase } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack, IoMdCloseCircle } from "react-icons/io";
import { TbCircleArrowDownFilled } from "react-icons/tb";
export default function AddProduct({ setPage, getProducts }: any) {
  const [isPublic, setIsPublic] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const addSubCategoryText = "Add Sub Category";
  const [subCategoriesToSelect, setSubCategoriesToSelect] = useState<any>([]);
  const [newSubCategories, setNewSubCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  const [subCategoryName, setSubCategoryName] = useState<string>("");

  const [thumbnail, setThumbnail] = useState<any>(null);
  const [images, setImages] = useState<any>([]);

  const handleFileChange = (e: any) => {
    const image = e.target.files[0];

    setThumbnail(URL.createObjectURL(image));
  };

  const getSubCategories = async () => {
    const { data, error } = await supabase.from("sub_categories").select("*");

    if (error) return console.log(error);

    const uniqueCategories = new Set(data.map((item: any) => item.name));
    setSubCategoriesToSelect(Array.from(uniqueCategories));
  };
  const postSubCategory = async (name: any) => {
    const { data, error } = await supabase
      .from("sub_categories")
      .insert([{ name: name }]);

    if (error) return console.log(error);
    if (data) console.log(data);
  };
  const postProduct = async () => {
    const { data, error } = await supabase.from("products").insert([
      {
        name: productName,
        price,
        is_public: isPublic,
        sub_categories: subCategories,
      },
    ]);

    if (error) return console.log(error);
    if (data) console.log(data);
  };
  const preventFormSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleAddSubCategoryValues = () => {
    return subCategoriesToSelect.map((subCategory: any) => (
      <option key={subCategory} value={subCategory}>
        {subCategory}
      </option>
    ));
  };
  const handleAddSubCategory = (category: string) => {
    if (!subCategories.includes(category)) {
      setSubCategories((prev: any) => [...prev, category]);
      setNewSubCategories((prev: any) => [...prev, category]);
    } else {
      console.log("Category already exists");
    }
  };
  const handleSubmitSubCategories = () => {
    console.log(subCategories, newSubCategories);

    newSubCategories.map((category: string) => {
      if (!subCategoriesToSelect.includes(category) && category !== "") {
        postSubCategory(category);
      }
    });
  };
  const handleRemoveSubCategory = (category: string) => {
    setSubCategories(
      subCategories.filter((subCategory: any) => subCategory !== category)
    );
  };
  const handleRenderSubCategories = () => {
    return subCategories.map((subCategory: any) => (
      <div className="flex h-8" key={subCategory}>
        <div className="bg-blue-500 hover:bg-blue-600 p-1 px-3 pr-2 text-white w-max h-full rounded-lg rounded-r-none flex transition justify-center items-center">
          <div>{subCategory}</div>
        </div>
        <div className="h-full w-[2px] bg-blue-600"></div>
        <div
          className="bg-blue-500 hover:bg-rose-500 text-rose-500 active:bg-rose-600 h-full w-max p-1 px-1 rounded-r-lg transition flex justify-center items-center text-2xl relative"
          onClick={() => {
            handleRemoveSubCategory(subCategory);
          }}
        >
          <div className="z-[11]">
            <IoMdCloseCircle />
          </div>
          <div className="bg-white w-3 h-3 fixed z-[10]"></div>
        </div>
      </div>
    ));
  };
  useEffect(() => {
    getSubCategories();
  }, []);

  const checkBeforePost = () => {
    return images.map((image: any) => {
      return image.thumbnail == null && handleRemoveImage(image.id);
    });
  };

  const postImages = async () => {
    checkBeforePost();

    images.forEach(async (element: any) => {});
  };

  const handleUpdateImage = (index: number, image: any) => {
    const newImages = [...images];
    newImages[index].id = index;
    newImages[index].thumbnail = URL.createObjectURL(image);
    newImages[index].rawImage = image;
    setImages(newImages);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleRenderAddImagesButtons = () => {
    const addImageSchema = (
      <div
        className="w-32 h-32 object-cover rounded-full flex justify-center items-center text-6xl border-slate-300 border-4 bg-slate-200 text-slate-400 text-center select-none cursor-pointer hover:bg-slate-300 transition hover:border-slate-400 hover:text-slate-500"
        onClick={() => {
          setImages([...images, { thumbnail: null, id: images.length }]);
          console.log(images);
        }}
      >
        +
      </div>
    );
    return (
      <>
        {images.map((image: any, index: number) => (
          <div
            className="flex flex-col justify-center items-center gap-3"
            key={index}
          >
            {image.thumbnail ? (
              <div className="relative">
                <img
                  src={image.thumbnail}
                  className="relative w-32 h-32 object-cover rounded-full"
                />
                <div
                  className="absolute top-0 rounded-full w-full h-full hover:bg-[rgba(239,68,68,0.5)] transition text-white text-5xl flex justify-center items-center hover:[div_&]:text-white [div_&]:text-transparent select-none cursor-pointer"
                  onClick={() => handleRemoveImage(index)}
                >
                  <div className="text-5xl">-</div>
                </div>
              </div>
            ) : (
              <div
                className="relative w-32 h-32 flex justify-center items-center bg-slate-100 rounded-full text-6xl text-slate-500  text-center hover:bg-[rgba(239,68,68,0.5)] transition hover:[div_&]:text-white select-none cursor-pointer"
                onClick={() => handleRemoveImage(index)}
              >
                <div className="text-5xl">{index + 1}</div>
              </div>
            )}
            <label
              htmlFor={"file-upload" + index}
              className="flex items-center w-max p-2 gap-3 text-sm px-4 rounded-full bg-purple-600 text-white border-0 cursor-pointer hover:bg-purple-700 transition"
            >
              <div className="space-y-2 flex justify-center items-center w-full">
                <h4 className="text-sm text-white flex justify-center items-center w-full">
                  Choose File
                </h4>
              </div>
              <input
                id={"file-upload" + index}
                type="file"
                accept=".png, .jpg"
                onChange={(e) => handleUpdateImage(index, e.target.files![0])}
                className="sr-only"
                required
              />
            </label>
          </div>
        ))}
        {images.length < 3 && addImageSchema}
      </>
    );
  };

  return (
    <div className="flex flex-col gap-3 text-black">
      <div className="text-3xl text-white font-extrabold flex items-center gap-3">
        <div
          className="rounded-full p-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition flex justify-center items-center cursor-pointer"
          onClick={() => setPage("")}
        >
          <IoMdArrowRoundBack />
        </div>
        <div>Create Product</div>
      </div>
      <div className="flex gap-3">
        <form
          className="flex gap-3 w-full"
          onSubmit={(e: any) => {
            e.preventDefault();
            postProduct();
            handleSubmitSubCategories();
            setPage("");
            getProducts();
          }}
        >
          <div className="flex flex-col gap-2 w-max">
            <div className="flex gap-3">
              <div className="flex w-max">
                <div className="h-full w-10 bg-violet-500 p-3 flex justify-center items-center text-white rounded-l-lg">
                  <p className="rotate-[-90deg]">Thumbnail</p>
                </div>
                <div className="flex flex-col gap-3 bg-white p-3 rounded-r-lg justify-center items-start w-max">
                  <div className="flex flex-col justify-center items-center gap-3">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        className="w-32 h-32 object-cover rounded-full"
                      />
                    ) : (
                      <label className="w-32 h-32 object-cover rounded-full flex justify-center items-center text-6xl border-slate-300 border-4 bg-slate-200 text-slate-400 text-center select-none cursor-pointer hover:bg-slate-300 transition hover:border-slate-400 hover:text-slate-500">
                        +
                        <input
                          type="file"
                          id="file-upload"
                          accept="image/*"
                          onChange={(e: any) => handleFileChange(e)}
                          className="sr-only"
                          required
                        />
                      </label>
                    )}
                    <label
                      htmlFor="file-upload"
                      className="flex items-center w-max p-2 gap-3 text-sm px-4 rounded-full bg-violet-600 text-white border-0 cursor-pointer hover:bg-violet-700 transition"
                    >
                      <div className="space-y-2 flex justify-center items-center w-full">
                        <h4 className="text-sm text-white flex justify-center items-center w-full">
                          Choose File
                        </h4>
                      </div>
                      <input
                        type="file"
                        id="file-upload"
                        name="file"
                        accept="image/*"
                        onChange={(e: any) => handleFileChange(e)}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex w-max">
                <div className="h-full w-10 bg-purple-500 p-3 flex justify-center items-center text-white rounded-l-lg">
                  <p className="rotate-[-90deg]">Images</p>
                </div>
                <div className="flex gap-3 bg-white p-3 rounded-r-lg justify-start items-center w-full flex-nowrap flex-row overflow-x-auto">
                  <div className="w-full overflow-x-auto flex gap-5">
                    {handleRenderAddImagesButtons()}
                  </div>
                </div>
              </div>
            </div>

            <input
              type="text"
              placeholder="Product Name"
              className="p-3 px-5 rounded-md"
              required
              onChange={(e: any) => setProductName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className="p-3 px-5 rounded-md"
              min={0}
              required
              onChange={(e: any) => setPrice(e.target.value)}
            />
            <div className="flex">
              <input
                type="text"
                placeholder="Create Sub Category"
                className="p-3 px-5 rounded-md w-full"
                onChange={(e) => setSubCategoryName(e.target.value)}
                value={subCategoryName}
                onKeyDown={(e) => {
                  preventFormSubmit(e);
                  if (e.key === "Enter" && subCategoryName !== "") {
                    setSubCategoryName("");
                    handleAddSubCategory(subCategoryName);
                  }
                }}
              />
              <span className="text-white px-5 flex h-full justify-center items-center">
                OR
              </span>
              <select
                className="p-3 px-5 rounded-md text-black w-full"
                onChange={(e: any) => {
                  if (e.target.value !== addSubCategoryText) {
                    handleAddSubCategory(e.target.value);
                  }
                }}
              >
                <option>{addSubCategoryText}</option>
                {handleAddSubCategoryValues()}
              </select>
            </div>
            <select
              className="p-3 px-5 rounded-md text-black w-full"
              onChange={(e: any) => {
                e.target.value === "Public"
                  ? setIsPublic(true)
                  : setIsPublic(false);
              }}
            >
              <option>Public</option>
              <option>Private</option>
            </select>
            <button
              className="text-white bg-green-500 p-3 w-full h-12 rounded-lg border-b-[3px] border-b-green-600 active:border-b-0 active:bg-green-700 hover:bg-green-600 hover:border-green-700 transition"
              onClick={() => {}}
            >
              Create
            </button>
          </div>
          <div className="w-96 h-max">
            <div className="text-white flex justify-center items-center bg-blue-600 p-3 rounded-lg rounded-b-none font-extrabold">
              Sub Categories
            </div>
            <div className="bg-white p-3 rounded-b-lg cursor-default flex flex-wrap gap-1">
              {subCategories.length === 0 && (
                <div className="text-center w-full">No sub categories.</div>
              )}
              {handleRenderSubCategories()}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
