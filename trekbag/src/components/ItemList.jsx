import EmptyView from "./EmptyView";

export default function ItemList({
  items,
  handleDeleteItem,
  handleTogglePackedCheckbox,
}) {
  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}
      {items.map((item) => {
        return (
          <Item
            key={item.id}
            item={item}
            handleDeleteItem={handleDeleteItem}
            handleTogglePackedCheckbox={handleTogglePackedCheckbox}
          />
        );
      })}
    </ul>
  );
}

function Item({ item, handleDeleteItem, handleTogglePackedCheckbox }) {
  return (
    <li className="item">
      <label>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => {
            handleTogglePackedCheckbox(item);
          }}
        />
        {item.name}
      </label>
      <button
        onClick={() => {
          handleDeleteItem(item);
        }}
      >
        ❌
      </button>
    </li>
  );
}
