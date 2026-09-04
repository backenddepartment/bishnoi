"use client";

import ArticlePage from "@/components/ArticlePage";
import { withCardColors } from "@/components/bishnoiRelated";

export default function NameAndOriginPage() {
  return (
    <ArticlePage
      tone="white"
      layout="rail"
      kicker="The name"
      title="What does Bishnoi mean?"
      standfirst="Most commonly, twenty-nine — bis and noi, for the twenty-nine principles. That is the community's own account of its name. A second reading connects it instead to Vishnu, and the community has not accepted it."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "The Bishnois", href: "/bishnoi" }, { label: "The name" }]}
      facts={[
        { label: "Common reading", value: "bis (20) + noi (9) = 29" },
        { label: "Alternative", value: "From Vishnu — hence the spelling Vishnoi" },
        { label: "Language", value: "Rajasthani / Marwari" },
        { label: "Community view", value: "Rejects Vishnoi as a substitute" },
        { label: "Clans", value: "About 360 gotras, of equal standing" },
      ]}
      sourceNote="Neither etymology is settled. Both are given here because choosing one silently would misrepresent the record — and because the community's own reading is not merely one opinion among several."
      sources={[
        {
          label: "Bishnoi — Wikipedia",
          href: "https://en.wikipedia.org/wiki/Bishnoi",
          note: "Gives only the bis + nau derivation — twenty plus nine — and records no competing reading at all.",
        },
        {
          label: "Bishnoi (surname) — Wikipedia",
          href: "https://en.wikipedia.org/wiki/Bishnoi_(surname)",
          note: "Where the Vishnoi spelling appears, and with it the reading that traces the name to Vishnu.",
        },
        {
          label: "Bishnoi: An Eco-Theological Movement — Journal of Vaishnava Studies",
          href: "https://ivsjournal.com/index.php/jvs/article/view/202",
          note: "Paywalled, and not consulted for this page. Listed for anyone who can reach it: it would be the strongest scholarly source on the question.",
        },
      ]}
      related={withCardColors([
        { href: "/bishnoi/29-principles", label: "The 29 Principles", blurb: "The twenty-nine the name most likely counts." },
        { href: "/bishnoi/guru-jambheshwar", label: "Guru Jambheshwar", blurb: "Who set them out, and the tradition's Vaishnava core." },
        { href: "/bishnoi", label: "Who are the Bishnois?", blurb: "The community, its structure, and what it is today." },
      ])}
    >
      <p className="lead">
        The name is commonly derived from the Rajasthani <em>bis</em> (twenty) and <em>noi</em> (nine), for the
        twenty-nine principles of the tradition. This is the explanation the community itself gives, and the one most
        sources follow.
      </p>

      <h2>The second reading</h2>
      <p>
        Some writers — Hiralal Maheshwari among Hindi-language authors — instead use <em>Vishnoi</em>, &ldquo;followers of
        Vishnu&rdquo;. Some scholars read that spelling as part of a broader Hinduisation of community names after 1947,
        rather than as an older etymology. Colonial-era gazetteer material is also reported to have recorded a Vishnu
        association alongside the community&rsquo;s own twenty-nine-articles explanation.
      </p>
      <p>
        The reading is not baseless. The tradition <em>is</em> Vaishnava: the niyamas include worship of Vishnu as
        Narayana and Hari, alongside Lakshmi, and the community sits within India&rsquo;s Sant devotional traditions. The
        question is not whether the Bishnois are Vaishnava — they are — but which of the two gave rise to the{" "}
        <strong>name</strong>.
      </p>

      <h2>Why the community&rsquo;s account carries weight</h2>
      <p>
        Bishnois themselves insist on the twenty-nine derivation, and have actively declined <em>Vishnoi</em> as a
        replacement spelling. That is not a tiebreaker in a purely linguistic argument, but it is not nothing either: a
        community&rsquo;s account of its own name is evidence, and treating it as merely one opinion among several
        misrepresents where the weight of the record actually sits.
      </p>
      <p>
        The honest summary is that the twenty-nine reading is the mainstream and the community&rsquo;s own, and that a
        minority tradition of writing connects the name to Vishnu instead.
      </p>


      <figure>
        <img src="/legacy/lineage.jpg" alt="A Bishnoi village in Rajasthan." />
        <figcaption>
          A Bishnoi village. The name marks a creed rather than a lineage &mdash; people took it up, and set aside the
         caste names they arrived with.
          <span className="figure-credit">Photo: Omprakash bishnoi 12451 &middot; CC BY-SA 4.0</span>
        </figcaption>
      </figure>

      <h2>Is Bishnoi a caste?</h2>
      <p>
        Not in origin. It began as a religious movement in 1485 and became, over centuries, also a social community. Its
        followers came from Jat, Bania, Rajput, Khati, Gaena and other backgrounds, and on becoming Bishnoi they
        commonly set aside their former caste names and took the name of the creed instead.
      </p>
      <p>
        The community is organised into roughly <strong>360 gotras</strong>, or clans, held to be of equal social
        standing — a structure that reflects its origins as something people joined rather than something they were born
        into.
      </p>
      <p>
        So the accurate shape of the history is{" "}
        <strong>religious movement &rarr; community &rarr; social identity</strong>, not guru &rarr; caste. Bishnoi has
        always been a code of conduct open to anyone who takes it up.
      </p>

      <h2>Spellings you will encounter</h2>
      <ul>
        <li>
          <strong>Bishnoi</strong> — the community&rsquo;s own preferred spelling, and the one used throughout this site.
        </li>
        <li>
          <strong>Vishnoi</strong> — used by some authors; not accepted by the community as a substitute.
        </li>
        <li>
          <strong>Jambheshwar / Jambhoji / Jambhaji</strong> — all name the same teacher.
        </li>
        <li>
          <strong>Khejarli / Khejadli</strong> — the village where the 1730 killings took place.
        </li>
      </ul>
    </ArticlePage>
  );
}
