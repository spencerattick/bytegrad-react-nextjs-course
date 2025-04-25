import FeedbackItem from "./FeedbackItem";

const feedbackItems = [
  {
    upvoteCount: 345,
    companyName: "ByteGrad",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, velit?",
    daysAgo: 3,
  },
  {
    upvoteCount: 12,
    companyName: "Taco Bell",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, velit?",
    daysAgo: 1,
  },
];

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      {feedbackItems.map((feedbackItem, index) => {
        return <FeedbackItem feedbackItem={feedbackItem} key={index}></FeedbackItem>;
      })}
    </ol>
  );
}
