"use client";

import ArticlePage from "@/components/ArticlePage";

export default function BishnoiHubPage() {
  return (
    <ArticlePage
      kicker="The community"
      title="Who are the Bishnois?"
      standfirst="A Vaishnava community of the Thar Desert, formed around twenty-nine principles set out by Guru Jambheshwar in 1485 — rules that govern how a household treats its neighbours, its animals, and the land it lives on."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "The Bishnois" }]}
      facts={[
        { label: "Founded", value: "1485, at Samrathal Dhora" },
        { label: "By", value: "Guru Jambheshwar (1451–1536)" },
        { label: "Principles", value: "29 niyamas" },
        { label: "Heartland", value: "Western Thar Desert, Rajasthan" },
        { label: "Also in", value: "Haryana, Punjab, Uttar Pradesh, Madhya Pradesh, Gujarat" },
        { label: "Clans", value: "About 360 gotras, of equal standing" },
      ]}
      sourceNote="Graded against research/claims-register.md. Where sources disagree — the community's size, the scope of the Khejarli decree — both readings are given rather than one chosen."
      sources={[
        { label: "Bishnoi — Wikipedia", href: "https://en.wikipedia.org/wiki/Bishnoi" },
        { label: "Khejarli massacre — Wikipedia", href: "https://en.wikipedia.org/wiki/Khejarli_massacre" },
        { label: "Amrita Devi Bishnoi National Award — Wikipedia", href: "https://en.wikipedia.org/wiki/Amrita_Devi_Bishnoi_National_Award" },
      ]}
      related={[
        { href: "/bishnoi/guru-jambheshwar", label: "Guru Jambheshwar", blurb: "The teacher around whom the way of life formed, and the drought that shaped it." },
        { href: "/bishnoi/29-principles", label: "The 29 Principles", blurb: "All twenty-nine niyamas, and what living by them actually meant." },
        { href: "/bishnoi/name-and-origin", label: "Where the name comes from", blurb: "Twenty-nine, or Vishnu? Two readings, and why the community holds to one." },
        { href: "/bishnoi/khejarli", label: "Khejarli, 1730", blurb: "The day the principles stopped being advisory. 363 people died." },
        { href: "/bishnoi/amrita-devi", label: "Amrita Devi", blurb: "The woman who refused first, and the national award that now carries her name." },
      ]}
    >
      <p className="lead">
        The Bishnois are a religious and social community of western Rajasthan, concentrated around Bikaner, Jodhpur and
        Nagaur, with communities across Haryana, Punjab, Uttar Pradesh, Madhya Pradesh and Gujarat. What defines them is
        not a territory or a lineage but a code: twenty-nine rules, the <em>niyamas</em>, set out by Guru Jambheshwar in
        the fifteenth century and kept as a way of life ever since.
      </p>

      <h2>A creed, not a bloodline</h2>
      <p>
        The tradition began as a religious movement and became, over centuries, also a social community. Its earliest
        followers came from Jat, Bania, Rajput, Khati, Gaena and other backgrounds; on becoming Bishnoi, people commonly
        set aside their former caste names and took the name of the creed instead. The community is organised into
        roughly 360 <em>gotras</em>, or clans, held to be of equal social standing.
      </p>
      <p>
        That progression matters, and most short accounts skip it. The shape of the history is{" "}
        <strong>religious movement &rarr; community &rarr; social identity</strong> — not a guru founding a caste. Bishnoi
        has always been something a person could take up.
      </p>

      <h2>How many Bishnois are there?</h2>
      <p>
        Estimates vary widely, from around 600,000 to roughly 1.5 million, depending on whether the count is of religious
        adherents or of the wider community. No single authoritative figure exists, and sources that give one rarely say
        which they are counting.
      </p>

      <h2>What the principles ask</h2>
      <p>
        The twenty-nine rules are not solely, or even mainly, about the environment. They cover worship, personal
        discipline, hygiene, honesty, forgiveness and conduct towards others, alongside the eight that concern animals
        and vegetation. Read together they describe a whole way of living rather than a conservation programme.
      </p>
      <p>
        Their reach into ordinary life is easy to underestimate. Among them: do not cut a green tree; provide shelter for
        abandoned animals; do not sterilise bulls or abandon male calves; filter your water and check firewood for living
        creatures before burning it; keep a vegetarian diet; take no intoxicants — and do not wear blue, because the dye
        is drawn from the indigo plant. A rule about a <em>colour</em>, following from a rule about harming a plant, is
        the clearest measure of how far the reasoning goes.
      </p>
      <p>
        <a href="/bishnoi/29-principles">Read all twenty-nine &rarr;</a>
      </p>

      <h2>Khejarli, and what it proved</h2>
      <p>
        In September 1730, a party sent by Maharaja Abhai Singh of Marwar came to fell khejri trees at a Bishnoi village
        near Jodhpur. A woman named Amrita Devi refused to let it happen and was killed, along with three of her
        daughters. Word travelled to the surrounding villages, and people came — knowing exactly what had already
        happened there. The elders went first. By the time the Maharaja rode out to stop it, 363 Bishnois were dead.
      </p>
      <p>
        The number is the least interesting part. What Khejarli demonstrated is that the niyamas were not advisory: they
        determined what a person would defend and what a community would spend itself on. Environmental historians
        routinely cite it as a forerunner of the twentieth-century Chipko movement, which used the same method more than
        two centuries later. Since 2013, 11 September has been observed in India as National Forest Martyrs Day, in
        memory of that day.
      </p>
      <p>
        <a href="/bishnoi/khejarli">The full account of Khejarli &rarr;</a>
      </p>

      <h2>The Bishnois today</h2>
      <p>
        The tradition is living, not commemorated. Blackbuck and chinkara move freely through Bishnoi villages, where
        hunting on community land is not tolerated — which is why those villages are often described as unofficial
        wildlife sanctuaries. Communities maintain <em>orans</em>, stretches of native scrub kept off-limits to cutting
        and grazing, which function as sacred groves and are widely credited with holding down soil in one of India&rsquo;s
        driest regions.
      </p>
      <p>
        Contemporary Bishnoi conservationists including Khamu Ram Bishnoi and Radheshyam Bishnoi are recognised for
        grassroots wildlife protection work in Rajasthan. The Government of India&rsquo;s Amrita Devi Bishnoi National Award,
        which recognises courage and work in wildlife protection, carries the name of the woman killed at Khejarli in
        1730 — the clearest evidence that this history left a mark on the state, not only on the community.
      </p>
      <p>
        The annual calendar keeps the tradition in the present tense: Janmashtami at Peepasar, where Guru Jambheshwar was
        born; the Bhadrapad Amavasya fair at Mukam, the community&rsquo;s largest yearly gathering; the Chaitra Amavasya
        fair at Jambholav; monthly Amavasya fasting and satsang; and the Khejarli commemoration each September.
      </p>

      <h2>What the Bishnois are not</h2>
      <p>
        It is tempting to reduce this to a conservation story, because the conservation story is extraordinary. That
        reading is too narrow. The Bishnoi tradition is a philosophy about how people should live — with each other,
        with animals, and with the land — of which the protection of trees and wildlife is one visible expression among
        many. Community, ethics, restraint, compassion, devotional practice, custom and festival are all part of the
        same code.
      </p>
      <p>
        It is equally tempting, and equally wrong, to apply modern labels backwards. Calling the Bishnois India&rsquo;s first
        environmentalists takes a twentieth-century category and fits a fifteenth-century religious community into it.
        The tradition is better described on its own terms: one in which spiritual practice and ecological obligation
        were never separate things.
      </p>
    </ArticlePage>
  );
}
