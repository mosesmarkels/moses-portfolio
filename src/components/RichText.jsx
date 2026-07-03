// Renders a paragraph that's either a plain string or an array of
// { tag, text } spans (tag: 'text' | 'em' | 'strong' | 'direction' | 'vo').
export default function RichText({ content }) {
  if (typeof content === 'string') return <>{content}</>;
  return (
    <>
      {content.map((span, i) => {
        const key = i;
        switch (span.tag) {
          case 'em': return <em key={key}>{span.text}</em>;
          case 'strong': return <strong key={key}>{span.text}</strong>;
          case 'direction': return <span key={key} className="direction">{span.text}</span>;
          case 'vo': return <span key={key} className="vo">{span.text}</span>;
          default: return <span key={key}>{span.text}</span>;
        }
      })}
    </>
  );
}
