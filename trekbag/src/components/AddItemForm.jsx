import { useState, useRef } from "react";
import Button from "./Button";
import { useItemsStore } from "../stores/itemsStore";

export default function AddItemForm() {
  const addItem = useItemsStore((state) => state.addItem);
  const inputRef = useRef();
  const [itemText, setItemText] = useState("");

  const handleOnChange = (event) => {
    setItemText(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (!itemText) {
      alert("Please give the item a name");
      inputRef.current.focus();
      return;
    }
    addItem(itemText);
    setItemText("");
  };

  return (
    <form action="" onSubmit={handleOnSubmit}>
      <h2>Add an Item</h2>
      <input
        ref={inputRef}
        type="text"
        value={itemText}
        onChange={handleOnChange}
        autoFocus
      />
      <Button>Add to List</Button>
    </form>
  );
}
