import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as RPointerEvent } from "react";
import { useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { sfx } from "@/sound/sfx";
import { scaleOf } from "../../scale";
import { useWindows } from "../../windowStore";
import { CardView, GLYPH } from "./Card";
import {
  autoStep,
  autoTarget,
  canAutoComplete,
  cardsAt,
  draw,
  isWon,
  move,
  newGame,
  SUITS,
  type Card,
  type Game,
  type Loc,
  type Target,
} from "./engine";
import "./solitaire.css";

type Stats = { wins: number; best: number | null };
const STATS_KEY = "mss-solitaire";

function loadStats(): Stats {
  try {
    const raw = JSON.parse(localStorage.getItem(STATS_KEY) ?? "null");
    if (raw && typeof raw.wins === "number") return { wins: raw.wins, best: typeof raw.best === "number" ? raw.best : null };
  } catch {
    /* corrupt or blocked storage */
  }
  return { wins: 0, best: null };
}

function saveStats(st: Stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(st));
  } catch {
    /* storage blocked */
  }
}

const fmtTime = (ms: number) => {
  const total = Math.floor(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

const sameLoc = (a: Loc | null, b: Loc) => !!a && JSON.stringify(a) === JSON.stringify(b);

/** Where a click on a location would drop the selected cards. */
const targetOf = (loc: Loc): Target | null =>
  loc.pile === "foundation" ? { pile: "foundation", i: loc.i } : loc.pile === "tableau" ? { pile: "tableau", i: loc.i } : null;

function dropTargetAt(x: number, y: number): Target | null {
  for (const el of document.elementsFromPoint(x, y)) {
    const zone = el.closest<HTMLElement>("[data-drop]");
    if (!zone) continue;
    const code = zone.dataset.drop!;
    const i = Number(code.slice(1));
    return code[0] === "f" ? { pile: "foundation", i } : { pile: "tableau", i };
  }
  return null;
}

type Drag = { from: Loc; ids: Set<string>; px: number; py: number; dx: number; dy: number; scale: number; moved: boolean };

/** Stable confetti layout for the win screen (original: falling suit glyphs). */
const CONFETTI = Array.from({ length: 28 }, (_, k) => ({
  glyph: GLYPH[SUITS[k % 4]],
  red: k % 4 === 1 || k % 4 === 2,
  x: (k * 37) % 100,
  delay: (k % 7) * 0.35,
  dur: 2.6 + (k % 5) * 0.45,
}));

export default function Solitaire() {
  const { t } = useT();
  const compact = useWindows((st) => st.compact);
  const [game, setGame] = useState<Game>(() => newGame(1));
  const [history, setHistory] = useState<Game[]>([]);
  const [selected, setSelected] = useState<Loc | null>(null);
  const [drag, setDrag] = useState<Drag | null>(null);
  const dragRef = useRef<Drag | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [finalTime, setFinalTime] = useState<number | null>(null);
  const [autoRunning, setAutoRunning] = useState(false);
  const [stats, setStats] = useState(loadStats);
  const won = finalTime !== null;

  // ---- state transitions -------------------------------------------------
  const commit = (next: Game | null, sound: () => void = sfx.click) => {
    if (!next) return false;
    setHistory((h) => [...h.slice(-199), game]);
    setGame(next);
    if (startedAt === null) {
      const t0 = Date.now();
      setStartedAt(t0);
      setNow(t0); // otherwise `now` is from mount time and the clock reads negative
    }
    sound();
    return true;
  };

  const tryMove = (from: Loc, to: Target) => commit(move(game, from, to));

  const autoMove = (loc: Loc) => {
    const to = autoTarget(game, loc);
    return to ? tryMove(loc, to) : false;
  };

  const restart = (drawCount: 1 | 3 = game.drawCount) => {
    setGame(newGame(drawCount));
    setHistory([]);
    setSelected(null);
    setStartedAt(null);
    setFinalTime(null);
    setAutoRunning(false);
    sfx.open();
  };

  const undo = () => {
    if (!history.length || autoRunning) return;
    setGame(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
    setSelected(null);
    setFinalTime(null);
    sfx.click();
  };

  // ---- clicks --------------------------------------------------------------
  const clickLoc = (loc: Loc) => {
    if (won || autoRunning) return;
    if (selected) {
      if (sameLoc(selected, loc)) {
        autoMove(loc);
        setSelected(null);
        return;
      }
      const to = targetOf(loc);
      if (to && tryMove(selected, to)) {
        setSelected(null);
        return;
      }
    }
    if (compact && autoMove(loc)) {
      setSelected(null);
      return;
    }
    setSelected(cardsAt(game, loc).length ? loc : null);
  };

  const clickEmpty = (to: Target) => {
    if (selected && tryMove(selected, to)) setSelected(null);
  };

  const clickStock = () => {
    if (won || autoRunning) return;
    setSelected(null);
    commit(draw(game));
  };

  // ---- drag & drop ---------------------------------------------------------
  const onCardDown = (loc: Loc) => (e: RPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || won || autoRunning) return;
    const cards = cardsAt(game, loc);
    if (!cards.length || !boardRef.current) return;
    e.preventDefault();
    boardRef.current.setPointerCapture(e.pointerId);
    dragRef.current = {
      from: loc,
      ids: new Set(cards.map((c) => c.id)),
      px: e.clientX,
      py: e.clientY,
      dx: 0,
      dy: 0,
      scale: scaleOf(e.currentTarget),
      moved: false,
    };
  };

  const onBoardMove = (e: RPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = (e.clientX - d.px) / d.scale;
    const dy = (e.clientY - d.py) / d.scale;
    if (!d.moved && Math.hypot(dx, dy) < 4) return;
    d.moved = true;
    d.dx = dx;
    d.dy = dy;
    setDrag({ ...d });
  };

  const onBoardUp = (e: RPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    dragRef.current = null;
    setDrag(null);
    if (!d) return;
    if (!d.moved) {
      clickLoc(d.from);
      return;
    }
    const to = dropTargetAt(e.clientX, e.clientY);
    if (to && tryMove(d.from, to)) setSelected(null);
  };

  const onBoardCancel = () => {
    dragRef.current = null;
    setDrag(null);
  };

  const keyActivate = (loc: Loc) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      clickLoc(loc);
    }
  };

  // ---- effects -------------------------------------------------------------
  useEffect(() => {
    if (startedAt === null || won) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [startedAt, won]);

  useEffect(() => {
    if (!isWon(game) || won) return;
    const time = Date.now() - (startedAt ?? Date.now());
    setFinalTime(time);
    setAutoRunning(false);
    setStats((prev) => {
      const next = { wins: prev.wins + 1, best: prev.best === null ? time : Math.min(prev.best, time) };
      saveStats(next);
      return next;
    });
    sfx.chime();
  }, [game, won, startedAt]);

  useEffect(() => {
    if (!autoRunning) return;
    const id = window.setTimeout(() => {
      const next = autoStep(game);
      if (next) {
        setHistory((h) => [...h.slice(-199), game]);
        setGame(next);
        sfx.click();
      } else setAutoRunning(false);
    }, 110);
    return () => window.clearTimeout(id);
  }, [autoRunning, game]);

  // ---- rendering helpers ----------------------------------------------------
  const selectedIds = useMemo(() => new Set(selected ? cardsAt(game, selected).map((c) => c.id) : []), [game, selected]);

  const cardProps = (card: Card, loc: Loc | null, base: CSSProperties) => {
    const dragging = drag?.ids.has(card.id);
    const style: CSSProperties = dragging ? { ...base, transform: `translate(${drag!.dx}px, ${drag!.dy}px)` } : base;
    const cls = [dragging ? "is-dragging" : "", selectedIds.has(card.id) ? "is-selected" : ""].join(" ");
    if (!loc || !card.up) return { style, className: cls };
    return {
      style,
      className: `${cls} is-live`,
      role: "button",
      tabIndex: 0,
      onPointerDown: onCardDown(loc),
      onKeyDown: keyActivate(loc),
    };
  };

  const elapsed = finalTime ?? (startedAt === null ? 0 : Math.max(0, now - startedAt));
  const wasteShown = game.waste.slice(game.drawCount === 3 ? -3 : -2);

  return (
    <div className="sol">
      <div className="toolbar sol-toolbar">
        <button className="btn btn-sm btn-primary" onClick={() => restart()}>
          {t(s.solitaire.newGame)}
        </button>
        <button className="btn btn-sm" onClick={undo} disabled={!history.length || autoRunning}>
          {t(s.solitaire.undo)}
        </button>
        <div className="seg" role="radiogroup" aria-label={t(s.solitaire.drawMode)}>
          {([1, 3] as const).map((n) => (
            <button
              key={n}
              role="radio"
              aria-checked={game.drawCount === n}
              className={`btn btn-sm${game.drawCount === n ? " is-pressed" : ""}`}
              onClick={() => game.drawCount !== n && restart(n)}
            >
              {t(n === 1 ? s.solitaire.draw1 : s.solitaire.draw3)}
            </button>
          ))}
        </div>
        {canAutoComplete(game) && !autoRunning && (
          <button className="btn btn-sm" onClick={() => setAutoRunning(true)}>
            {t(s.solitaire.autoFinish)}
          </button>
        )}
      </div>

      <div
        ref={boardRef}
        className={`sol-board${won ? " is-won" : ""}${drag ? " is-dragging-any" : ""}`}
        dir="ltr"
        onPointerMove={onBoardMove}
        onPointerUp={onBoardUp}
        onPointerCancel={onBoardCancel}
      >
        <div className="sol-top">
          <div className="slot slot-stock" onClick={clickStock} role="button" aria-label={t(s.solitaire.stock)}>
            {game.stock.length ? (
              <CardView card={game.stock[game.stock.length - 1]} />
            ) : (
              game.waste.length > 0 && <span className="slot-mark">↻</span>
            )}
            {game.stock.length > 0 && <span className="slot-count">{game.stock.length}</span>}
          </div>

          <div className="slot slot-waste">
            {wasteShown.map((c, k) => {
              const isTop = k === wasteShown.length - 1;
              const left = game.drawCount === 3 ? `calc(var(--fan) * ${k})` : 0;
              return <CardView key={c.id} card={c} {...cardProps(c, isTop ? { pile: "waste" } : null, { left, zIndex: k })} />;
            })}
          </div>

          <div aria-hidden="true" />

          {game.foundations.map((f, i) => (
            <div
              key={i}
              className="slot slot-found"
              data-drop={`f${i}`}
              onClick={(e) => e.target === e.currentTarget && clickEmpty({ pile: "foundation", i })}
            >
              {!f.length && <span className="slot-mark">A</span>}
              {f.slice(-2).map((c, k, arr) => (
                <CardView
                  key={c.id}
                  card={c}
                  {...cardProps(c, k === arr.length - 1 ? { pile: "foundation", i } : null, { zIndex: k, ["--k" as string]: i })}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="sol-tableau">
          {game.tableau.map((pile, i) => {
            let downs = 0;
            let ups = 0;
            const cards = pile.map((c, j) => {
              const top = `calc(var(--down) * ${downs} + var(--up) * ${ups})`;
              if (c.up) ups++;
              else downs++;
              return <CardView key={c.id} card={c} {...cardProps(c, { pile: "tableau", i, index: j }, { top, zIndex: j })} />;
            });
            const last = pile[pile.length - 1];
            const height = pile.length
              ? `calc(var(--ch) + var(--down) * ${downs - (last.up ? 0 : 1)} + var(--up) * ${ups - (last.up ? 1 : 0)})`
              : "var(--ch)";
            return (
              <div
                key={i}
                className={`sol-col${pile.length ? "" : " is-empty"}`}
                data-drop={`t${i}`}
                style={{ height }}
                onClick={(e) => e.target === e.currentTarget && clickEmpty({ pile: "tableau", i })}
              >
                {cards}
              </div>
            );
          })}
        </div>

        {won && (
          <>
            <div className="sol-confetti" aria-hidden="true">
              {CONFETTI.map((c, k) => (
                <span
                  key={k}
                  className={c.red ? "is-red" : ""}
                  style={{ left: `${c.x}%`, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }}
                >
                  {c.glyph}
                </span>
              ))}
            </div>
            <div className="sol-win bevel-out" role="dialog" aria-label={t(s.solitaire.youWin)}>
              <div className="sol-win-title">{t(s.solitaire.youWin)}</div>
              <p>
                {t(s.solitaire.time)}: <strong>{fmtTime(elapsed)}</strong> · {t(s.solitaire.moves)}: <strong>{game.moves}</strong>
              </p>
              <button className="btn btn-primary" onClick={() => restart()}>
                {t(s.solitaire.playAgain)}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="statusbar">
        <span className="bevel-in">
          {t(s.solitaire.moves)}: {game.moves}
        </span>
        <span className="bevel-in">
          {t(s.solitaire.time)}: {fmtTime(elapsed)}
        </span>
        <span className="bevel-in grow">
          {t(s.solitaire.wins)}: {stats.wins}
          {stats.best !== null && (
            <>
              {" "}
              · {t(s.solitaire.best)}: {fmtTime(stats.best)}
            </>
          )}
        </span>
      </div>
    </div>
  );
}
