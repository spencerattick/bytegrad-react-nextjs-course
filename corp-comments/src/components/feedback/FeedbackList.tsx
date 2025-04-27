import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../../lib/hooks";

export default function FeedbackList() {
  const { isLoading, errorMessage, filteredFeedbackItems } = useFeedbackItemsContext();
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {filteredFeedbackItems.map((feedbackItem) => {
        return (
          <FeedbackItem
            feedbackItem={feedbackItem}
            key={feedbackItem.id}
          ></FeedbackItem>
        );
      })}
    </ol>
  );
}
