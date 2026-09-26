export const locales = ["en", "zh-CN", "ja"] as const;
export type Locale = (typeof locales)[number];

export function detectLocale(language: string): Locale {
  if (language.toLowerCase().startsWith("zh")) return "zh-CN";
  if (language.toLowerCase().startsWith("ja")) return "ja";
  return "en";
}

export const LANGUAGE_KEY = "comb.locale.v1";
export const REFLECTION_KEY = "comb.reflection.v1";

export type Dictionary = {
  seo: { title: string; description: string };
  nav: { main: string; language: string; concept: string; principles: string; field: string; remains: string; about: string; skip: string };
  entrance: { auxiliary: string; alias: string; edition: string; line: string; enter: string; scroll: string; soundOn: string; soundOff: string };
  concept: { kicker: string; title: string; lead: string; paragraphs: string[]; combLine: string; open: string; close: string; statementTitle: string; statement: string[]; boundary: string };
  principles: { kicker: string; title: string; items: { name: string; definition: string; detail: string }[] };
  field: { kicker: string; title: string; intro: string; instruction: string; touchInstruction: string; keyboardInstruction: string; linkLabel: string; linked: string; selected: string; clearSelection: string; removeLink: string; reset: string; count: string; relationTitle: string; relationEmpty: string; relationActive: string; residue: string; types: { scene: string; person: string; sound: string; feeling: string; sentence: string }; fragments: string[]; echoes: string[]; accessibility: string };
  remains: { kicker: string; title: string; intro: string; label: string; placeholder: string; save: string; saved: string; delete: string; exportTxt: string; exportJson: string; privacy: string; missing: string; storageError: string; deleteConfirm: string };
  about: { kicker: string; title: string; original: string; originalText: string[]; interpretation: string; interpretationText: string[]; attribution: string };
  footer: { line: string; local: string; top: string };
};
