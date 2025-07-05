import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PushPage from "./Pages/PushPage";
import LogsPage from "./Pages/LogPage";

function App() {
  return (
    <Router>
      <nav style={{ padding: 10 }}>
        <Link to="/" style={{ marginRight: 20 }}>
          Push
        </Link>
        <Link to="/logs">Logs</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PushPage />} />
        <Route path="/logs" element={<LogsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
