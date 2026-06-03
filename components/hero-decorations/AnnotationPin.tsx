interface AnnotationPinProps {
  number: number;
  text: string;
  className?: string;
}

export default function AnnotationPin({ number, text, className = '' }: AnnotationPinProps) {
  return (
    <div className={`annotation-pin ${className}`}>
      <div className="annotation-circle">{number}</div>
      <div className="annotation-connector" aria-hidden="true" />
      <span className="annotation-text">{text}</span>
    </div>
  );
}
