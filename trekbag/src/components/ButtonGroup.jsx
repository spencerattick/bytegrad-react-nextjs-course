import Button from "./Button";

export default function ButtonGroup() {
  return <section className="button-group">
    <Button type='secondary'>Mark All Complete</Button>
    <Button type='secondary'>Mark All Incomplete</Button>
    <Button type='secondary'>Reset to Initial</Button>
    <Button type='secondary'>Remove All Items</Button>
  </section>;
}
