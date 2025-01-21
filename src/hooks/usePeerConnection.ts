import { useMemo, useState } from "react";
import { socket } from "../utils";
import { iceConfig } from "../config";
import { useParams } from "react-router";

function usePeerConnection(localStream: MediaStream | null) {
  const { roomId } = useParams();
  const [guestStream, setGuestStream] = useState<MediaStream | null>(null);

  const peerConnection = useMemo(() => {
    const connection = new RTCPeerConnection({
      iceServers: iceConfig,
    });

    connection.addEventListener("track", ({ streams }) => {
      console.log(streams);
      setGuestStream(streams[0]);
    });
    connection.addEventListener("icecandidate", ({ candidate }) => {
      socket.emit("send_candidate", { candidate, roomName: roomId });
    });

    localStream?.getTracks().forEach((track) => {
      connection.addTrack(track, localStream);
    });

    return connection;
  }, [localStream, roomId]);

  return {
    guestStream,
    peerConnection,
  };
}

export default usePeerConnection;
