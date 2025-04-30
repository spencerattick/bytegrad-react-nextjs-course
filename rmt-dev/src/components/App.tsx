import Background from "./Background";
import Header from "./Header";
import Container from "./Container";
import Footer from "./Footer";
import { useEffect, useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [jobItems, setJobItems] = useState([]);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      const res = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
      const data = await res.json();
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText]);


  return (
    <>
      <Background />
      <Header searchText={searchText} setSearchText={setSearchText}/>
      <Container jobItems={jobItems}/>
      <Footer />
    </>
  );
}

export default App;
