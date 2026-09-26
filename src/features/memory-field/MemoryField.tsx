"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fragments, linkId, type Link } from "../../data/fragments";
import type { Dictionary } from "../../i18n/config";

type Point = { x: number; y: number };
type Drag = { from: number; startX: number; startY: number; x: number; y: number };

export function MemoryField({ t, sound }: { t: Dictionary["field"]; sound: boolean }) {
  const [links, setLinks] = useState<Link[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [active, setActive] = useState<Link | null>(null);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [points, setPoints] = useState<Record<number, Point>>({});
  const [announcement, setAnnouncement] = useState("");
  const fieldRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const selectedRef = useRef<number | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const proximityFrame = useRef<number | null>(null);

  const measure = useCallback(() => {
    const field = fieldRef.current;
    if (!field) return;
    const bounds = field.getBoundingClientRect();
    const next: Record<number, Point> = {};
    field.querySelectorAll<HTMLElement>("[data-fragment]").forEach((el) => {
      const rect = el.getBoundingClientRect();
      next[Number(el.dataset.fragment)] = { x: rect.left - bounds.left + rect.width / 2, y: rect.top - bounds.top + rect.height / 2 };
    });
    setPoints(next);
  }, []);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    const observer = new ResizeObserver(measure);
    observer.observe(field);
    field.querySelectorAll("[data-fragment]").forEach((el) => observer.observe(el));
    const frame = requestAnimationFrame(measure);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [measure, t]);

  useEffect(() => () => {
    if (proximityFrame.current !== null) cancelAnimationFrame(proximityFrame.current);
  }, []);

  function proximity(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || proximityFrame.current !== null) return;
    const x = event.clientX, y = event.clientY;
    proximityFrame.current = requestAnimationFrame(() => {
      fieldRef.current?.querySelectorAll<HTMLElement>("[data-fragment]").forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const distance = Math.hypot(x - (bounds.left + bounds.width / 2), y - (bounds.top + bounds.height / 2));
        if (distance < 175) element.dataset.near = "true";
        else delete element.dataset.near;
      });
      proximityFrame.current = null;
    });
  }

  function clearProximity() {
    fieldRef.current?.querySelectorAll<HTMLElement>("[data-near]").forEach((element) => delete element.dataset.near);
  }

  function chime() {
    if (!sound) return;
    try {
      const context = audioRef.current ?? new AudioContext();
      audioRef.current = context;
      void context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(320, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(440, context.currentTime + 0.28);
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.65);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(); oscillator.stop(context.currentTime + 0.68);
    } catch { /* Silence remains a valid mode if audio is unavailable. */ }
  }

  function choose(id: number) {
    const first = selectedRef.current;
    if (first === null) {
      selectedRef.current = id;
      setSelected(id);
      setAnnouncement(`${t.selected}: ${t.fragments[id]}`);
      return;
    }
    selectedRef.current = null;
    setSelected(null);
    if (first === id) return;
    const key = linkId(first, id);
    const link = { a: first, b: id, id: key };
    setLinks((previous) => previous.some((item) => item.id === key) ? previous : [...previous, link]);
    setActive(link);
    setAnnouncement(`${t.linked}: ${t.fragments[first]} / ${t.fragments[id]}`);
    chime();
  }

  function pointerDown(event: React.PointerEvent<HTMLButtonElement>, id: number) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { from: id, startX: event.clientX, startY: event.clientY, x: event.clientX, y: event.clientY };
  }

  function pointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const current = dragRef.current;
    if (!current) return;
    const next = { ...current, x: event.clientX, y: event.clientY };
    dragRef.current = next;
    if (Math.hypot(next.x - next.startX, next.y - next.startY) > 8) {
      const bounds = fieldRef.current?.getBoundingClientRect();
      if (bounds) setDrag({ ...next, x: next.x - bounds.left, y: next.y - bounds.top });
    }
  }

  function pointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    const current = dragRef.current;
    if (!current) return;
    const moved = Math.hypot(event.clientX - current.startX, event.clientY - current.startY) > 8;
    dragRef.current = null;
    setDrag(null);
    if (moved) {
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>("[data-fragment]");
      const targetId = target ? Number(target.dataset.fragment) : current.from;
      if (targetId !== current.from) {
        selectedRef.current = current.from;
        setSelected(current.from);
        choose(targetId);
      }
    } else choose(current.from);
  }

  const dragPoint = drag ? { x: drag.x, y: drag.y } : null;
  const echoIndex = active ? (active.a * 7 + active.b * 3) % t.echoes.length : 0;
  const connected = new Set(links.flatMap((link) => [link.a, link.b]));

  return (
    <section id="field" className="section field-section" aria-labelledby="field-title">
      <div className="section-head field-head">
        <div><p className="eyebrow">{t.kicker}</p><h2 id="field-title">{t.title}</h2></div>
        <p className="section-intro">{t.intro}</p>
      </div>
      <div className="field-instructions"><span>{t.instruction}</span><span className="touch-help">{t.touchInstruction}</span><span className="keyboard-help">{t.keyboardInstruction}</span></div>
      <p className="sr-only" id="field-access">{t.accessibility}</p>
      <div className="field-frame">
        <div className="field-topline"><span>COMB / 001</span><span>{String(links.length).padStart(2, "0")} {t.count}</span></div>
        <div className="memory-field" ref={fieldRef} aria-describedby="field-access" onPointerMove={proximity} onPointerLeave={clearProximity}>
          <div className="field-grain" aria-hidden="true" />
          <svg className="connections" aria-hidden="true" width="100%" height="100%">
            <defs><linearGradient id="thread" x1="0" x2="1"><stop stopColor="#baa78d" stopOpacity=".15" /><stop offset=".5" stopColor="#d9d2c7" stopOpacity=".7" /><stop offset="1" stopColor="#8895a7" stopOpacity=".18" /></linearGradient></defs>
            {links.map((link) => points[link.a] && points[link.b] && <g key={link.id}>
              <line x1={points[link.a].x} y1={points[link.a].y} x2={points[link.b].x} y2={points[link.b].y} stroke="url(#thread)" strokeWidth="1" />
              <circle cx={(points[link.a].x + points[link.b].x) / 2} cy={(points[link.a].y + points[link.b].y) / 2} r="2" fill="#baa78d" opacity=".8" />
            </g>)}
            {dragPoint && points[drag!.from] && <line x1={points[drag!.from].x} y1={points[drag!.from].y} x2={dragPoint.x} y2={dragPoint.y} stroke="#baa78d" strokeWidth="1" strokeDasharray="3 5" />}
          </svg>
          <div className="fragments-grid">
            {fragments.map((fragment) => <button
              key={fragment.id} type="button" data-fragment={fragment.id}
              className={`fragment ${selected === fragment.id ? "is-selected" : ""} ${connected.has(fragment.id) ? "is-connected" : ""}`}
              style={{ "--x": `${fragment.x}%`, "--y": `${fragment.y}%` } as React.CSSProperties}
              aria-pressed={selected === fragment.id}
              aria-label={`${t.types[fragment.kind]} ${String(fragment.id + 1).padStart(2, "0")}: ${t.fragments[fragment.id]}`}
              onPointerDown={(event) => pointerDown(event, fragment.id)} onPointerMove={pointerMove} onPointerUp={pointerUp}
              onPointerCancel={() => { dragRef.current = null; setDrag(null); }}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(fragment.id); } }}
            ><span className="fragment-index">{String(fragment.id + 1).padStart(2, "0")} / {t.types[fragment.kind]}</span><span className="fragment-text">{t.fragments[fragment.id]}</span><span className="fragment-mark" aria-hidden="true">+</span></button>)}
          </div>
        </div>
        <div className="field-bottomline"><span>{t.residue}</span><div>{selected !== null && <button type="button" onClick={() => { selectedRef.current = null; setSelected(null); }}>{t.clearSelection}</button>}{links.length > 0 && <button type="button" onClick={() => { setLinks([]); setActive(null); selectedRef.current = null; setSelected(null); }}>{t.reset}</button>}</div></div>
      </div>
      <div className="echo-panel" aria-live="polite"><div><p className="eyebrow">{t.relationTitle}</p><p className="echo-text">{active ? t.echoes[echoIndex] : t.relationEmpty}</p>{active && <p className="echo-detail">{t.relationActive}</p>}</div><span className="echo-symbol" aria-hidden="true">∽</span></div>
      {links.length > 0 && <ol className="link-list" aria-label={t.count}>{links.map((link) => <li key={link.id}><button type="button" className="link-entry" onClick={() => setActive(link)}><span>{t.fragments[link.a]}</span><span className="link-divider" aria-hidden="true">∽</span><span>{t.fragments[link.b]}</span></button><button type="button" className="remove-link" aria-label={`${t.removeLink}: ${t.fragments[link.a]} / ${t.fragments[link.b]}`} onClick={() => { setLinks((items) => items.filter((item) => item.id !== link.id)); if (active?.id === link.id) setActive(null); }}>×</button></li>)}</ol>}
      <span className="sr-only" role="status">{announcement}</span>
    </section>
  );
}
