import { useCallback, useEffect } from "react";
import { socket } from "../utils";
import useOfferSending from "./useOfferSending";
import useSendingAnswer from "./useSendingAnswer";
import useAnswerProcessing from "./useAnswerProcessing";

function useChatConnection(peerConnection: RTCPeerConnection) {
  const { sendOffer } = useOfferSending(peerConnection);
  const { handleConnectionOffer } = useSendingAnswer(peerConnection);
  const { handleOfferAnswer } = useAnswerProcessing(peerConnection);

  const handleConnection = () => {
    socket.emit("join_room", "room");
  };
  const handleReceiveCandidate = useCallback(
    ({ candidate }: { candidate: RTCIceCandidate }) => {
      peerConnection.addIceCandidate(candidate);
    },
    [peerConnection]
  );

  useEffect(() => {
    socket.connect();
    socket.on("connect", handleConnection);
    socket.on("another_person_ready", sendOffer);
    socket.on("answer", handleOfferAnswer);
    socket.on("send_connection_offer", handleConnectionOffer);
    socket.on("send_candidate", handleReceiveCandidate);

    return () => {
      socket.disconnect();
      socket.off("connect", handleConnection);
      socket.off("another_person_ready", sendOffer);
      socket.off("answer", handleOfferAnswer);
      socket.off("send_connection_offer", handleConnectionOffer);
      socket.off("send_candidate", handleReceiveCandidate);
    };
  }, []);
}

export default useChatConnection;
