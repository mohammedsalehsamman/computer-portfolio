import type { CSSProperties, HTMLAttributes } from "react";
import { isRed, type Card, type Suit } from "./engine";

export const GLYPH: Record<Suit, string> = { S: "♠", H: "♥", D: "♦", C: "♣" };
const RANK = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const RANK_NAME = ["", "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
const SUIT_NAME: Record<Suit, string> = { S: "spades", H: "hearts", D: "diamonds", C: "clubs" };

export const cardLabel = (c: Card) => (c.up ? `${RANK_NAME[c.rank]} of ${SUIT_NAME[c.suit]}` : "Face-down card");

type Props = { card: Card; style?: CSSProperties; className?: string } & Omit<HTMLAttributes<HTMLDivElement>, "style" | "className">;

/** Original Samman OS card: putty face with VT323 ranks, plum/terracotta back with an MSS monogram. */
export function CardView({ card, style, className = "", ...rest }: Props) {
  if (!card.up)
    return (
      <div className={`card card-down ${className}`} style={style} aria-label={cardLabel(card)} {...rest}>
        <span className="card-mono">MSS</span>
      </div>
    );
  const glyph = GLYPH[card.suit];
  const rank = RANK[card.rank];
  return (
    <div className={`card card-up${isRed(card.suit) ? " is-red" : ""} ${className}`} style={style} aria-label={cardLabel(card)} {...rest}>
      <span className="card-corner tl">
        {rank}
        <i>{glyph}</i>
      </span>
      <span className={`card-center${card.rank > 10 ? " is-court" : ""}`}>
        {card.rank > 10 ? (
          <>
            <b>{rank}</b>
            <i>{glyph}</i>
          </>
        ) : (
          glyph
        )}
      </span>
      <span className="card-corner br">
        {rank}
        <i>{glyph}</i>
      </span>
    </div>
  );
}
