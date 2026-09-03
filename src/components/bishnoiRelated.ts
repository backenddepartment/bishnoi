import type { RelatedLink } from "./ArticlePage";

/* One colour per destination rather than per page, so a card for Khejarli
   looks the same wherever it turns up and the reader learns the set.
   The two remaining destinations — the /bishnoi hub and Guru Jambheshwar —
   are deliberately absent: they stay the plain white card, which keeps a
   neutral note in every trio. */
const CARD_COLORS: Record<string, string> = {
  "/bishnoi/29-principles": "#C8A45D",
  "/bishnoi/name-and-origin": "#F36B21",
  "/bishnoi/khejarli": "#356B3F",
  "/bishnoi/amrita-devi": "#173F2A",
};

/* Ink is forced light on all four. ArticlePage would otherwise derive it,
   and would pick dark on the gold and the orange — white measures 2.35:1
   and 3.03:1 there, under the AA threshold for body text. One consistent
   treatment across the set was the call; a darker gold would win the
   contrast back without changing how the palette reads. */
export function withCardColors(links: RelatedLink[]): RelatedLink[] {
  return links.map((link) => {
    const color = CARD_COLORS[link.href];
    return color ? { ...link, color, ink: "light" as const } : link;
  });
}
