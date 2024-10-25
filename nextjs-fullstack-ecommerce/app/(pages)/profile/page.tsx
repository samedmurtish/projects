"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { logout } from "../lib/logout";
import { useRouter } from "next/navigation";
import { FcAddImage } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
export default function UserProfile() {
  const [user, setUser] = useState<any>();
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [pages, setPages] = useState<any>([
    {
      name: "Overview",
      active: true,
    },
    {
      name: "Edit Profile",
      active: false,
    },
    {
      name: "My Orders",
      active: false,
    },
    {
      name: "My Reviews",
      active: false,
    },
    {
      name: "Favorites",
      active: false,
    },
    {
      name: "Cart",
      active: false,
    },
  ]);

  useEffect(() => {
    console.log(user);
  }, [user]);
  const [now, setNow] = useState(Date.now());
  const updateProfile = async (e: any) => {
    e.preventDefault();
    setPages((prev: any) => {
      return prev.map((item: any) => {
        return { ...item, active: item.name === "Overview" };
      });
    });
    console.log(user);
    if (profilePicture) {
      if (user.profile_picture) {
        const fileName = `images/profile_${user.now}`;
        const { data, error } = await supabase.storage
          .from("user.images")
          .update(fileName, profilePicture, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.log("Error updating profile:", error);
        }
        if (data) {
          console.log(data);
        }
      } else {
        const fileName = `images/profile_${now}`;
        const { data, error } = await supabase.storage
          .from("user.images")
          .upload(fileName, profilePicture, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.log("Error uploading profile:", error);
        } else {
          const imageURL = supabase.storage
            .from("user.images")
            .getPublicUrl(fileName);
          const { data, error } = await supabase
            .from("user_data")
            .update({ profile_picture: imageURL.data.publicUrl, now })
            .eq("id", user.id);

          if (error) {
            console.log("Error updating profile:", error);
          }
          if (data) {
            console.log(data);
          }

          console.log(
            "Profile Picture uploaded successfully:",
            imageURL.data.publicUrl
          );
        }
      }
    }

    if (changePassword) {
      if (oldPassword == user.password && oldPassword != newPassword) {
        if (newPassword) {
          const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
          });

          if (error) {
            return alert(error.message);
          }

          if (data) {
            console.log(data);
          }
        }

        if (username) {
          const { data, error } = await supabase.auth.updateUser({
            data: { username },
          });

          if (error) {
            return alert(error.message);
          }

          if (data) {
            console.log(data);
          }
        }
        console.log(user);

        setUser((prev: any) => {
          const updatedUser = {
            ...user,
            username: username ? username : user.username,
            password: newPassword ? newPassword : user.password,
          };

          localStorage.setItem("user", JSON.stringify(updatedUser));
          const updatedToken = JSON.parse(localStorage.getItem("token")!);
          updatedToken.user.user_metadata.username = username
            ? username
            : user.username;
          localStorage.setItem("token", JSON.stringify(updatedToken));

          console.log(updatedUser, updatedToken);

          return updatedUser;
        });

        window.location.reload();
      } else {
        return alert("Old password is incorrect!");
      }
    } else {
      if (oldPassword == user.password) {
        if (username) {
          const { data, error } = await supabase.auth.updateUser({
            data: { username },
          });

          if (error) {
            return alert(error.message);
          }

          if (data) {
            console.log(data);
          }
        }

        setUser((prev: any) => {
          const updatedUser = {
            ...user,
            username: username ? username : user.username,
          };

          localStorage.setItem("user", JSON.stringify(updatedUser));
          const updatedToken = JSON.parse(localStorage.getItem("token")!);
          updatedToken.user.user_metadata.username = username
            ? username
            : user.username;
          localStorage.setItem("token", JSON.stringify(updatedToken));

          return updatedUser;
        });

        //window.location.reload();
      } else {
        return alert("Password is incorrect!");
      }
    }
  };
  const renderOverview = () => {
    return (
      <div className="flex items-center text-slate-700 p-10 gap-10 h-max	w-full flex-wrap">
        <div className="w-[10rem] h-full flex justify-center flex-col items-center gap-2">
          <div className="text-[7rem] w-32 h-32 flex hover:text-[6rem] transition-all hover:mt-2 cursor-pointer rounded-full p-5 border-slate-400 bg-black/5 text-white overflow-hidden">
            {user?.profile_picture ? (
              <img
                src={user?.profile_picture + "?t=" + Date.now()}
                className="w-full object-cover h-full scale-[1.5]"
              />
            ) : (
              <span className="">
                <FaUser />
              </span>
            )}
          </div>
          {user?.profile_picture == null && <p>No Image.</p>}
        </div>
        <div className="text-slate-700 flex flex-col gap-2">
          <div>
            <h1 className="text-sm bg-slate-500 w-max px-3 py-1 rounded-lg text-white">
              Username:
            </h1>
            <span className="pl-3">{user?.username}</span>
          </div>
          <div>
            <h1 className="text-sm bg-slate-500 w-max px-3 py-1 rounded-lg text-white">
              Email:
            </h1>
            <span className="pl-3">{user?.email}</span>
          </div>
          <button
            className="p-2 px-5 w-max rounded-lg bg-blue-500 flex justify-center items-center cursor-pointer hover:bg-blue-600 transition active:bg-blue-700 text-white"
            onClick={() => {
              setPages((prev: any) => {
                return prev.map((item: any) => {
                  return { ...item, active: item.name === "Edit Profile" };
                });
              });
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
    );
  };

  const renderEditProfile = () => {
    return (
      <form
        className="flex items-center text-slate-700 p-10 gap-10 h-max	w-full flex-wrap"
        onSubmit={(e: any) => updateProfile(e)}
      >
        <div className="w-[10rem] h-full flex justify-center flex-col items-center gap-2">
          <label className="text-[7rem] object-cover w-32 h-32 flex hover:text-[6rem] transition-all hover:mt-2 cursor-pointer rounded-full p-5 border-slate-400 bg-black/5 text-white overflow-hidden">
            <input
              type="file"
              onChange={(e: any) => setProfilePicture(e.target.files[0])}
              className="hidden"
              accept="image/*"
              name="image"
            />
            {profilePicture ? (
              <img
                src={URL.createObjectURL(profilePicture)}
                className="w-full object-cover h-full scale-[1.5]"
              />
            ) : user?.profile_picture ? (
              <img
                src={user?.profile_picture + "?t=" + Date.now()}
                className="w-full object-cover h-full scale-[1.5]"
              />
            ) : (
              <FcAddImage />
            )}
          </label>
        </div>
        <div className="text-slate-700 flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-sm bg-slate-500 w-max px-3 py-1 rounded-lg text-white">
              Username:
            </h1>
            <input
              className="px-5 p-2 border-2 rounded-xl ml-2"
              placeholder={user?.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {changePassword ? (
            <>
              <div className="flex flex-col gap-2">
                <h1 className="text-sm bg-slate-500 w-max px-3 py-1 rounded-lg text-white">
                  Old Password:
                </h1>
                <input
                  className="px-5 p-2 border-2 rounded-xl ml-2"
                  type="password"
                  placeholder={"•••••••"}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-sm bg-slate-500 w-max px-3 py-1 rounded-lg text-white">
                  New Password:
                </h1>
                <input
                  className="px-5 p-2 border-2 rounded-xl ml-2"
                  type="password"
                  placeholder={"•••••••"}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <button
                className="p-2 px-5 w-max rounded-lg bg-sky-500 flex justify-center items-center cursor-pointer hover:bg-sky-600 transition active:bg-sky-700 text-white"
                onClick={(e: any) => {
                  e.preventDefault();
                  setChangePassword(true);
                }}
              >
                Change Password
              </button>
              <div className="flex flex-col gap-2">
                <h1 className="text-sm bg-slate-500 w-max px-3 py-1 rounded-lg text-white">
                  Password:
                </h1>
                <input
                  className="px-5 p-2 border-2 rounded-xl ml-2"
                  type="password"
                  placeholder={"•••••••"}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            </>
          )}
          <button className="p-2 px-5 w-max rounded-lg bg-green-500 flex justify-center items-center cursor-pointer hover:bg-green-600 transition active:bg-green-700 text-white">
            Apply Changes
          </button>
        </div>
      </form>
    );
  };
  const renderMyOrders = () => {
    return <>MyOrders</>;
  };
  const renderFavorites = () => {
    return <>Favorites</>;
  };
  const renderCart = () => {
    return <>Cart</>;
  };
  const renderMyReviews = () => {
    return <>MyReviews</>;
  };

  const renderButtons = () => {
    return pages.map((page: any, index: any) => {
      return (
        <button
          className={`p-3 hover:bg-sky-400 active:bg-sky-600 hover:text-white w-full text-start transition ${
            page.active ? "pl-10 bg-sky-500 text-white" : "px-5"
          } ${index === 0 && "rounded-tl-xl"} transition-all`}
          key={page.name + index}
          onClick={() => {
            setPages((prev: any) => {
              return prev.map((item: any) => {
                return { ...item, active: item.name === page.name };
              });
            });
          }}
        >
          {page.name}
        </button>
      );
    });
  };

  useEffect(() => {
    const userData = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : null;

    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    if (userData && token) {
      setUser({
        ...(JSON.parse(userData)[0]
          ? JSON.parse(userData)[0]
          : JSON.parse(userData)),
        username: JSON.parse(token).user.user_metadata.username,
      });
    } else {
      router.push("/login");
    }
  }, []);

  return (
    user && (
      <div className="w-3/4 mx-auto my-0 flex h-full md:mt-[2rem] justify-center items-center ">
        <div className="rounded-lg bg-white shadow-2xl w-screen h-screen md:w-[50rem] md:pt-0 pt-[10rem] md:min-w-[32rem] md:h-[70vh] md:min-h-[30rem] md:max-h-max">
          <div className="flex h-full w-full flex-row">
            {/* flex-col */}
            <div className="flex flex-col items-start h-full justify-between min-w-[10rem] w-[15rem] border-r-2 border-slate-300">
              <div className="w-full flex flex-col">{renderButtons()}</div>
              <div className="w-full flex flex-col justify-center items-center text-center">
                <button
                  className="p-3 px-5 hover:bg-rose-600 bg-rose-500 active:bg-rose-700 text-white w-full text-center rounded-bl-lg transition"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </div>
            </div>
            {pages.map((page: any, index: any) => (
              <div key={page.name + index} className="">
                {page.name === "Overview"
                  ? page.active && renderOverview()
                  : page.name === "Edit Profile"
                  ? page.active && renderEditProfile()
                  : page.name === "My Orders"
                  ? page.active && renderMyOrders()
                  : page.name === "My Reviews"
                  ? page.active && renderMyReviews()
                  : page.name === "Favorites"
                  ? page.active && renderFavorites()
                  : page.active && renderCart()}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
