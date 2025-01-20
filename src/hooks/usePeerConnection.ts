import { useMemo, useState } from "react";
import { socket } from "../utils";

function usePeerConnection(localStream: MediaStream | null) {
  const [guestStream, setGuestStream] = useState<MediaStream | null>(null);

  const peerConnection = useMemo(() => {
    const connection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.relay.metered.ca:80",
        },
        {
          urls: "turn:global.relay.metered.ca:80",
          username: import.meta.env.VITE_RTC_USER,
          credential: import.meta.env.VITE_RTC_PASS
        },
        {
          urls: "turn:global.relay.metered.ca:80?transport=tcp",
          username: import.meta.env.VITE_RTC_USER,
          credential: import.meta.env.VITE_RTC_PASS
        },
        {
          urls: "turn:global.relay.metered.ca:443",
          username: import.meta.env.VITE_RTC_USER,
          credential: import.meta.env.VITE_RTC_PASS
        },
        {
          urls: "turns:global.relay.metered.ca:443?transport=tcp",
          username: import.meta.env.VITE_RTC_USER,
          credential: import.meta.env.VITE_RTC_PASS
        },
      ],
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
