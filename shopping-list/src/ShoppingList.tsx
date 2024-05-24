import { useEffect, useRef, useState } from "react";
interface Item {
  name: string;
  quantity: number;
}
export default function ShoppingList() {
  const refference = useRef<HTMLInputElement>(null);

  const [list, setList] = useState<Item[]>([]);

  const inputRef = refference;

  const renderList = () => {
    return list.map((value, index) => (
      <li className="list-group-item " key={index}>
        <input type="checkbox" className="item-input-checkbox" key={index} />
        <label>
          {value.quantity} - {value.name}
        </label>
        <button onClick={() => removeFromList(index)}>Remove from list</button>
      </li>
    ));
  };

  const removeFromList = (index: number) => {
    return setList(list.filter((_, itemIndex) => itemIndex != index));
  };

  useEffect(() => {
    renderList();
  }, [list]);

  const addToList = () => {
    console.log("called");
    let matchingItem = false;
    if (inputRef.current?.value != null) {
      list.forEach((value) => {
        if (value.name == inputRef.current?.value) {
          matchingItem = true;
          value = { name: value.name, quantity: value.quantity + 1 };

          console.log({ name: value.name, quantity: value.quantity });
        }
      });
      if (!matchingItem)
        setList([...list, { name: inputRef.current?.value, quantity: 1 }]);
    }
    if (inputRef.current?.value != null) inputRef.current.value = "";
  };

  return (
    <>
      <div className="input-item-data">
        <input
          type="text"
          placeholder="Type item name..."
          className="text-input"
          ref={inputRef}
        />
        <button onClick={() => addToList()}>Add To List</button>
      </div>
      <ul className="list-group">
        {list.length != 0 ? renderList() : <h3>List is empty.</h3>}
      </ul>
    </>
  );
}
