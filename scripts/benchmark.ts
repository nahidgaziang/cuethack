import { spawn } from "child_process";

async function runBenchmark() {
  console.log("Starting benchmark...");
  const start = Date.now();

  const response = await fetch("http://localhost:3000/v1/download/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file_id: 10001 }),
  });

  const duration = (Date.now() - start) / 1000;

  if (response.ok) {
    const data = await response.json();
    console.log(`Success! Status: ${response.status}`);
    console.log(`Duration: ${duration.toFixed(2)}s`);
    console.log("Response:", data);
  } else {
    console.log(`Failed! Status: ${response.status}`);
    console.log(`Duration: ${duration.toFixed(2)}s`);
  }
}

runBenchmark();
