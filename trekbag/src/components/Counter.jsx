export default function Counter({ itemCount, checkedItemsNum }) {
  return (
    <p>
      <b>{checkedItemsNum}</b> / {itemCount} items packed
    </p>
  );
}
