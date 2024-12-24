import React, { useEffect, useState } from "react";
import NewCategory from "./NewCategory";
import EditCategory from "./EditCategory";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "../../../../database/firebase";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdDragIndicator } from "react-icons/md";

export default function Categories({
  projects,
  categories,
  setCategories,
  getCategories,
  loading,
  setLoading,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState("Categories");
  const categoriesRef = collection(database, "categories");

  useEffect(() => {
    getCategories();
  }, []);

  const deleteCategory = (categoryIndex) => {
    setLoading(true);
    try {
      projects.forEach((prev) => {
        if (prev.categoryId === categories[categoryIndex].id) {
          deleteDoc(doc(database, "projects", prev.id));
        }
      });

      deleteDoc(doc(categoriesRef, categories[categoryIndex].id));

      setCategories((prevCategories) =>
        prevCategories.filter((_, index) => index !== categoryIndex)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveReorderedCategories = async (reorderedCategories) => {
    setLoading(true);
    try {
      // Save updated order to Firestore
      for (let i = 0; i < reorderedCategories.length; i++) {
        const categoryDoc = doc(categoriesRef, reorderedCategories[i].id);
        await updateDoc(categoryDoc, { order: i });
      }
      setCategories(reorderedCategories);
    } catch (error) {
      console.log("Error saving reordered categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedCategories = Array.from(categories);
    const [removed] = reorderedCategories.splice(result.source.index, 1);
    reorderedCategories.splice(result.destination.index, 0, removed);

    saveReorderedCategories(reorderedCategories);
  };

  const renderCategories = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-3 max-h-[35rem]"
              style={{ overflowY: "auto" }}
            >
              {categories.map((category, index) => (
                <Draggable
                  key={category.id}
                  draggableId={category.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="w-full p-3 bg-[#242424] hover:bg-[#282828] first:rounded-t-lg last:rounded-b-lg cursor-pointer group transition flex justify-between"
                    >
                      <div className="flex gap-5 items-center">
                        <div className="flex">
                          <div className="flex items-center justify-center text-2xl text-neutral-600">
                            <MdDragIndicator />
                          </div>
                          <h1 className="text-lg transition pl-3">
                            {category.categoryName}
                          </h1>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-2 px-5 transition rounded-lg"
                          onClick={() => handleEditMode(category)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 p-2 px-5 transition rounded-lg"
                          onClick={() => deleteCategory(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  const handleEditMode = (category) => {
    setSelectedCategory(category);
    setPage("Edit");
  };

  return (
    <div className="h-full p-5">
      {page === "New Category" ? (
        <NewCategory setPage={setPage} setCategories={setCategories} />
      ) : page === "Edit" ? (
        <EditCategory
          setPage={setPage}
          setCategories={setCategories}
          category={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div
            className={`h-[35rem] gap-3 flex flex-col ${
              categories.length > 0 ? "" : "justify-center items-center"
            }`}
            style={{ overflow: "auto" }}
          >
            <p className="text-5xl text-white font-thin">Categories</p>
            {categories.length > 0 ? (
              <>{renderCategories()}</>
            ) : (
              !loading && (
                <span className="text-center bg-[#242424] rounded-lg p-3 px-5 text-xl">
                  Couldn't find any category. Please create one.
                </span>
              )
            )}
          </div>
          <div>
            <button
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 p-2 px-5 transition rounded-lg w-full"
              onClick={() => setPage("New Category")}
            >
              New Category
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
