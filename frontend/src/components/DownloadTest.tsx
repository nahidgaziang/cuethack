import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface CheckResult {
  file_id: number;
  available: boolean;
  s3Key: string | null;
  size: number | null;
}

export default function DownloadTest() {
  const [fileId, setFileId] = useState("70000");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkDownload = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(`${API_URL}/v1/download/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_id: parseInt(fileId) }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check download");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="widget">
      <h2>📥 Download Test</h2>
      <div className="download-form">
        <input
          type="number"
          value={fileId}
          onChange={(e) => setFileId(e.target.value)}
          placeholder="File ID (10000-100000000)"
          min="10000"
          max="100000000"
        />
        <button onClick={checkDownload} disabled={loading}>
          {loading ? "Checking..." : "Check Availability"}
        </button>
      </div>
      {error && <p className="error">Error: {error}</p>}
      {result && (
        <div className="result">
          <p>
            <strong>File ID:</strong> {result.file_id}
          </p>
          <p>
            <strong>Available:</strong> {result.available ? "✅ Yes" : "❌ No"}
          </p>
          {result.available && (
            <>
              <p>
                <strong>S3 Key:</strong> {result.s3Key}
              </p>
              <p>
                <strong>Size:</strong>{" "}
                {result.size
                  ? `${(result.size / 1024).toFixed(2)} KB`
                  : "Unknown"}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
