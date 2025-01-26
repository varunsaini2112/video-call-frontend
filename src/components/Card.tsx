import { forwardRef } from "react";
import { Card as CardType } from "../types";

const Card = forwardRef<HTMLDivElement, CardType>((props, ref) => {
  const { name, id } = props;

  return (
    <div id={id} ref={ref} style={{ flex: 1 }}>
      {name}
    </div>
  );
});

export default Card;
