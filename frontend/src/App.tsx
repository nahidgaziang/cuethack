import { useState } from "react";
import HealthWidget from "./components/HealthWidget";
import DownloadTest from "./components/DownloadTest";
import JaegerLink from "./components/JaegerLink";
import "./App.css";

function App() {
  const [showError, setShowError] = useState(false);

  const triggerError = () => {
    setShowError(true);
    throw new Error(
      "Test error for Sentry! This should appear in your dashboard.",
    );
  };

  return (
    <div className="App">
      <header>
        <h1>🔭 Delineate Observability Dashboard</h1>
        <p>Monitoring download service health and performance</p>
      </header>

      <main>
        <div className="widgets">
          <HealthWidget />
          <DownloadTest />
          <JaegerLink />
        </div>

        <div className="error-test">
          <h3>Sentry Error Tracking Test</h3>
          <button onClick={triggerError} className="error-button">
            🔥 Trigger Test Error
          </button>
          <p className="hint">Click to test Sentry error capture</p>
        </div>
      </main>

      <footer>
        <p>Challenge 4: Observability Dashboard | Delineate Hackathon</p>
      </footer>
    </div>
  );
}

export default App;
