import { useState } from "react";

function useLocalCameraStream() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  function startStream() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch((err) => console.error(err));
  }

  return {
    localStream,
    startStream,
  };
}

export default useLocalCameraStream;
