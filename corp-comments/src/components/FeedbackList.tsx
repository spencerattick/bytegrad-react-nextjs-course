import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  useEffect(() => {
    fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks')
    .then(res => res.json())
    .then(data => {
      setFeedbackItems(data.feedbacks)
    })
  }, []);

  return (
    <ol className="feedback-list">
      {feedbackItems.map((feedbackItem) => {
        return (
          <FeedbackItem feedbackItem={feedbackItem} key={feedbackItem.id}></FeedbackItem>
        );
      })}
    </ol>
  );
}
