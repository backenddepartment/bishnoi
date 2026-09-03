"use client";

import ArticlePage from "@/components/ArticlePage";
import { withCardColors } from "@/components/bishnoiRelated";

export default function AmritaDeviPage() {
  return (
    <ArticlePage
      tone="white"
      layout="rail"
      kicker="d. 1730"
      title="Amrita Devi"
      standfirst="A woman of a Bishnoi village in Marwar who refused to let the Maharaja's men fell the khejri trees, and was killed for it. 362 others died after her that day — every one of them knowing what had already happened."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "The Bishnois", href: "/bishnoi" }, { label: "Amrita Devi" }]}
      facts={[
        { label: "Died", value: "September 1730, at Khejarli" },
        { label: "Defending", value: "Khejri trees (Prosopis cineraria)" },
        { label: "With her", value: "Three daughters" },
        { label: "Total killed", value: "363, including her family" },
        { label: "Named for her", value: "Amrita Devi Bishnoi National Award" },
        { label: "Observed", value: "11 September, National Forest Martyrs Day" },
      ]}
      sourceNote="Her act is well attested. Details of her family come from community tradition rather than documented record, and are labelled below."
      sources={[
        { label: "Amrita Devi — Wikipedia", href: "https://en.wikipedia.org/wiki/Amrita_Devi" },
        { label: "Amrita Devi Bishnoi National Award — Wikipedia", href: "https://en.wikipedia.org/wiki/Amrita_Devi_Bishnoi_National_Award" },
        { label: "Khejarli massacre — Wikipedia", href: "https://en.wikipedia.org/wiki/Khejarli_massacre" },
      ]}
      related={withCardColors([
        { href: "/bishnoi/khejarli", label: "Khejarli, 1730", blurb: "The full sequence of the day, and what followed it." },
        { href: "/bishnoi/29-principles", label: "The 29 Principles", blurb: "The rule she was defending, and the twenty-eight around it." },
        { href: "/bishnoi", label: "Who are the Bishnois?", blurb: "The community she belonged to, then and now." },
      ])}
    >
      <p className="lead">
        Amrita Devi lived in a Bishnoi village near Jodhpur, in the kingdom of Marwar. In September 1730 a party sent by
        Maharaja Abhai Singh arrived to fell the village&rsquo;s khejri trees for a royal building project. She stood in
        their way, was offered a bribe to stand aside, and refused — treating the offer as the insult. She was killed
        where she stood, the first of 363.
      </p>

      <figure>
        <img src="/amritadevi.png" alt="A woman in a pale sari holding on to the trunk of a khejri tree in open scrub." />
      </figure>

      <h2>Her daughters</h2>
      <p>
        Three of her daughters, having watched her die, took hold of the trees in turn and were killed after her.{" "}
        <strong>Community tradition names them Asu, Ratni and Bhagu.</strong> Those names are repeated consistently
        across community sources; the encyclopedic record refers only to &ldquo;three of her daughters&rdquo; without
        naming them, so we give them as tradition rather than as documented fact.
      </p>
      <p>
        The saying attributed to her — that a head given for a tree is a fair exchange — appears in several renderings
        and is almost certainly later tradition too. It is no less true to what she did for that.
      </p>

      <h2>Why she is remembered rather than the 362</h2>
      <p>
        Not because she died first, but because of what her death made possible. Everyone who came afterwards travelled
        to the village <em>knowing</em> what had happened to her, and stayed anyway. Her refusal turned a raid into a
        decision that a whole community then had to take, one person at a time, with the outcome already visible.
      </p>
      <p>
        That is also what makes her the moment the twenty-nine principles stopped being instructions and became
        something a person could be killed for holding.
      </p>

      <h2>The award that carries her name</h2>
      <p>
        The Government of India&rsquo;s <strong>Amrita Devi Bishnoi National Award</strong> recognises individuals and rural
        community organisations that have shown exemplary courage or done exceptional work in wildlife protection.
      </p>
      <div className="prose-split">
        <div>
          <p>
            This is the single clearest piece of evidence that the events of 1730 left a mark outside the community that
            remembers them. A woman killed defending trees in the eighteenth century now has her name on the instrument
            by which the modern Indian state recognises the same act. It is not community memory; it is a government
            instrument, and it is citable as such.
          </p>
          <p>
            Since 2013, <strong>11 September</strong> has been observed across India as National Forest Martyrs Day, in
            memory of Khejarli.
          </p>
        </div>

        <figure>
          <img src="/legacy/bustard.jpg" alt="A Great Indian Bustard in Desert National Park, Rajasthan." />
        </figure>
      </div>

      <h2>A note on the shape of this history</h2>
      <p>
        Told carelessly, Bishnoi history becomes a sequence of male religious authority with one woman inserted at the
        dramatic moment. The record does not support that shape. Women carried the practice domestically, agriculturally
        and in transmission across generations — the daily work of keeping a tradition alive between its famous days.
      </p>
      <p>
        Amrita Devi is also the standard by which anyone else belongs in this story: not because of a shared surname,
        but because their actions demonstrate the principles. That test is worth applying strictly.
      </p>

    </ArticlePage>
  );
}
