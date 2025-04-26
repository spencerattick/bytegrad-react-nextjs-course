import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import { type TFeedbackItem } from "../lib/types";
import { useEffect, useState } from "react";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddFeedback = (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.startsWith("#"))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      badgeLetter: companyName?.substring(0, 1).toUpperCase(),
      companyName,
      daysAgo: 0,
      text,
      upvoteCount: 0,
    };
    setFeedbackItems([...feedbackItems, newItem]);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again later.");
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container isLoading={isLoading} errorMessage={errorMessage} feedbackItems={feedbackItems} handleAppFeedback={handleAddFeedback}/>
      <HashtagList />
    </div>
  );
}

export default App;
