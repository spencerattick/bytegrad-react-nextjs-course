import { TFeedbackItem } from "../lib/types";
import FeedbackList from "./FeedbackList";
import Header from "./Header";

type ContainerProps = {
  isLoading: boolean;
  errorMessage: string;
  feedbackItems: TFeedbackItem[];
  handleAppFeedback: (text: string) => void;
}

export default function Container({isLoading, errorMessage, feedbackItems, handleAppFeedback}: ContainerProps) {
  return (
    <main className="container">
      <Header handleAppFeedback={handleAppFeedback}/>
      <FeedbackList isLoading={isLoading} errorMessage={errorMessage} feedbackItems={feedbackItems}/>
    </main>
  );
}
