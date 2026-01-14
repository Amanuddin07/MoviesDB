import "./style.css";

export default function VideoCardLoader({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div className="video-card-loader" key={i}>
          <div className="shimmer" />
        </div>
      ))}
    </>
  );
}
