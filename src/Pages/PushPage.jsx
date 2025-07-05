import React, { useState } from "react";

function PushPage() {
  const [content, setContent] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>Push Testing Page to GitHub and my name is uday solanki</h2>
      <h5>Now i am updating my project on github</h5>
      <textarea
        rows={10}
        cols={50}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type code changes here..."
      />
      <p style={{ marginTop: 10 }}>⚠️ Now manually commit & push to GitHub</p>
    </div>
  );
}

export default PushPage;
