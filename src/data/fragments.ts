export type FragmentKind = "scene" | "person" | "sound" | "feeling" | "sentence";
export type Fragment = { id: number; kind: FragmentKind; x: number; y: number };

// Positions are a composed field rather than a chronological order.
export const fragments: Fragment[] = [
  { id: 0, kind: "scene", x: 4, y: 5 }, { id: 1, kind: "sound", x: 30, y: 8 },
  { id: 2, kind: "person", x: 53, y: 4 }, { id: 3, kind: "scene", x: 78, y: 8 },
  { id: 4, kind: "scene", x: 7, y: 23 }, { id: 5, kind: "person", x: 29, y: 27 },
  { id: 6, kind: "feeling", x: 55, y: 24 }, { id: 7, kind: "sound", x: 77, y: 26 },
  { id: 8, kind: "scene", x: 3, y: 45 }, { id: 9, kind: "feeling", x: 31, y: 43 },
  { id: 10, kind: "scene", x: 52, y: 47 }, { id: 11, kind: "sound", x: 79, y: 43 },
  { id: 12, kind: "scene", x: 6, y: 61 }, { id: 13, kind: "sentence", x: 28, y: 65 },
  { id: 14, kind: "sound", x: 55, y: 62 }, { id: 15, kind: "person", x: 77, y: 66 },
  { id: 16, kind: "feeling", x: 3, y: 81 }, { id: 17, kind: "sentence", x: 31, y: 82 },
  { id: 18, kind: "scene", x: 52, y: 80 }, { id: 19, kind: "feeling", x: 79, y: 83 }
];

export type Link = { a: number; b: number; id: string };
export function linkId(a: number, b: number) { return [Math.min(a, b), Math.max(a, b)].join(":"); }
