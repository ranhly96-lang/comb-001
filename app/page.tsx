"use client";

import { useEffect, useState } from "react";
import { detectLocale, LANGUAGE_KEY, type Locale } from "../src/i18n/config";
import { dictionaries } from "../src/i18n";
import { MemoryField } from "../src/features/memory-field/MemoryField";
import { Reflection } from "../src/features/reflection/Reflection";

const labels: Record<Locale, string> = { "zh-CN": "中文", en: "EN", ja: "日本語" };

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [sound, setSound] = useState(false);
  const [conceptOpen, setConceptOpen] = useState(false);
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = localStorage.getItem(LANGUAGE_KEY);
        setLocale(stored === "en" || stored === "zh-CN" || stored === "ja" ? stored : detectLocale(navigator.language));
      } catch { setLocale(detectLocale(navigator.language)); }
    });
  }, []);
  const t = dictionaries[locale];
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.seo.description);
  }, [locale, t]);
  function switchLocale(next: Locale) {
    setLocale(next);
    try { localStorage.setItem(LANGUAGE_KEY, next); } catch { /* Keep in-memory preference. */ }
  }

  return <>
    <a className="skip-link" href="#concept">{t.nav.skip}</a>
    <header className="site-header"><a className="brand" href="#entrance" aria-label="COMB">COMB<span className="brand-slash"> / </span><span className="brand-number">001</span></a>
      <nav className="desktop-nav" aria-label={t.nav.main}><a href="#concept">{t.nav.concept}</a><a href="#principles">{t.nav.principles}</a><a href="#field">{t.nav.field}</a><a href="#remains">{t.nav.remains}</a><a href="#about">{t.nav.about}</a></nav>
      <div className="language-control" role="group" aria-label={t.nav.language}>{(["zh-CN", "en", "ja"] as const).map((item) => <button type="button" key={item} lang={item} aria-pressed={locale === item} className={locale === item ? "active" : ""} onClick={() => switchLocale(item)}>{labels[item]}</button>)}</div>
    </header>
    <nav className="mobile-nav" aria-label={t.nav.main}><a href="#concept">{t.nav.concept}</a><a href="#principles">{t.nav.principles}</a><a href="#field">{t.nav.field}</a><a href="#remains">{t.nav.remains}</a><a href="#about">{t.nav.about}</a></nav>
    <main>
      <section id="entrance" className="entrance" aria-labelledby="entrance-title"><div className="entrance-lines" aria-hidden="true"><span /><span /><span /><span /><span /></div><div className="entrance-inner"><div className="entrance-meta"><span>001 — 005</span><span>{t.entrance.auxiliary}</span></div><div className="hero-core"><p className="hero-edition">{t.entrance.edition}</p><h1 id="entrance-title">COMB<span className="hero-period">.</span></h1><p className="hero-alias">{t.entrance.alias}</p><p className="hero-line">{t.entrance.line}</p><div className="hero-actions"><a className="enter-link" href="#concept">{t.entrance.enter}<span aria-hidden="true">↘</span></a><button className="sound-toggle" type="button" aria-pressed={sound} onClick={() => setSound(!sound)}><span className="sound-icon" aria-hidden="true">◌</span>{sound ? t.entrance.soundOn : t.entrance.soundOff}</button></div></div><div className="entrance-bottom"><span>{t.entrance.scroll}</span><span>COMB / 001</span></div></div></section>

      <section id="concept" className="section concept-section" aria-labelledby="concept-title"><div className="section-head"><p className="eyebrow">{t.concept.kicker}</p><span className="section-rule" /></div><div className="concept-layout"><div className="concept-side"><span className="comb-symbol" aria-hidden="true">≋</span><p>COMB / 001</p></div><div className="concept-body"><h2 id="concept-title">{t.concept.title}</h2><p className="concept-lead">{t.concept.lead}</p><div className="concept-copy">{t.concept.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div><blockquote>{t.concept.combLine}</blockquote><button type="button" className="disclosure" aria-expanded={conceptOpen} aria-controls="full-concept" onClick={() => setConceptOpen(!conceptOpen)}><span>{conceptOpen ? t.concept.close : t.concept.open}</span><span aria-hidden="true">{conceptOpen ? "−" : "+"}</span></button>{conceptOpen && <div id="full-concept" className="statement"><h3>{t.concept.statementTitle}</h3>{t.concept.statement.map((paragraph, i) => <p key={i}>{paragraph}</p>)}<p className="statement-boundary">{t.concept.boundary}</p></div>}</div></div></section>

      <section id="principles" className="section principles-section" aria-labelledby="principles-title"><div className="section-head"><p className="eyebrow">{t.principles.kicker}</p><h2 id="principles-title">{t.principles.title}</h2></div><div className="principles-list">{t.principles.items.map((item, i) => <article key={i} className={`principle principle-${i + 1}`}><span className="principle-number">0{i + 1}</span><div className="principle-content"><h3>{item.name}</h3><p className="principle-definition">{item.definition}</p><p className="principle-detail">{item.detail}</p></div><span className="principle-mark" aria-hidden="true">{["↗", "∽", "·", "∥", "○"][i]}</span></article>)}</div></section>

      <MemoryField t={t.field} sound={sound} />
      <Reflection t={t.remains} locale={locale} />

      <section id="about" className="section about-section" aria-labelledby="about-title"><div className="section-head"><p className="eyebrow">{t.about.kicker}</p><h2 id="about-title">{t.about.title}</h2></div><div className="about-columns"><article><span className="about-index">I</span><h3>{t.about.original}</h3>{t.about.originalText.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</article><article><span className="about-index">II</span><h3>{t.about.interpretation}</h3>{t.about.interpretationText.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</article></div><p className="about-signature">{t.about.attribution}</p></section>
    </main>
    <footer className="site-footer"><div><span className="footer-brand">COMB<span>.</span></span><p>{t.footer.line}</p></div><div><p>{t.footer.local}</p><a href="#entrance">{t.footer.top} ↑</a></div></footer>
  </>;
}
