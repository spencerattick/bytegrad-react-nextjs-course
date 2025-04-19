import {
  FACEBOOK_MAX_CHARACTERS,
  INSTAGRAM_MAX_CHARACTERS,
} from "../lib/constants";

export default function Stats({ text }) {
  const textLength = text.length;
  return (
    <section className="stats">
      <Stat number={text.split(" ").length - 1} label="Words" />
      <Stat number={textLength} label="Characters" />
      <Stat number={INSTAGRAM_MAX_CHARACTERS - textLength} label="Instagram" />
      <Stat number={FACEBOOK_MAX_CHARACTERS - textLength} label="Facebook" />
    </section>
  );
}

function Stat({ label, number }) {
  return (
    <section className="stat">
      <span
        className={`stat__number ${number < 0 ? "stat__number--limit" : ""}`}
      >
        {number || 0}
      </span>
      <h2 className="second-heading">{label}</h2>
    </section>
  );
}
