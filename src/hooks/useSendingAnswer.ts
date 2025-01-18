import { useCallback } from "react";
import { socket } from "../utils";

function useSendingAnswer(peerConnection: RTCPeerConnection) {
  const handleConnectionOffer = useCallback(
    async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      console.log("send_connection_offer");
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      socket.emit("answer", { answer, roomName: "room" });
    },
    [peerConnection]
  );

  return {
    handleConnectionOffer,
  };
}

export default useSendingAnswer;
