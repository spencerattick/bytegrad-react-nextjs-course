import Footer from "./layout/Footer";
import HashtagList from "../hashtag/HashtagList";
import Container from "./layout/Container";
import { useEffect } from "react";
import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore(state => state.fetchFeedbackItems);
  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}

export default App;
