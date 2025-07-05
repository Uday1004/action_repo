import React, { useEffect, useState } from "react";

function LogsPage() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await fetch(
      "https://8177-2405-201-3009-5828-4c8d-3594-ab6b-8ea1.ngrok-free.app/events"
    ); // change to ngrok/Render link
    const data = await res.json();
    setEvents(data.reverse());
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 15000); // every 15s
    return () => clearInterval(interval);
  }, []);

  const renderEvent = (e) => {
    const time = new Date(e.timestamp).toUTCString();
    if (e.event_type === "push")
      return `${e.author} pushed to ${e.to_branch} on ${time}`;
    if (e.event_type === "pull_request")
      return `${e.author} submitted a pull request from ${e.from_branch} to ${e.to_branch} on ${time}`;
    if (e.event_type === "merge")
      return `${e.author} merged branch ${e.from_branch} to ${e.to_branch} on ${time}`;
    return "";
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>GitHub Activity Logs</h2>
      {events.map((e, i) => (
        <p key={i}>{renderEvent(e)}</p>
      ))}
    </div>
  );
}

export default LogsPage;
