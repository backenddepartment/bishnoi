/* The questions people actually type, answered in their own phrasing.

   These render as visible <h3>/<p> pairs on /bishnoi AND as FAQPage
   structured data, from this one source — so the two can never drift apart,
   which is the usual way FAQ markup gets a site into trouble.

   Answers are graded against research/claims-register.md. Where sources
   conflict (the community's size, the scope of the Khejarli decree) the
   answer says so rather than picking one. */
export interface Faq {
  q: string;
  a: string;
}

export const BISHNOI_FAQ: Faq[] = [
  {
    q: "What is the history of the Bishnoi community?",
    a: "The Bishnoi tradition began in 1485, when Guru Jambheshwar established it at Samrathal Dhora in the Thar Desert and set out twenty-nine principles for how to live. A community formed around that teaching over the following centuries. In September 1730 at Khejarli, 363 Bishnois were killed defending khejri trees from the Maharaja of Marwar's timber party — the event that defines the tradition in public memory. The community continues today across Rajasthan, Haryana, Punjab and neighbouring states, still living by the same twenty-nine rules.",
  },
  {
    q: "When was the Bishnoi religion founded?",
    a: "In 1485, at Samrathal Dhora in western Rajasthan. Guru Jambheshwar, born in 1451 at Peepasar in Nagaur district, established the panth there and preached for fifty-one years afterwards, until his death in 1536.",
  },
  {
    q: "Who founded the Bishnoi community?",
    a: "Guru Jambheshwar, also called Jambhoji or Jambhaji, who lived from 1451 to 1536. He is better understood as the person around whom the Bishnoi way of life formed than as the founder of a doctrine: the community, its clans, its practices and its identity took shape over generations around what he taught. His teachings survive as the Shabadwani, 120 shabads written in Nagri script.",
  },
  {
    q: "What does the name Bishnoi mean?",
    a: "It is commonly derived from the Rajasthani bis (twenty) and noi (nine), for the twenty-nine principles — the explanation the community itself gives and the one most sources follow. Some writers instead connect the name to Vishnu, reflecting the tradition's Vaishnava character; the community has not accepted Vishnoi as a substitute spelling.",
  },
  {
    q: "Is Bishnoi a caste or a religion?",
    a: "Neither label fits cleanly. It began as a religious movement in 1485 and became, over centuries, also a social community. Its followers came from Jat, Bania, Rajput, Khati, Gaena and other backgrounds, and commonly set aside their former caste names on joining. The community is organised into roughly 360 gotras held to be of equal social standing — a structure that reflects its origins as something people joined rather than something they were born into.",
  },
  {
    q: "What happened at Khejarli in 1730?",
    a: "A party sent by Maharaja Abhai Singh of Marwar came to fell khejri trees for a royal building project. A woman named Amrita Devi refused to let it happen and was killed, along with three of her daughters. Word travelled to nearby villages and people came, knowing what had already happened there. A council decided each volunteer would take one tree, and the elders went first. By the time the Maharaja rode out to stop it, 363 Bishnois were dead.",
  },
  {
    q: "Why do Bishnois protect trees and animals?",
    a: "Because eight of the twenty-nine principles require it. Protection of vegetation and animal life is a religious obligation within the tradition, not a modern environmental commitment adopted later. That is why blackbuck and chinkara move freely through Bishnoi villages, and why communities maintain orans — stretches of native scrub kept off-limits to cutting and grazing.",
  },
  {
    q: "Why don't Bishnois wear blue?",
    a: "Indigo dye is extracted from the indigo plant, and the extraction harms it. A rule against harming a plant therefore becomes a rule against a colour, governing what a person may wear every day. It is the twenty-ninth principle, and the clearest measure of how far the tradition's reasoning was meant to be followed.",
  },
  {
    q: "Where do Bishnois live?",
    a: "The heartland is the western Thar Desert of Rajasthan, around Bikaner, Jodhpur and Nagaur. Communities are also found in Haryana, Punjab, Uttar Pradesh, Madhya Pradesh and Gujarat.",
  },
  {
    q: "How many Bishnois are there?",
    a: "Estimates vary widely, from around 600,000 to roughly 1.5 million, depending on whether the count is of religious adherents or of the wider community. No single authoritative figure exists, and sources giving one rarely say which they are counting.",
  },
];

export interface TimelineEntry {
  when: string;
  what: string;
  detail: string;
  /** Marks the stretch we cannot yet document, rather than hiding it. */
  gap?: boolean;
}

export const BISHNOI_TIMELINE: TimelineEntry[] = [
  {
    when: "1451",
    what: "Guru Jambheshwar is born",
    detail: "At Peepasar, in Nagaur district. Janmashtami is observed there.",
  },
  {
    when: "1485",
    what: "The tradition is established",
    detail:
      "At Samrathal Dhora, against the background of a severe drought in the Thar. Tradition holds that he answered the scarcity not with migration or petition but with twenty-nine rules about restraint.",
  },
  {
    when: "1485–1536",
    what: "Fifty-one years of teaching",
    detail:
      "He preaches and travels; the 120 shabads of the Shabadwani are set down. Followers come from Jat, Bania, Rajput and other backgrounds, setting aside their former caste names.",
  },
  {
    when: "1536",
    what: "His death, and Mukam",
    detail:
      "Final rites are performed at Mukam, in Nokha, Bikaner district — still the community's principal pilgrimage site and the location of its largest annual gathering.",
  },
  {
    when: "1536–1730",
    what: "Nearly two centuries we cannot yet document",
    detail:
      "This stretch is the honest gap in the record, and most popular accounts jump straight over it. The community spread, organised itself into gotras, settled, farmed and kept the niyamas — but the sources that would let us describe that properly are not ones we have been able to consult. We would rather mark the gap than fill it with invention.",
    gap: true,
  },
  {
    when: "September 1730",
    what: "Khejarli",
    detail:
      "363 Bishnois are killed defending khejri trees from Maharaja Abhai Singh's timber party. Amrita Devi refuses first and dies first; everyone who follows arrives knowing what has already happened.",
  },
  {
    when: "After 1730",
    what: "The Maharaja's response",
    detail:
      "Abhai Singh is said to have travelled to the village to apologise, and to have decreed that it would never again be compelled to supply wood to the kingdom. Later tradition remembers that protection as far broader.",
  },
  {
    when: "18th–19th c.",
    what: "Beyond Rajasthan",
    detail:
      "Communities are recorded outside the desert heartland, across northern India, and colonial-period administrative records describe the Bishnois as a distinct religious and social community.",
  },
  {
    when: "1970s",
    what: "Chipko",
    detail:
      "The Chipko movement uses the same method — embracing trees to stop them being felled — more than two centuries after Khejarli, which environmental historians widely cite as its forerunner.",
  },
  {
    when: "1995",
    what: "A university takes the name",
    detail:
      "Guru Jambheshwar University of Science and Technology is established at Hisar, Haryana, describing him as “a saint environmentalist of the 15th century.”",
  },
  {
    when: "2013",
    what: "National Forest Martyrs Day",
    detail:
      "The Department of Environment and Forests declares 11 September National Forest Martyrs Day, observed across India in memory of Khejarli.",
  },
  {
    when: "Today",
    what: "A living tradition",
    detail:
      "Between roughly 600,000 and 1.5 million people, organised in about 360 gotras. The Government of India's Amrita Devi Bishnoi National Award recognises courage in wildlife protection, carrying the name of the woman killed in 1730.",
  },
];
