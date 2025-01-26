import { useEffect, useRef, useState } from "react";
import "./style.css";
import { useLocation } from "react-router";
import { Player } from "../types/Monpoly";
import { locationCards, PLAYER_TOKEN_COLORS } from "../constants";
import Dice from "react-dice-roll";
import { TValue } from "react-dice-roll/dist/_types";
import Card from "../components/Card";

const Monopoly = () => {
  const {
    state: { players },
  } = useLocation();

  const [playersData, setPlayersData] = useState(() =>
    (players as Player[]).map((player) => ({
      ...player,
      position: 0,
    }))
  );
  const [playerChance, setPlayerChance] = useState(0);

  useEffect(() => {
    playersData.forEach((_, index) => {
      placeToken(index, 0);
    });
  }, []);

  const cardRef = useRef<(HTMLDivElement | null)[]>([]);

  function setNextPlayerChance() {
    const nextTurn =
      playerChance + 1 === playersData.length ? 0 : playerChance + 1;
    setPlayerChance(nextTurn);
  }

  function placeToken(tokenIndex: number, targetCardIndex: number) {
    const targetCard = cardRef.current[targetCardIndex];
    const {
      top = 0,
      left = 0,
      width = 10,
    } = targetCard?.getBoundingClientRect() ?? {};
    const token = document.getElementById(`player-token-${tokenIndex}`);
    console.log(targetCard, token);
    if (token) {
      token.style.top = `${top + 25 * (tokenIndex + 1)}px`;
      token.style.left = `${left + width / 2}px`;
    }
  }

  function rollDiceAndMove(diceValue: TValue) {
    const { id, position: cardIndex } = playersData[playerChance];
    if (cardIndex === -1) {
      if (diceValue !== 6) {
        alert("Can't move without a 6 at start");
        setNextPlayerChance();
      } else {
        setPlayersData((playersData) =>
          playersData.map((playerData) => {
            if (id !== playerData.id) return playerData;
            return { ...playerData, position: 0 };
          })
        );
      }
      return;
    }
    const targetCardIndex = cardIndex + diceValue;
    setPlayersData((playersData) =>
      playersData.map((playerData) => {
        if (id !== playerData.id) return playerData;
        return { ...playerData, position: targetCardIndex };
      })
    );
    placeToken(playerChance, targetCardIndex);
    setNextPlayerChance();
  }

  return (
    <div className="main-container">
      <div className="buttons-container">
        <div>
          It's {playersData[playerChance].name}'s Chance, Roll the Dice!!!
        </div>
        <Dice onRoll={rollDiceAndMove} size={100} />
      </div>
      <div className="grid-container">
        {locationCards.map((card, index) => (
          <Card
            {...card}
            id={`card-${index}`}
            key={`card-${index}`}
            ref={(ref) => (cardRef.current[index] = ref)}
          />
        ))}
        {playersData.map(({ id }, index) => (
          <div
            className="player-token"
            id={`player-token-${index}`}
            style={{ backgroundColor: PLAYER_TOKEN_COLORS[index] }}
            key={id}
          />
        ))}
      </div>
      <div className="players-container">
        {playersData.map(({ id, name, position }) => (
          <div key={id}>
            {name} is at {position}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Monopoly;
