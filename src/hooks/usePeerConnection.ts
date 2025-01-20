import { useMemo, useState } from "react";
import freeice from "freeice";
import { socket } from "../utils";

function usePeerConnection(localStream: MediaStream | null) {
  const [guestStream, setGuestStream] = useState<MediaStream | null>(null);

  const peerConnection = useMemo(() => {
    const connection = new RTCPeerConnection({
      iceServers: freeice(),
    });

    connection.addEventListener("track", ({ streams }) => {
      console.log(streams);
      setGuestStream(streams[0]);
    });
    connection.addEventListener("icecandidate", ({ candidate }) => {
      socket.emit("send_candidate", { candidate, roomName: "room" });
    });

    localStream?.getTracks().forEach((track) => {
      connection.addTrack(track, localStream);
    });

    return connection;
  }, [localStream]);

  return {
    guestStream,
    peerConnection,
  };
}

export default usePeerConnection;
