import { Route, Routes } from "react-router";
import { Landing, Monopoly, VideoCall } from "./pages";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="video-call/:roomId" element={<VideoCall />} />
      <Route path="/game" element={<Monopoly />} />
    </Routes>
  );
}

export default App;
