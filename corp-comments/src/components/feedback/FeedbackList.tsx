import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export default function FeedbackList() {
  const isLoading = useFeedbackItemsStore(state => state.isLoading);
  const errorMessage = useFeedbackItemsStore(state => state.errorMessage);
  const getFilteredFeedbackItems = useFeedbackItemsStore(state => state.getFilteredFeedbackItems());

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {getFilteredFeedbackItems.map((feedbackItem) => {
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
