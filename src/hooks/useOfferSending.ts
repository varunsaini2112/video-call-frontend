import { useCallback } from "react";
import { socket } from "../utils";

function useOfferSending(peerConnection: RTCPeerConnection) {
  const sendOffer = useCallback(async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit("send_connection_offer", {
      roomName: "room",
      offer,
    });
  }, [peerConnection]);

  return { sendOffer };
}

export default useOfferSending;
