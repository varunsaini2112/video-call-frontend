import { useCallback } from "react";
import { socket } from "../utils";
import { useParams } from "react-router";

function useSendingAnswer(peerConnection: RTCPeerConnection) {
  const { roomId } = useParams();

  const handleConnectionOffer = useCallback(
    async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      console.log("send_connection_offer");
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      socket.emit("answer", { answer, roomName: roomId });
    },
    [peerConnection, roomId]
  );

  return {
    handleConnectionOffer,
  };
}

export default useSendingAnswer;
