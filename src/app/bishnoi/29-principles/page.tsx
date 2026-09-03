"use client";

import ArticlePage from "@/components/ArticlePage";

/* The full enumeration, corrected 2026-09-03 against
   research/ch03-29-principles.md. The homepage carries the same 29 grouped
   for narrative; this page is the reference copy and renders all of them
   statically. Keep the two in sync. */
const RULES: { group: string; note: string; items: string[] }[] = [
  {
    group: "Living with the land and its animals",
    note: "Eight of the twenty-nine. These are the rules Khejarli was fought over.",
    items: [
      "Be merciful to all living beings, and love them.",
      "Do not cut a green tree.",
      "Provide shelter for abandoned animals.",
      "Do not sterilise bulls; do not abandon male calves.",
      "Do not eat meat; keep a strict vegetarian diet.",
      "Do not wear blue — the dye is drawn from the indigo plant.",
      "Use filtered water, filtered milk, and firewood cleaned of living creatures.",
      "Cook your own food; be self-sufficient.",
    ],
  },
  {
    group: "Living with other people",
    note: "Conduct towards neighbours, stated as plainly as the rules about trees.",
    items: [
      "Speak the truth, and speak it sincerely.",
      "Practise forgiveness and kindness.",
      "Be merciful, sincerely.",
      "Do not steal.",
      "Do not condemn or criticise.",
      "Do not lie.",
      "Do not enter into disputes or conflict.",
    ],
  },
  {
    group: "Living with oneself",
    note: "Discipline and abstention — the rules that shape an ordinary day.",
    items: [
      "Keep clear of lust, anger, greed and attachment.",
      "Bathe daily, before sunrise.",
      "Keep to modesty, patience, contentment and cleanliness.",
      "Observe a thirty-day period of rest and separation after childbirth.",
      "Observe five days of separation during menstruation.",
      "Do not use or trade opium.",
      "Do not smoke or use tobacco.",
      "Do not take bhang, hemp or any intoxicant.",
      "Do not drink alcohol.",
    ],
  },
  {
    group: "Devotional practice",
    note: "The Vaishnava core of the tradition.",
    items: [
      "Pray twice daily, morning and evening.",
      "Sing the evening aarti.",
      "Perform yajna (havan).",
      "Worship and recite the name of Vishnu.",
      "Fast on Amavasya, the new moon.",
    ],
  },
];

let running = 0;
const NUMBERED = RULES.map((g) => ({
  ...g,
  items: g.items.map((text) => ({ text, n: (running += 1) })),
}));

export default function TwentyNinePrinciplesPage() {
  return (
    <ArticlePage
      kicker="The niyamas"
      title="The 29 Principles"
      standfirst="Twenty-nine rules set out by Guru Jambheshwar in 1485, covering worship, conduct, personal discipline and the treatment of animals and vegetation. They give the community its name — and, at Khejarli in 1730, its defining moment."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "The Bishnois", href: "/bishnoi" }, { label: "The 29 Principles" }]}
      facts={[
        { label: "Set out", value: "1485, by Guru Jambheshwar" },
        { label: "Source text", value: "The Shabadwani — 120 shabads" },
        { label: "Script", value: "Nagri (Devanagari)" },
        { label: "Environment", value: "8 of the 29" },
        { label: "The name", value: "bis (20) + noi (9)" },
      ]}
      sourceNote="Renderings and numbering vary between sources; the wording below follows the standard English enumeration. The four groupings are this site's own — see the note above the list."
      sources={[
        { label: "Bishnoi — Wikipedia", href: "https://en.wikipedia.org/wiki/Bishnoi" },
        { label: "Bishnoi: An Eco-Theological Movement — Journal of Vaishnava Studies", href: "https://ivsjournal.com/index.php/jvs/article/view/202" },
      ]}
      related={[
        { href: "/bishnoi/guru-jambheshwar", label: "Guru Jambheshwar", blurb: "Who set the rules out, and the drought they answered." },
        { href: "/bishnoi/khejarli", label: "Khejarli, 1730", blurb: "The day one of these rules was tested to the limit." },
        { href: "/bishnoi/name-and-origin", label: "Where the name comes from", blurb: "Twenty and nine — and the reading that competes with it." },
      ]}
    >
      <p className="lead">
        The principles come down through the <strong>Shabadwani</strong>, the 120 <em>shabads</em> attributed to Guru
        Jambheshwar and written in Nagri script. Their number is not in dispute and gives the community its name:{" "}
        <em>bis</em> (twenty) and <em>noi</em> (nine). Their wording and grouping vary between sources, which is normal
        for a text carried this way.
      </p>

      <h2>How to read them</h2>
      <p>
        The useful question is not whether a reader can get through all twenty-nine. It is what living by them actually
        meant — because taken together they are not a conservation charter but a description of a whole life, and the
        environmental rules only make sense inside it.
      </p>
      <p>
        So the four groupings below are arranged around that: how a person lives with the land, with other people, with
        themselves, and with God. <strong>That grouping is ours, not traditional.</strong> Sources more commonly sort the
        rules into worship, hygiene, social conduct and environment; we have said which is which where it matters, but
        the arrangement here is meant to show how far the rules reach into an ordinary day rather than to reproduce an
        inherited division.
      </p>

      {NUMBERED.map((g) => (
        <section key={g.group} style={{ display: "contents" }}>
          <h2>{g.group}</h2>
          <p>{g.note}</p>
          <ol className="rule-list">
            {g.items.map(({ text, n }) => (
              <li key={text}>
                <span>{String(n).padStart(2, "0")}</span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <h2>The rule about the colour blue</h2>
      <p>
        Of the twenty-nine, this is the one that most repays a second look. Indigo dye is extracted from the indigo
        plant, and the extraction harms it. So a rule against harming a plant becomes a rule against a{" "}
        <strong>colour</strong> — and therefore governs what a person may wear, every day, for life.
      </p>
      <p>
        Nothing else in the list shows so plainly that the reasoning was meant to be followed all the way down. It is
        also the rule that makes the eight environmental niyamas legible as something other than a modern reading: no
        one arrives at a clothing prohibition by way of conservation policy.
      </p>

      <h2>Where sources disagree</h2>
      <ul>
        <li>
          Whether the Amavasya fast belongs to devotional practice or to personal discipline. Sources differ; we have
          placed it with worship.
        </li>
        <li>
          Whether the four-way categorisation is traditional at all, or a modern editorial convenience. Until that is
          settled we present ours as ours.
        </li>
        <li>
          The original Rajasthani and Marwari terms. Several rules reach us with Sanskrit glosses —{" "}
          <em>kshama</em>, <em>santosha</em>, <em>shaucha</em>, <em>achaurya</em> — which may be later additions rather
          than the original wording.
        </li>
      </ul>
    </ArticlePage>
  );
}
