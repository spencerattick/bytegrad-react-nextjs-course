import { useState, useRef } from "react";
import Button from "./Button";

export default function AddItemForm({ handleAddItem }) {
    const inputRef = useRef()
  const [itemText, setItemText] = useState("");

  const handleOnChange = (event) => {
    setItemText(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();


    if (!itemText) {
      alert("Please give the item a name");
      inputRef.current.focus()
      return;
    }
    handleAddItem(itemText)
    setItemText('')
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
