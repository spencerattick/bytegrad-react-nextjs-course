import { useItemsStore } from "../stores/itemsStore";
import Button from "./Button";

export default function ButtonGroup() {

    const markAllAsComplete = useItemsStore(state => state.markAllAsComplete)
    const markAllAsIncomplete = useItemsStore(state => state.markAllAsIncomplete)
    const resetToInitial = useItemsStore(state => state.resetToInitial)
    const removeAllItems = useItemsStore(state => state.removeAllItems)

  const secondaryButtons = [
    { text: "Mark All Complete", onClick: markAllAsComplete },
    { text: "Mark All Incomplete", onClick: markAllAsIncomplete },
    { text: "Reset to Initial", onClick: resetToInitial },
    { text: "Remove All Items", onClick: removeAllItems },
  ];

  return (
    <section className="button-group">
      {secondaryButtons.map(({text, onClick}) => {
       return <Button buttonType='secondary' key={text + onClick.toString()} onClick={onClick}>{text}</Button>
      })}
    </section>
  );
}
