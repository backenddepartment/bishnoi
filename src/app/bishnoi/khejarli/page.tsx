"use client";

import ArticlePage from "@/components/ArticlePage";
import { withCardColors } from "@/components/bishnoiRelated";

export default function KhejarliPage() {
  return (
    <ArticlePage
      tone="white"
      layout="rail"
      kicker="1730"
      title="Khejarli"
      standfirst="In September 1730, 363 Bishnois were killed defending a grove of khejri trees from the Maharaja of Marwar's timber party. Almost all of them arrived after the killing had already started."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "The Bishnois", href: "/bishnoi" }, { label: "Khejarli" }]}
      facts={[
        { label: "When", value: "September 1730" },
        { label: "Where", value: "Near Jodhpur, Marwar" },
        { label: "Ruler", value: "Maharaja Abhai Singh" },
        { label: "Trees", value: "Khejri (Prosopis cineraria)" },
        { label: "Killed", value: "363 Bishnois" },
        { label: "First", value: "Amrita Devi, then three of her daughters" },
        { label: "Remembered", value: "11 September — National Forest Martyrs Day" },
      ]}
      sourceNote="No account of 1730 survives from 1730. Everything above was written down long afterwards, and where the written record parts from community memory — chiefly on how far the decree reached — this page gives both."
      sources={[
        {
          label: "Khejarli massacre — Wikipedia",
          href: "https://en.wikipedia.org/wiki/Khejarli_massacre",
          note: "September 1730, Abhai Singh, the refused bribe, the elders first, 363 killed, 83 villages. Hedges on whether the timber was wanted for a palace or for lime kilns.",
        },
        {
          label: "When Amrita Devi and 362 Bishnois sacrificed their lives for the Khejri tree — Sahapedia",
          href: "http://www.sahapedia.org/when-amrita-devi-and-362-bishnois-sacrificed-their-lives-khejri-tree",
          note: "Narrative detail, told from the community's side rather than peer-reviewed. Its title does the arithmetic behind the number: Amrita Devi, and 362 others.",
        },
        {
          label: "National Forest Martyrs Day — Vajiram & Ravi",
          href: "https://vajiramandravi.com/current-affairs/national-forest-martyrs-day-2025/",
          note: "Civil-service exam material, not a historical source. Cited only for the 2013 declaration of 11 September — and it gives 49 villages where Wikipedia gives 83.",
        },
      ]}
      related={withCardColors([
        { href: "/bishnoi/amrita-devi", label: "Amrita Devi", blurb: "The woman who refused first, and the award that carries her name." },
        { href: "/bishnoi/29-principles", label: "The 29 Principles", blurb: "The rule they were defending, and the twenty-eight around it." },
        { href: "/bishnoi", label: "Who are the Bishnois?", blurb: "The community, the creed, and what it looks like today." },
      ])}
    >
      <p className="lead">
        In September 1730, a party sent by Maharaja Abhai Singh of Marwar came to a Bishnoi village near Jodhpur to fell
        its khejri trees for a royal building project. Accounts differ on whether the wood was wanted for a new palace or
        for lime kilns. What followed is one of the earliest recorded instances anywhere of people dying, deliberately
        and in sequence, to stop trees being cut.
      </p>

      <h2>What happened</h2>
      <p>
        A woman of the village, <strong>Amrita Devi</strong>, stood in the party&rsquo;s way. Cutting a living tree ran
        against the twenty-nine principles her community lived by, and she refused to let it proceed. The soldiers
        offered a bribe to make her stand aside; she treated the offer itself as the insult. She was killed where she
        stood. Three of her daughters, who had watched it happen, took hold of the trees in turn and were killed after
        her.
      </p>
      <p>
        Word travelled to the Bishnoi villages nearby. People came — and this is the part of the account that matters
        most. <strong>Everyone who died after Amrita Devi arrived knowing exactly what had already happened there.</strong>{" "}
        There was time at every step to turn back.
      </p>
      <p>
        A council decided that each volunteer would take one tree. The elders went first, deliberately, before the
        young. By the time the Maharaja himself rode out to stop it, 363 Bishnois were dead.
      </p>


      <figure>
        <img src="/legacy/sacrifice.jpg" alt="The memorial at Khejarli to the 363 Bishnois killed in 1730." />
      </figure>

      <h2>What happened afterwards</h2>
      <p>
        Abhai Singh recalled his men and is said to have travelled to the village to apologise, and to have decreed that
        the village would never again be compelled to supply wood to the kingdom.
      </p>
      <blockquote>
        Later tradition remembers that protection as far broader — a general ban on felling trees and hunting animals
        across Bishnoi land. The narrower version is what the available record supports; the wider one is community
        memory, and should be read as such until a copper-plate decree or a Marwar state record turns up to settle it.
        <cite>See research/claims-register.md, item 1</cite>
      </blockquote>
      <p>
        The village itself is said to have been known as Jehnad before the event, and as Khejarli — after the khejri
        trees — ever since.
      </p>

      <h2>Why it matters</h2>
      <p>
        The figure of 363 is the least interesting thing about Khejarli. What the day demonstrated is that the
        twenty-nine niyamas were not advisory. They determined what a person would defend, what a community would spend
        itself on, and where the line fell between human life and the rest of the living world.
      </p>
      <p>
        That is the historical significance, and it is a larger claim than the one usually made for the event. Calling
        the Bishnois the world&rsquo;s first eco-warriors flatters the story and obscures it: this was not an early
        environmental protest but a religious community acting on a rule it already held, two centuries before anyone
        thought to call such a thing environmentalism.
      </p>

      <h2>What it left behind</h2>
      <p>
        Environmental historians widely cite Khejarli as a forerunner of the twentieth-century{" "}
        <strong>Chipko movement</strong>, which used the same method — embracing trees to stop them being felled — more
        than two hundred years later, and which reshaped Indian environmental policy.
      </p>
      <p>
        In 2013 the Department of Environment and Forests declared <strong>11 September National Forest Martyrs Day</strong>,
        observed across India in memory of Khejarli and of those who have since died protecting forests and wildlife.
        The Government of India&rsquo;s Amrita Devi Bishnoi National Award, for courage and work in wildlife protection,
        carries the name of the woman who refused first.
      </p>
      <p>
        A commemoration is held at Khejarli each September, at the site of the graves.
      </p>
    </ArticlePage>
  );
}
