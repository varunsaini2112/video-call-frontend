import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  useChatConnection,
  useLocalCameraStream,
  usePeerConnection,
} from "./hooks";
import { VideoFeed } from "./components";

function App() {
  const { localStream } = useLocalCameraStream();
  const { peerConnection, guestStream } = usePeerConnection(localStream);
  useChatConnection(peerConnection);

  return (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        {/* {localStream ? (
          <VideoFeed mediaStream={localStream} />
        ) : (
          <button onClick={startStream}>Start Webcam</button>
        )} */}
        {localStream && <VideoFeed mediaStream={localStream} />}
        {guestStream && <VideoFeed mediaStream={guestStream} />}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
