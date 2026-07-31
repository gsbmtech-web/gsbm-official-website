export default function SectionLoader({ minHeight = 400 }) {
  return (
    <div
      className="skeleton-loader"
      aria-hidden="true"
      style={{ minHeight: `${minHeight}px` }}
    />
  );
}