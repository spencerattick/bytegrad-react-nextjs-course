export default function Stats({text}) {
    const textLength = text.length
  return (
    <section className="stats">
      <Stat number={text.split(' ').length} label='Words'/>
      <Stat number={textLength} label='Characters'/>
      <Stat number={280 - textLength} label='Instagram'/>
      <Stat number={2200 - textLength} label='Facebook'/>
    </section>
  );
}

function Stat({label, number}) {
  return (
    <section className="stat">
      <span className="stat__number">{number || 0}</span>
      <h2 className="second-heading">{label}</h2>
    </section>
  );
}
