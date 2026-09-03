# Claims register — what is live on bishnoi.ai today

Every historical claim currently rendered on the site, checked against open
sources. Grades per `README.md`.

**Headline: four claims need changing before anything new is published.** Three
overstate the record and one is simply wrong.

---

## Must fix

### 1. The Khejarli decree is overstated — grade C

**Live, in `src/components/legacyData.ts`:**

> "He is said to have apologized to the community and issued a decree banning the
> felling of trees and hunting of animals on Bishnoi land — among the earliest
> known conservation orders in Indian history."

**What the record supports.** Wikipedia's *Khejarli massacre* article states that
Abhai Singh "recalled his men and personally travelled to the village to
apologise," and "decreed that the village would never again be compelled to
provide wood for the kingdom."

That is a **village-specific timber exemption**. The live copy expands it into a
**general ban on felling and hunting across all Bishnoi land**, and then ranks it
among the earliest conservation orders in Indian history. Neither the broader
scope nor the ranking is supported by the sources reachable here.

The apology itself is soft in the record too — "is said to have" is the right
register and the current copy already uses it.

**Suggested rewrite:**

> The Maharaja is said to have travelled to the village to apologise, and to have
> decreed that Khejarli would never again be compelled to supply wood to the
> kingdom. Later tradition remembers the protection as extending more broadly
> across Bishnoi land.

Would move to **A** on the scope question if the reported copper-plate decree can
be located in the Marwar state records.

---

### 2. "Decades before the word 'environmentalism' existed" is wrong — grade D

**Live, in `src/components/About.tsx`:**

> "In 1730, 363 Bishnois gave their lives defending trees at Khejarli — decades
> before the word 'environmentalism' existed."

*Environmentalism* enters English in the twentieth century. From 1730 that is
roughly **two centuries**, not decades. The sentence undersells the actual gap by
an order of magnitude while sounding like a marketing flourish — the worst of both.

**Suggested rewrite:** drop the clause. The date and the number carry it:

> In 1730, 363 Bishnois gave their lives defending trees at Khejarli.

---

### 3. "India's Original Environmentalists" — grade C, and an editorial risk

**Live, in `src/components/About.tsx`** as the Act I heading.

Two problems, both raised independently in the strategy audit:

- It applies a modern conceptual category retroactively to a 15th-century
  religious community. Historians of the subject describe the tradition in terms
  of *religious environmentalism*, *traditional ecological knowledge* and
  ecological ethics — not as an early instance of the modern movement.
- "Original" is a primacy claim. It invites an argument we do not need to win.

The same applies to **"Green Before Green Was a Movement"** in
`src/components/Services.tsx`.

**Suggested replacements** — both stronger, and unarguable:

> A conservation ethic born in the desert
> A tradition where faith and ecology were never separate

---

### 4. The 29 principles list is missing one, and splits another to compensate — grade C

**Live, in `src/components/Principles.tsx`.** The list totals 29, but reaches that
number differently from the standard enumeration:

| Issue | Detail |
|---|---|
| **Missing** | *Do not wear blue attire* — the indigo prohibition. One of the most distinctive and most searched Bishnoi rules; indigo dye requires harming the plant. |
| **Split** | "Use filtered water, milk, and cleaned firewood" appears as three separate items (filtered water and milk / checking firewood for living creatures / clean strained cooking fuel). |
| **Merged** | "Do not drink alcohol" and "Do not eat meat" are combined into one item. |

The site's four category labels (Personal Hygiene & Health / Ethical Conduct /
Morality / Living in Harmony) are also its own, not the conventional grouping
(worship / hygiene / social conduct / environment). That is a legitimate editorial
choice, but it should be *stated as one* on `/bishnoi/29-principles` rather than
implied to be the traditional division.

This matters disproportionately: `/bishnoi/29-principles` is one of the highest
search-value pages in the whole plan, and an incomplete list is exactly what a
knowledgeable reader will catch first.

**Action:** restore the indigo rule, un-split the firewood item, separate alcohol
from meat, and label the categorisation as the site's own.

