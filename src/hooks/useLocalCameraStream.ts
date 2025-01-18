import { useEffect, useState } from "react";

function useLocalCameraStream() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch((err) => console.error(err));
  }, []);

  return {
    localStream,
  };
}

export default useLocalCameraStream;
