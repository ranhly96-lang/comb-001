# COMB content guide

The work's master name remains **COMB** in every locale. Auxiliary titles are 梳子 and 櫛（くし）. The edition is **COMB / 001**; its theme is The Entanglement / 粘连 / 絡み合い（からみあい）.

The English declaration is “Some memories were never separate.” Chinese: “有些记忆，从未真正彼此分离。” Japanese: “ある記憶は、初めから切り離されたものではなかった。” Preserve this conceptual equivalence without forcing literal word order.

The second declaration is “To comb is not necessarily to separate.” Chinese: “梳理，并不一定意味着分离。” Japanese: “梳かすことは、必ずしも切り離すことではない。”

## Writing rules

- State the object of inquiry concretely before leaving ambiguity: people, sounds, spaces, feelings, and their shared atmosphere.
- Chinese should be restrained and contemporary; English simple and clear; Japanese natural, quiet modern prose. Avoid dense translated compounds.
- Distinguish the remembered dream description from the later interpretation. Do not invent dream details.
- Avoid claims of memory reading, therapy, psychological diagnosis, and scientific quantum analogies.
- Treat composed fragments as artwork prompts, never a claim to know the visitor's life.
- Keep labels, privacy notes, status messages, accessibility text, and metadata localized alongside the main copy.

## Editing

The typed dictionaries are `src/i18n/dictionaries/{en,zh-CN,ja}.ts`; the shared contract is `src/i18n/config.ts`. Change a concept in all three dictionaries and verify lengths and structure. Fragment `id` and positions live in `src/data/fragments.ts`; each language's `fragments` array must retain the same ordering and count. Echoes are poetic responses to a pair, not analysis of the visitor.
