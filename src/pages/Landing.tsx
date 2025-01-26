import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Player } from "../types/Monpoly";

const Landing = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const openGame = () => {
    navigate("/game", { state: { players } });
  };

  const addPlayer = () => {
    const playerName = inputRef.current?.value.trim();
    if (!playerName) {
      alert("Please enter the player name");
      return;
    }

    setPlayers((players) => [
      ...players,
      { id: crypto.randomUUID(), name: playerName },
    ]);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "rgb(255, 193, 193)",
      }}
    >
      <h4>Players List</h4>
      {players.map(({ name }) => (
        <div>{name}</div>
      ))}
      <input ref={inputRef} type={"text"} />
      <button onClick={addPlayer}>Add Player</button>
      <button onClick={openGame}>Open Monpoly Game</button>
    </div>
  );
};

export default Landing;
