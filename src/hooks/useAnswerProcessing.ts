function useAnswerProcessing(peerConnection: RTCPeerConnection) {
  function handleOfferAnswer({
    answer,
  }: {
    answer: RTCSessionDescriptionInit;
  }) {
    peerConnection.setRemoteDescription(answer);
  }

  return {
    handleOfferAnswer,
  };
}
export default useAnswerProcessing;
