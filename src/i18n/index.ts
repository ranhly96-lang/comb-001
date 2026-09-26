import { en } from "./dictionaries/en";
import { zhCN } from "./dictionaries/zh-CN";
import { ja } from "./dictionaries/ja";
import type { Dictionary, Locale } from "./config";

export const dictionaries: Record<Locale, Dictionary> = { en, "zh-CN": zhCN, ja };
