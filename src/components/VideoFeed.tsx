import { FunctionComponent } from "react";

interface Props {
  mediaStream: MediaStream;
  isMuted?: boolean;
  controls?: boolean;
}

export const VideoFeed: FunctionComponent<Props> = ({
  mediaStream,
  isMuted = false,
  controls = true,
}) => {
  return (
    <video
      ref={(ref) => {
        if (ref) {
          ref.srcObject = mediaStream;
        }
      }}
      autoPlay={true}
      muted={isMuted}
      controls={controls}
    />
  );
};
