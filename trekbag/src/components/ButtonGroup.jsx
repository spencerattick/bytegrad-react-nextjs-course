import Button from "./Button";

export default function ButtonGroup({
  handleRemoveAllItems,
  handleResetToInitial,
  handleMarkAllComplete,
  handleMarkAllIncomplete,
}) {
  const secondaryButtons = [
    { text: "Mark All Complete", onClick: handleMarkAllComplete },
    { text: "Mark All Incomplete", onClick: handleMarkAllIncomplete },
    { text: "Reset to Initial", onClick: handleResetToInitial },
    { text: "Remove All Items", onClick: handleRemoveAllItems },
  ];

  return (
    <section className="button-group">
      {secondaryButtons.map(({text, onClick}) => {
       return <Button buttonType='secondary' key={text + onClick.toString()} onClick={onClick}>{text}</Button>
      })}
    </section>
  );
}
