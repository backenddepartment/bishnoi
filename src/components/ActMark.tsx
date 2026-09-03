/* Chapter marker for the four act-opening sections on the home page.

   The home page used to give every section the same `eyebrow + dot-blink`
   chip and the same 3rem heading, so nothing signalled "a new act starts
   here" versus "this is a supporting beat inside one". ActMark replaces the
   eyebrow on the four sections that OPEN an act; every other section keeps
   its eyebrow and drops to the tier-2 heading size. Same tokens, same
   letter-spaced uppercase treatment as .eyebrow — this is a tier signal,
   not a new visual language. */

interface ActMarkProps {
  /** Roman numeral. Kept as text so it reads correctly to screen readers. */
  numeral: string;
  /** Year or era, e.g. "1485" or "Today". */
  era: string;
  /** One line naming what happens in this act. */
  label: string;
  /** Light treatment for the dark/green panels. */
  tone?: "dark" | "light";
}

export default function ActMark({ numeral, era, label, tone = "dark" }: ActMarkProps) {
  const light = tone === "light";

  return (
    <div className={`act-mark ${light ? "act-mark-light" : ""}`}>
      <span className="act-mark-numeral">{numeral}</span>
      <span className="act-mark-rule" aria-hidden="true" />
      <span className="act-mark-era">{era}</span>
      <span className="act-mark-label">{label}</span>
    </div>
  );
}
