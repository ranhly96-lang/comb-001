"use client";

import { useEffect, useState } from "react";
import { REFLECTION_KEY, type Dictionary, type Locale } from "../../i18n/config";

function download(filename: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = filename; anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function Reflection({ t, locale }: { t: Dictionary["remains"]; locale: Locale }) {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    queueMicrotask(() => {
      try { const previous = localStorage.getItem(REFLECTION_KEY) ?? ""; setValue(previous); setSaved(previous); }
      catch { /* Private browsing can disallow storage. */ }
    });
  }, []);
  function save() {
    if (!value.trim()) { setMessage(t.missing); return; }
    try { localStorage.setItem(REFLECTION_KEY, value.trim()); setSaved(value.trim()); setMessage(t.saved); }
    catch { setMessage(t.storageError); }
  }
  function remove() {
    try { localStorage.removeItem(REFLECTION_KEY); } catch { /* Clear UI regardless. */ }
    setSaved(""); setValue(""); setMessage(t.deleteConfirm);
  }
  return <section id="remains" className="section remains-section" aria-labelledby="remains-title">
    <div className="remains-layout"><div><p className="eyebrow">{t.kicker}</p><h2 id="remains-title">{t.title}</h2><p className="remains-intro">{t.intro}</p><span className="remains-glyph" aria-hidden="true">∿</span></div>
      <div className="reflection-form"><label htmlFor="trace">{t.label}</label><textarea id="trace" maxLength={700} value={value} onChange={(event) => { setValue(event.target.value); setMessage(""); }} placeholder={t.placeholder} rows={5} /><div className="reflection-actions"><button className="primary-action" type="button" onClick={save}>{t.save}<span aria-hidden="true">↗</span></button>{saved && <button type="button" className="text-action" onClick={remove}>{t.delete}</button>}</div><p className="form-message" role="status">{message}</p>{saved && <div className="export-actions"><button type="button" onClick={() => download("comb-trace.txt", saved + "\n", "text/plain;charset=utf-8")}>{t.exportTxt} ↗</button><button type="button" onClick={() => download("comb-trace.json", JSON.stringify({ work: "COMB / 001", locale, text: saved }, null, 2) + "\n", "application/json;charset=utf-8")}>{t.exportJson} ↗</button></div>}<p className="privacy-note">{t.privacy}</p></div>
    </div>
  </section>;
}
