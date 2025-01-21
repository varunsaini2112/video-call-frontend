import { useRef } from "react";
import { useNavigate } from "react-router";

const Landing = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const openVideoCall = () => {
    const roomName = inputRef.current?.value.trim().toLowerCase();
    if (!roomName) {
      alert("Please enter the room name");
      return;
    }

    navigate(`/video-call/${roomName}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <input ref={inputRef} type={"text"} />
        <button onClick={openVideoCall}>Open Video Call Room</button>
      </div>
    </div>
  );
};

export default Landing;
