import { useState } from "react";
import { initialItems } from "../lib/constants";

export default function ItemList() {
  const [items, setItems] = useState(initialItems);

  return (
    <ul>
      {items.map((item) => {
        return <Item key={item.id} item={item} />;
      })}
    </ul>
  );
}

function Item({ item }) {
  return (
    <li className="item">
      <label>
        <input type="checkbox" checked={item.packed} />
        {item.name}
      </label>
    <button>❌</button>
    </li>
  );
}
