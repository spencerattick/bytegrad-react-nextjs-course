import Counter from "./Counter";
import Logo from "./Logo";

export default function Header({itemCount, checkedItemsNum}) {
  return (
    <header>
        <Logo />
        <Counter itemCount={itemCount} checkedItemsNum={checkedItemsNum}/>
    </header>
  )
}
