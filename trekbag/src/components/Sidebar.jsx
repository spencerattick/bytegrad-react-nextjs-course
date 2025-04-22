import AddItemForm from "./AddItemForm";
import ButtonGroup from "./ButtonGroup";
import { useItemsContext } from "../lib/hooks";

export default function Sidebar() {
  const {
    handleAddItem,
    handleRemoveAllItems,
    handleResetToInitial,
    handleMarkAllComplete,
    handleMarkAllIncomplete,
  } = useItemsContext();
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
