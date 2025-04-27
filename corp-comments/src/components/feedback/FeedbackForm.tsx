import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";

type FeedbackFormProps = {
  handleAppFeedback: (text: string) => void;
};

export default function FeedbackForm({ handleAppFeedback }: FeedbackFormProps) {
  const [text, setText] = useState("");

  const remainingCharCount = MAX_CHARACTERS - text.length;

  const handleTextOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newText = event.target.value;

    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setText(newText);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAppFeedback(text);
    setText("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        onChange={handleTextOnChange}
        value={text}
        id="feedback-textarea"
        placeholder="give feedback"
        spellCheck={false}
      ></textarea>
      <label htmlFor="feedback-textarea">
        Enter your feedback here - remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{remainingCharCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
