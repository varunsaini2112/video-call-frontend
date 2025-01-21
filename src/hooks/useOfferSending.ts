import { useCallback } from "react";
import { socket } from "../utils";
import { useParams } from "react-router";

function useOfferSending(peerConnection: RTCPeerConnection) {
  const { roomId } = useParams();

  const sendOffer = useCallback(async () => {
    console.log("another_person_ready");
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit("send_connection_offer", {
      roomName: roomId,
      offer,
    });
  }, [peerConnection, roomId]);

  return { sendOffer };
}

export default useOfferSending;
