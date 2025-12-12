import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface HealthStatus {
  status: "healthy" | "unhealthy";
  checks: {
    storage: "ok" | "error";
  };
}

export default function HealthWidget() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/health`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch health");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="widget">
      <h2>🏥 Health Status</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {health && (
        <div className="health-status">
          <div className={`status-badge ${health.status}`}>
            {health.status === "healthy" ? "✅" : "❌"}{" "}
            {health.status.toUpperCase()}
          </div>
          <div className="checks">
            <div className="check">
              <span>Storage:</span>
              <span className={health.checks.storage === "ok" ? "ok" : "error"}>
                {health.checks.storage === "ok" ? "✓" : "✗"}{" "}
                {health.checks.storage}
              </span>
            </div>
          </div>
        </div>
      )}
      <button onClick={fetchHealth} className="refresh-button">
        Refresh
      </button>
    </div>
  );
}
