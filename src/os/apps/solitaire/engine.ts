/**
 * Klondike solitaire rules as pure functions: no React, no DOM.
 * Every action returns a new Game (or null when the action is illegal),
 * so undo is just a stack of previous states.
 */

export type Suit = "S" | "H" | "D" | "C";
export const SUITS: Suit[] = ["S", "H", "D", "C"];

export type Card = { id: string; suit: Suit; rank: number; up: boolean };

export type Game = {
  stock: Card[];
  waste: Card[];
  foundations: Card[][];
  tableau: Card[][];
  drawCount: 1 | 3;
  moves: number;
};

export type Target = { pile: "foundation"; i: number } | { pile: "tableau"; i: number };
export type Loc = { pile: "waste" } | { pile: "foundation"; i: number } | { pile: "tableau"; i: number; index: number };

export const isRed = (s: Suit) => s === "H" || s === "D";

/** Small seeded PRNG so a deal can be reproduced in tests. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function newGame(drawCount: 1 | 3 = 1, seed: number = Date.now()): Game {
  const rand = mulberry32(seed);
  const deck: Card[] = [];
  for (const suit of SUITS) for (let rank = 1; rank <= 13; rank++) deck.push({ id: `${suit}${rank}`, suit, rank, up: false });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  const tableau: Card[][] = [];
  for (let i = 0; i < 7; i++) {
    const pile = deck.splice(0, i + 1);
    pile[pile.length - 1].up = true;
    tableau.push(pile);
  }
  return { stock: deck, waste: [], foundations: [[], [], [], []], tableau, drawCount, moves: 0 };
}

const copyPile = (p: Card[]) => p.map((c) => ({ ...c }));

export function cloneGame(g: Game): Game {
  return {
    stock: copyPile(g.stock),
    waste: copyPile(g.waste),
    foundations: g.foundations.map(copyPile),
    tableau: g.tableau.map(copyPile),
    drawCount: g.drawCount,
    moves: g.moves,
  };
}

/** The cards that would be picked up from a location (empty if none can be). */
export function cardsAt(g: Game, from: Loc): Card[] {
  if (from.pile === "waste") return g.waste.length ? [g.waste[g.waste.length - 1]] : [];
  if (from.pile === "foundation") {
    const f = g.foundations[from.i];
    return f.length ? [f[f.length - 1]] : [];
  }
  const pile = g.tableau[from.i];
  const card = pile?.[from.index];
  return card?.up ? pile.slice(from.index) : [];
}

export function canDrop(g: Game, cards: Card[], to: Target): boolean {
  const first = cards[0];
  if (!first) return false;
  if (to.pile === "foundation") {
    if (cards.length !== 1) return false;
    const f = g.foundations[to.i];
    const top = f[f.length - 1];
    return top ? top.suit === first.suit && first.rank === top.rank + 1 : first.rank === 1;
  }
  const pile = g.tableau[to.i];
  const top = pile[pile.length - 1];
  return top ? top.up && isRed(top.suit) !== isRed(first.suit) && first.rank === top.rank - 1 : first.rank === 13;
}

export function move(g: Game, from: Loc, to: Target): Game | null {
  if (from.pile !== "waste" && from.pile === to.pile && from.i === to.i) return null;
  const cards = cardsAt(g, from);
  if (!cards.length || !canDrop(g, cards, to)) return null;

  const ng = cloneGame(g);
  let moved: Card[];
  if (from.pile === "waste") moved = [ng.waste.pop()!];
  else if (from.pile === "foundation") moved = [ng.foundations[from.i].pop()!];
  else {
    const src = ng.tableau[from.i];
    moved = src.splice(from.index);
    const exposed = src[src.length - 1];
    if (exposed && !exposed.up) exposed.up = true;
  }
  (to.pile === "foundation" ? ng.foundations[to.i] : ng.tableau[to.i]).push(...moved);
  ng.moves += 1;
  return ng;
}

/** Turn cards from the stock, or recycle the waste when the stock is empty. */
export function draw(g: Game): Game | null {
  if (!g.stock.length && !g.waste.length) return null;
  const ng = cloneGame(g);
  if (!ng.stock.length) {
    ng.stock = ng.waste.reverse().map((c) => ({ ...c, up: false }));
    ng.waste = [];
  } else {
    const n = Math.min(ng.drawCount, ng.stock.length);
    for (let k = 0; k < n; k++) {
      const c = ng.stock.pop()!;
      c.up = true;
      ng.waste.push(c);
    }
  }
  ng.moves += 1;
  return ng;
}

/** Best destination for a quick click: a foundation first, then the first useful tableau pile. */
export function autoTarget(g: Game, from: Loc): Target | null {
  const cards = cardsAt(g, from);
  if (!cards.length) return null;
  if (cards.length === 1 && from.pile !== "foundation") {
    for (let i = 0; i < 4; i++) if (canDrop(g, cards, { pile: "foundation", i })) return { pile: "foundation", i };
  }
  for (let i = 0; i < 7; i++) {
    if (from.pile === "tableau" && from.i === i) continue;
    const target: Target = { pile: "tableau", i };
    if (!canDrop(g, cards, target)) continue;
    // Moving a king that already sits at the bottom of a pile onto another empty pile achieves nothing.
    if (from.pile === "tableau" && from.index === 0 && g.tableau[i].length === 0) continue;
    return target;
  }
  return null;
}

export const isWon = (g: Game) => g.foundations.every((f) => f.length === 13);

export const canAutoComplete = (g: Game) =>
  !isWon(g) && g.stock.length === 0 && g.waste.length === 0 && g.tableau.every((p) => p.every((c) => c.up));

/** One foundation move, lowest rank first. Used to animate "auto-finish". */
export function autoStep(g: Game): Game | null {
  const sources: Loc[] = [{ pile: "waste" }, ...g.tableau.map((p, i): Loc => ({ pile: "tableau", i, index: p.length - 1 }))];
  let best: { from: Loc; to: Target; rank: number } | null = null;
  for (const from of sources) {
    const [card] = cardsAt(g, from).slice(-1);
    if (!card || cardsAt(g, from).length !== 1) continue;
    for (let i = 0; i < 4; i++) {
      const to: Target = { pile: "foundation", i };
      if (canDrop(g, [card], to) && (!best || card.rank < best.rank)) best = { from, to, rank: card.rank };
    }
  }
  return best ? move(g, best.from, best.to) : null;
}
