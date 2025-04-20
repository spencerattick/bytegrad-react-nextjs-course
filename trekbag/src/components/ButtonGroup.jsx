import Button from "./Button";

const secondaryButtons = [
  "Mark All Complete",
  "Mark All Incomplete",
  "Reset to Initial",
  "Remove All Items",
];

export default function ButtonGroup() {
  return (
    <section className="button-group">
      {secondaryButtons.map((buttonText) => {
        return (
          <Button type="secondary" key={buttonText}>
            {buttonText}
          </Button>
        );
      })}
    </section>
  );
}
