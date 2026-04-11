export default function CodePreview({ code }) {
  return (
    <pre style={{ background: "#111", color: "#0f0", padding: "10px" }}>
      {code}
    </pre>
  );
}