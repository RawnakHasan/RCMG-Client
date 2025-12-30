import type { Card } from "@/types/card";

type HandProps = {
  card: Card;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
};

const Hand = ({ card, index, isHovered, onHover, onLeave }: HandProps) => {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="
        relative
        -ml-16
        transition-all duration-200 ease-out
      "
      style={{
        zIndex: isHovered ? 999 : index,
        transform: isHovered ? "translateY(-2rem)" : "translateY(0)",
      }}
    >
      <img
        src={card.image}
        alt={`${card.name}`}
        className="w-28 cursor-pointer select-none"
        draggable={false}
      />
    </div>
  );
};

export default Hand;
