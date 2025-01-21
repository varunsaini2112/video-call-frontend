import { Route, Routes } from "react-router";
import { Landing, VideoCall } from "./pages";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="video-call/:roomId" element={<VideoCall />} />
    </Routes>
  );
}

export default App;
