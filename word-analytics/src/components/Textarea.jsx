import { useState } from "react";
import Warning from "./Warning";

export default function Textarea({text, setText}) {
  const [warningText, setWarningText] = useState("");

  const handleOnChange = (event) => {
    let newText = event.target.value;
    if (newText.includes("<script>")) {
      newText = newText.replace("<script>", "");
      setWarningText("No script tags allowed!");
    } else if (newText.includes("@")) {
      setWarningText("No @ symbols are allowed!");
      newText = newText.replace("@", "");
    } else {
      setWarningText("");
    }
    setText(newText);
  };
  return (
    <div className="textarea">
      <textarea
        value={text}
        onChange={handleOnChange}
        placeholder="Enter Your Text"
        spellCheck="false"
      />
      {warningText ? <Warning warningText={warningText} /> : null}
    </div>
  );
}
