import { useContext } from "react";
import AddItemForm from "./AddItemForm";
import ButtonGroup from "./ButtonGroup";
import { ItemsContext } from "../contexts/ItemsContextProvider";

export default function Sidebar() {
  const {
    handleAddItem,
    handleRemoveAllItems,
    handleResetToInitial,
    handleMarkAllComplete,
    handleMarkAllIncomplete,
  } = useContext(ItemsContext);
  return (
    <div className="sidebar">
      <AddItemForm handleAddItem={handleAddItem} />
      <ButtonGroup
        handleRemoveAllItems={handleRemoveAllItems}
        handleResetToInitial={handleResetToInitial}
        handleMarkAllComplete={handleMarkAllComplete}
        handleMarkAllIncomplete={handleMarkAllIncomplete}
      />
    </div>
  );
}
