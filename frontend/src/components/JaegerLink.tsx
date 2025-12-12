export default function JaegerLink() {
  const jaegerUrl = import.meta.env.VITE_JAEGER_URL || "http://localhost:16686";

  return (
    <div className="widget">
      <h2>🔍 Trace Viewer</h2>
      <p>View distributed traces in Jaeger UI</p>
      <a
        href={jaegerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="jaeger-link"
      >
        Open Jaeger UI →
      </a>
      <div className="info">
        <p className="hint">Traces show request flow through the system</p>
      </div>
    </div>
  );
}
