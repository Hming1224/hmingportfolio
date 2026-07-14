export type TermNote = {
  term: string;
  description: string;
};

export default function TermNotes({
  items,
  title,
  ariaLabel,
}: {
  items: TermNote[];
  title: string;
  ariaLabel: string;
}) {
  return (
    <aside className="ds-case-term-notes" aria-label={ariaLabel}>
      <h3>{title}</h3>
      <dl>
        {items.map((item) => (
          <div className="ds-case-term-note" key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
