function useAnswerProcessing(peerConnection: RTCPeerConnection) {
  function handleOfferAnswer({
    answer,
  }: {
    answer: RTCSessionDescriptionInit;
  }) {
    console.log("answer");
    peerConnection.setRemoteDescription(answer);
  }

  return {
    handleOfferAnswer,
  };
}
export default useAnswerProcessing;
