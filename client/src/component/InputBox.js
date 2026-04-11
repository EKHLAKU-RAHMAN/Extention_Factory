import { useState } from "react";

export default function InputBox({ onGenerate }) {
  const [prompt, setPrompt] = useState("");

  return (
    <div>
      <textarea
        placeholder="Enter your extension idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        style={{ width: "100%", padding: "10px" }}
      />

      <button onClick={() => onGenerate(prompt)}>
        Generate Extension
      </button>
    </div>
  );
}