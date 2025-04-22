import Select from "react-select";
import EmptyView from "./EmptyView";
import { useState, useMemo } from "react";
import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContextProvider";

const sortingOptions = [
  { label: "sort by default", value: "default" },
  { label: "sort by packed", value: "packed" },
  { label: "sort by unpacked", value: "unpacked" },
];

export default function ItemList() {
    const [sortBy, setSortBy] = useState('default')
    const {items, handleDeleteItem, handleTogglePackedCheckbox} = useContext(ItemsContext)

    const sortedItems = useMemo(() => [...items].sort((a, b) => {
        if (sortBy === 'packed') {
            return b.packed - a.packed
        }

        if (sortBy === 'unpacked') {
            return a.packed - b.packed
        }

        return
    }), [items, sortBy])
  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}
      {items.length > 1 && (
        <section className="sorting">
          <Select options={sortingOptions} defaultValue={sortingOptions[0]} onChange={option => {setSortBy(option.value)}}/>
        </section>
      )}
      {sortedItems.map((item) => {
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
