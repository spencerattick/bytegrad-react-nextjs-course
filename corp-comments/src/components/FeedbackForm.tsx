import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";


export default function FeedbackForm() {
  const [text, setText] = useState("");

  const remainingCharCount = MAX_CHARACTERS - text.length

  const handleTextOnChange = (event: any) => {
    const newText = event.target.value

    if (newText.length > MAX_CHARACTERS) {
        return 
    }
    setText(newText)
  }
  return (
    <form className="form">
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
