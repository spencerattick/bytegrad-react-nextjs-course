import { TriangleUpIcon } from "@radix-ui/react-icons";

type FeedbackItem = {
  upvoteCount: number;
  companyName: string;
  text: string;
  badgeLetter: string;
  daysAgo: number;
  id: number;
};

type FeedbackItemProps = {
  feedbackItem: FeedbackItem;
};

export default function FeedbackItem({
  feedbackItem
}: FeedbackItemProps) {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{feedbackItem.upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.companyName}</p>
        <p>{feedbackItem.text}</p>
      </div>
      <p>{feedbackItem.daysAgo}d</p>
    </li>
  );
}
