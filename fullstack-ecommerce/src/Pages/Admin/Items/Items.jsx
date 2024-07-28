import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../../../Database/connection";

function Items({ page, id, name, price }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const tempItems = await getItems();
      setItems(tempItems);
    }

    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    await deleteItem(itemId);
    setItems(items.filter((item) => item.id !== itemId));
  };

  const renderItems = () => {
    return items.map((value) => (
      <div
        className="w-full bg-slate-300 px-3 py-4 flex justify-between rounded-lg items-center shadow-md "
        key={value.id}
      >
        <div>
          ${value.price} - {value.name}
        </div>
        <div className="flex gap-3">
          <button
            className="bg-blue-400 hover:bg-blue-500 transition text-white font-bold p-2 px-3 rounded-lg hover:shadow-md"
            onClick={() => {
              id(value.id);
              name(value.name);
              price(value.price);
              page("editItem");
            }}
          >
            Edit
          </button>
          <button
            className="bg-rose-400 hover:bg-rose-500 transition text-white font-bold p-2 px-3 rounded-lg hover:shadow-md"
            onClick={() => {
              handleDelete(value.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="bg-slate-300 rounded-lg p-3 items-center flex justify-between w-full">
          <div>
            <p className="text-xl text-slate-700">Items:</p>
          </div>
          <div>
            <button
              className="bg-green-400 hover:bg-green-500 transition text-white font-bold p-2 px-3 rounded-lg hover:shadow-md"
              onClick={() => page("addItem")}
            >
              Add Item
            </button>
          </div>
        </div>
        <div className="w-full h-[25rem] rounded-lg gap-2 flex flex-col overflow-hidden overflow-y-auto">
          {items.length != 0 ? (
            renderItems()
          ) : (
            <div className="w-full text-center">No items found.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Items;
