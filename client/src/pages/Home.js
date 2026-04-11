import { useState } from "react";
import InputBox from "../component/InputBox.js";
import Loader from "../component/Loader.js";
import { generateExtension } from "../services/api.js";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (prompt) => {
    if (!prompt) return alert("Enter prompt");

    setLoading(true);
    await generateExtension(prompt);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Chrome Extension Generator</h1>

      <InputBox onGenerate={handleGenerate} />

      {loading && <Loader />}
    </div>
  );
}