import { ResetIcon } from "@radix-ui/react-icons";

export default function ResetButton({ setCount }) {
  const handleClick = () => {
    setCount(0);
  };

  return (
    <button className="reset-btn" onClick={handleClick}>
      <ResetIcon className="reset-btn-icon" />
    </button>
  );
}
