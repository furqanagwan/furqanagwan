export default function StarRating({ rating }: { rating: number }) {
  const full = "★";
  const half = "½";
  const empty = "☆";
  const stars = [];
  let i = 1;
  for (; i <= Math.floor(rating); i++) stars.push(<span key={i}>{full}</span>);
  if (rating % 1 >= 0.5) {
    stars.push(<span key="half">{half}</span>);
    i++;
  }
  for (; i <= 5; i++) stars.push(<span key={i + 100}>{empty}</span>);
  return (
    <span
      className="ml-2 text-yellow-500 text-base align-middle"
      aria-label={`Rating: ${rating} out of 5`}
      title={`${rating} stars`}
    >
      {stars}
    </span>
  );
}
