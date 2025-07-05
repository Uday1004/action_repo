import React, { useEffect, useState } from "react";

function LogsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    console.log("[Fetch Start] Fetching events...");
    try {
      const res = await fetch(
        "https://ca7d-2405-201-3009-5828-4c8d-3594-ab6b-8ea1.ngrok-free.app/events"
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log("[Fetch Success] Events received:", data);
      setEvents(data.reverse());
      setError(null);
    } catch (err) {
      console.error("[Fetch Error]", err.message);
      setError("Failed to fetch events. Check console for more.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 15000);
    return () => clearInterval(interval);
  }, []);

  const renderEvent = (e) => {
    const time = new Date(e.timestamp).toUTCString();
    switch (e.event_type) {
      case "push":
        return `${e.author} pushed to ${e.to_branch} on ${time}`;
      case "pull_request":
        return `${e.author} submitted a pull request from ${e.from_branch} to ${e.to_branch} on ${time}`;
      case "merge":
        return `${e.author} merged branch ${e.from_branch} to ${e.to_branch} on ${time}`;
      default:
        console.warn("Unknown event type:", e);
        return `[UNKNOWN] Event: ${JSON.stringify(e)}`;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>GitHub Activity Logs</h2>

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && events.length === 0 && (
        <p style={{ fontStyle: "italic" }}>No events to show yet.</p>
      )}

      {events.map((e, i) => {
        const line = renderEvent(e);
        console.log("[Render]", line);
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}

export default LogsPage;
