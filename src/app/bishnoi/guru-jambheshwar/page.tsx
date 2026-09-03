"use client";

import ArticlePage from "@/components/ArticlePage";
import { withCardColors } from "@/components/bishnoiRelated";

export default function GuruJambheshwarPage() {
  return (
    <ArticlePage
      tone="white"
      layout="rail"
      kicker="1451 – 1536"
      title="Guru Jambheshwar"
      standfirst="The teacher around whom the Bishnoi way of life formed. Faced with drought in the fifteenth-century Thar, he answered not with appeal or migration but with twenty-nine rules about restraint."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "The Bishnois", href: "/bishnoi" }, { label: "Guru Jambheshwar" }]}
      facts={[
        { label: "Born", value: "1451, at Peepasar, Nagaur" },
        { label: "Founded", value: "1485, at Samrathal Dhora" },
        { label: "Preached", value: "51 years" },
        { label: "Died", value: "1536" },
        { label: "Shrine", value: "Mukam, Nokha, Bikaner district" },
        { label: "Teachings", value: "The Shabadwani — 120 shabads" },
        { label: "Also called", value: "Jambhoji, Jambhaji, Jambheshwar Bhagwan" },
      ]}
      sourceNote="The dates are unusually well supported for a fifteenth-century religious figure. Much of the surrounding biography is traditional account rather than documented record, and is labelled where it appears."
      sources={[
        { label: "Bishnoi — Wikipedia", href: "https://en.wikipedia.org/wiki/Bishnoi" },
        { label: "Guru Jambheshwar University of Science and Technology, Hisar", href: "https://www.gjust.ac.in/" },
      ]}
      related={withCardColors([
        { href: "/bishnoi/29-principles", label: "The 29 Principles", blurb: "What he set out, in full, and what living by it meant." },
        { href: "/bishnoi/name-and-origin", label: "Where the name comes from", blurb: "Twenty and nine — and the reading that competes with it." },
        { href: "/bishnoi", label: "Who are the Bishnois?", blurb: "The community that formed around the teaching, and what it is today." },
      ])}
    >
      <p className="lead">
        Guru Jambheshwar — known also as Jambhoji — was born in 1451 at Peepasar in Nagaur district, and died in 1536.
        In 1485, at Samrathal Dhora, he set out the twenty-nine principles that would define the Bishnoi tradition, and
        he preached for fifty-one years afterwards. His final rites were performed at Mukam, in Nokha, Bikaner district,
        which remains the community&rsquo;s principal pilgrimage site.
      </p>

      <div className="prose-split">
        <div>
          <h2>He is not the founder of a philosophy. He is the person a way of life formed around.</h2>
          <p>
            The distinction is worth insisting on, because the shorter version misleads. Jambheshwar did not hand down a
            doctrine that a community then adopted; the community, its practices, its clans and its identity took shape
            over generations around what he taught. The line runs:
          </p>
        </div>

        <figure>
          <img src="/gurujambheshwar.png" alt="A devotional painting of Guru Jambheshwar seated beneath a tree, surrounded by animals." />
        </figure>
      </div>
      <p>
        <strong>Guru Jambheshwar &rarr; teachings &rarr; community &rarr; generations &rarr; a living tradition.</strong>
      </p>
      <p>
        Everything downstream of that — the villages, the gotras, the festivals, Khejarli — belongs to the Bishnois, not
        to him alone.
      </p>


      <h2>The drought</h2>
      <p>
        Tradition places his teaching against a severe drought in the fifteenth-century Thar. The detail matters, because
        it explains the shape the twenty-nine principles took.
      </p>
      <p>
        The response to scarcity was not conquest, not migration, and not petition to a ruler. It was a code of conduct
        about restraint: what a household may cut, what it may kill, what it may drink, what it may wear, and how it
        must treat an animal that is no longer useful to it. A drought answered with rules about self-limitation is an
        unusual answer, and it is why the resulting tradition looks so different from a set of religious observances
        with an ecological appendix.
      </p>
      <p>
        The drought framing is traditional account rather than documented climatology. Nothing about it is diminished by
        saying so.
      </p>

      <h2>The Shabadwani</h2>
      <p>
        His teachings survive as the <strong>Shabadwani</strong>, 120 <em>shabads</em> written in Nagri script, which
        contain the twenty-nine niyamas along with the rest of his instruction. The tradition sits within the broader
        Vaishnava current of Hinduism — Vishnu worshipped as Narayana and Hari, alongside Lakshmi — and among India&rsquo;s
        Sant devotional traditions. That devotional core is also why the community&rsquo;s name is sometimes written{" "}
        <em>Vishnoi</em>.
      </p>
      <p>
        Beyond the niyamas themselves, very little of the Shabadwani&rsquo;s content is described in accessible sources.
        120 shabads is a substantial body of teaching, and most of it is not part of the story usually told.
      </p>

      <h2>The places</h2>
      <ul>
        <li>
          <strong>Peepasar</strong> — his birthplace, in Nagaur district. Janmashtami is observed there.
        </li>
        <li>
          <strong>Samrathal Dhora</strong> — where the panth was established in 1485.
        </li>
        <li>
          <strong>Mukam</strong> — his final resting place, and the site of the Bhadrapad Amavasya fair, the
          community&rsquo;s largest annual gathering.
        </li>
        <li>
          <strong>Jambholav</strong> — site of the Chaitra Amavasya fair.
        </li>
      </ul>


      <figure>
        <img src="/legacy/faith.jpg" alt="The Mukti Dham temple at Mukam, Bikaner district." />
      </figure>

      <h2>His name today</h2>
      <p>
        <strong>Guru Jambheshwar University of Science and Technology</strong> was established at Hisar, Haryana, in
        1995, named in tribute. The university describes him as &ldquo;a saint environmentalist of the 15th century&rdquo; —
        a description worth noting precisely because it comes from an institution rather than from the community.
      </p>

      <h2>Open questions</h2>
      <ul>
        <li>Which parts of the biography beyond the dates are documented rather than traditional.</li>
        <li>The content of the Shabadwani outside the twenty-nine niyamas.</li>
        <li>
          His travels. That he &ldquo;preached for fifty-one years, travelling across India&rdquo; is repeated
          everywhere and specified nowhere.
        </li>
      </ul>
    </ArticlePage>
  );
}
