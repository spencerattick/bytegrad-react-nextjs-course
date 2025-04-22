import { useItemsContext } from "../lib/hooks";
import Counter from "./Counter";
import Logo from "./Logo";

export default function Header() {
  const {items, checkedItemsNum} = useItemsContext()
  return (
    <header>
        <Logo />
        <Counter itemCount={items.length} checkedItemsNum={checkedItemsNum}/>
    </header>
  )
}
