import BackgroundHeading from "./BackgroundHeading";
import Footer from "./Footer";
import Header from "./Header";
import ItemList from "./ItemList";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { initialItems } from "../lib/constants";

function App() {
  const [items, setItems] = useState(initialItems);
  const handleAddItem = (newItemText) => {
    const newItem = {
      name: newItemText,
      packed: false,
      id: new Date().getTime(),
    };
    setItems([...items, newItem]);
  };
  const handleRemoveAllItems = () => {
    setItems([]);
  };
  const handleResetToInitial = () => {
    setItems(initialItems)
  }
  const handleMarkAllComplete = () => {
    const allComplete = items.map((item) => {
      return {...item, packed: true}
    })
    setItems(allComplete)
  }

  const handleMarkAllIncomplete = () => {
    const allComplete = items.map((item) => {
      return {...item, packed: false}
    })
    setItems(allComplete)
  }

  return (
    <>
      <BackgroundHeading />
      <main>
        <Header />
        <ItemList items={items} />
        <Sidebar
          handleAddItem={handleAddItem}
          handleRemoveAllItems={handleRemoveAllItems}
          handleResetToInitial={handleResetToInitial}
          handleMarkAllComplete={handleMarkAllComplete}
          handleMarkAllIncomplete={handleMarkAllIncomplete}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
