import { useContext } from "react";
import Counter from "./Counter";
import Logo from "./Logo";
import { ItemsContext } from "../contexts/ItemsContextProvider";

export default function Header() {
  const {items, checkedItemsNum} = useContext(ItemsContext)
  return (
    <header>
        <Logo />
        <Counter itemCount={items.length} checkedItemsNum={checkedItemsNum}/>
    </header>
  )
}
