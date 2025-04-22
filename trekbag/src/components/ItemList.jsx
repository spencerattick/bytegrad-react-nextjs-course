import Select from "react-select";
import EmptyView from "./EmptyView";
import { useState, useMemo } from "react";
import { useItemsStore } from "../stores/itemsStore";

const sortingOptions = [
  { label: "sort by default", value: "default" },
  { label: "sort by packed", value: "packed" },
  { label: "sort by unpacked", value: "unpacked" },
];

export default function ItemList() {
  const [sortBy, setSortBy] = useState("default");
  const items = useItemsStore((state) => state.items);
  const deleteItem = useItemsStore((state) => state.deleteItem);
  const toggleItem = useItemsStore((state) => state.toggleItem);

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === "packed") {
          return b.packed - a.packed;
        }

        if (sortBy === "unpacked") {
          return a.packed - b.packed;
        }

        return;
      }),
    [items, sortBy]
  );
  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}
      {items.length > 1 && (
        <section className="sorting">
          <Select
            options={sortingOptions}
            defaultValue={sortingOptions[0]}
            onChange={(option) => {
              setSortBy(option.value);
            }}
          />
        </section>
      )}
      {sortedItems.map((item) => {
        return (
          <Item
            key={item.id}
            item={item}
            deleteItem={deleteItem}
            toggleItem={toggleItem}
          />
        );
      })}
    </ul>
  );
}

function Item({ item, deleteItem, toggleItem }) {
  return (
    <li className="item">
      <label>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => {
            toggleItem(item.id);
          }}
        />
        {item.name}
      </label>
      <button
        onClick={() => {
          deleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