---

## Verified — no change needed

| Claim | Where | Grade | Note |
|---|---|---|---|
| Guru Jambheshwar founded the tradition in **1485** | Hero, About, Founder | **A** | At Samrathal Dhora. |
| Born **1451** at Peepasar; died **1536** | Founder, Mukam | **A** | Consistent across sources including census material. |
| Final rites at **Mukam**, Nokha, Bikaner district | Mukam | **A** | Principal pilgrimage site. |
| **29** principles | throughout | **A** | The count is not in dispute; the contents are — see above. |
| **363** Bishnois killed at Khejarli | About, legacyData | **A** | Consistent across academic, governmental and encyclopedic sources. |
| Khejarli was **1730**, under **Abhai Singh of Marwar** | legacyData | **A** | September 1730. Marwar's capital was Jodhpur; both namings are correct. |
| Timber was for a **new palace** | legacyData | **B** | Wikipedia hedges: "some sources report" palace construction, "others note" lime-burning. Say "for a royal building project" or name both. |
| **11 September** is National Forest Martyrs Day | legacyData | **A** | Declared 2013 by the Department of Environment and Forests, in memory of Khejarli. |
| Khejarli is cited as a **forerunner of Chipko** | legacyData | **A** | Standard in the environmental-history literature. |
| Roughly **360 gotras**, of equal social standing | legacyData | **A** | |
| Members drawn from **Jat, Rajput, Bania** and other communities | legacyData | **A** | Sources also list Khati and Gaena. The point the copy makes — that Bishnoi is a creed open to anyone, not a bloodline — is well supported. |
| **Eight** of the 29 principles concern animals and environment | legacyData | **A** | |
| Blackbuck and chinkara move safely through Bishnoi villages | legacyData | **A** | |
| Great Indian Bustard: **fewer than 150** surviving | legacyData | **B** | Figures move. Date-stamp it or attribute it. |
| Guru Jambheshwar University, Hisar, **1995** | legacyData | **A** | Named in tribute; the university's own description is quoted, correctly. |
| Martin Goodman, *My Head for a Tree* (2025) | legacyData | **A** | |

---

## Needs attribution, not removal

| Claim | Where | Grade | Action |
|---|---|---|---|
| Amrita Devi's daughters were **Asu, Ratni and Bhagu** | legacyData | **B** | Widely repeated across community and popular sources; Wikipedia's Khejarli article says "three of her daughters" without naming them. Keep, attributed: "community tradition names her daughters as…". |
| Bishnoi women **nursed orphaned fawns** alongside their own children | legacyData | **B** | Already correctly framed as "local tradition tells of". Leave as is — this is the right register. |
| Villagers **dug and refilled water troughs** for animals through the dry season | legacyData | **B** | Same framing. Fine. |
| Community numbers **"several hundred thousand"** | legacyData | **C** | Sources conflict: ~600,000 (2010) versus ~1,500,000. The current vague phrasing is defensible but weak. Better: give a range and cite it. |
| **Orans** as community-protected sacred groves slowing desertification | legacyData | **B** | Well described in the literature; the ecological effect claim is softer than the existence claim. Split the two. |

---

## Open questions for the next research pass

1. **The 245-year gap.** Between Jambheshwar's death in 1536 and Khejarli in 1730,
   the site says nothing. Neither does most popular writing. This is the single
   biggest hole and the thing that would most distinguish `/bishnoi/history` from
   every existing page on the subject.
2. **Villages involved at Khejarli.** Sources give both **83** and **49**. Neither
   number is currently on the site; resolve before adding one.
3. **The village name.** Sources refer to *Jehnad* being renamed *Khejarli*.
   Worth confirming and including — it is a good, concrete, verifiable detail.
4. **Giridhar Bhandari**, the minister said to have led the felling party. Named
   in Wikipedia, absent from the site. Confirm before using.
5. **The copper-plate decree.** If it exists in Marwar records, claim 1 above
   moves from C to A and becomes one of the strongest facts on the site.
