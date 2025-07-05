import React, { useEffect, useState, useCallback } from "react";

function LogsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ⏳ Async fetch wrapped in useCallback to avoid re-creating function on re-renders
  const fetchEvents = useCallback(async () => {
    console.log("[Fetch Start] Fetching events...");
    try {
      const response = await fetch("http://localhost:5000/events"); // Replace with your actual backend/ngrok link
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log("[Fetch Success] Events received:", data);
      setEvents(data.reverse());
      setError(null);
    } catch (err) {
      console.error("[Fetch Error]", err.message);
      setError("Failed to fetch events. Check console for more.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔁 Initial fetch and auto-refresh every 15 seconds
  useEffect(() => {
    fetchEvents();
    const intervalId = setInterval(fetchEvents, 15000);
    return () => clearInterval(intervalId);
  }, [fetchEvents]);

  // 📦 Event message formatting
  const renderEvent = (event) => {
    const time = new Date(event.timestamp).toUTCString();
    switch (event.event_type) {
      case "push":
        return `${event.author} pushed to ${event.to_branch} on ${time}`;
      case "pull_request":
        return `${event.author} submitted a pull request from ${event.from_branch} to ${event.to_branch} on ${time}`;
      case "merge":
        return `${event.author} merged branch ${event.from_branch} to ${event.to_branch} on ${time}`;
      default:
        console.warn("Unknown event type:", event);
        return `[UNKNOWN] Event: ${JSON.stringify(event)}`;
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

      {events.map((event, index) => {
        const line = renderEvent(event);
        console.log("[Render]", line);
        return <p key={index}>{line}</p>;
      })}
    </div>
  );
}

export default LogsPage;
