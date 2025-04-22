import { useState, useEffect } from "react";
import { initialItems } from "../lib/constants";
import { createContext } from "react";

export const ItemsContext = createContext();

export default function ItemsContextProvider({ children }) {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("items")) || initialItems;
  });
  const handleAddItem = (newItemText) => {
    const newItem = {
      name: newItemText,
      packed: false,
      id: new Date().getTime(),
    };
    setItems([...items, newItem]);
  };
  const handleRemoveAllItems = () => {
    setItems([]);
  };
  const handleResetToInitial = () => {
    setItems(initialItems);
  };
  const handleMarkAllComplete = () => {
    const allComplete = items.map((item) => {
      return { ...item, packed: true };
    });
    setItems(allComplete);
  };
  const handleMarkAllIncomplete = () => {
    const allComplete = items.map((item) => {
      return { ...item, packed: false };
    });
    setItems(allComplete);
  };
  const handleDeleteItem = (item) => {
    const removedItemArr = items.filter((itemToCheck) => {
      return itemToCheck.id !== item.id;
    });
    setItems(removedItemArr);
  };
  const handleTogglePackedCheckbox = (item) => {
    const updatedItems = items.map((itemToCheck) => {
      if (itemToCheck.id === item.id) {
        itemToCheck.packed = !itemToCheck.packed;
        return itemToCheck;
      } else {
        return itemToCheck;
      }
    });
    setItems(updatedItems);
  };
  const checkedItemsNum = items.filter((item) => {
    return item.packed;
  }).length;

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        handleAddItem,
        handleDeleteItem,
        handleRemoveAllItems,
        handleResetToInitial,
        handleMarkAllComplete,
        handleMarkAllIncomplete,
        handleTogglePackedCheckbox,
        checkedItemsNum,
      }}
    >
      {" "}
      {children}
    </ItemsContext.Provider>
  );
}
