/* Copy lives here rather than in JSX so apostrophes and curly quotes stay
   verbatim without entity escaping.

   Sizing is deliberately un-normalised. A chapter's `grow` is its share of the
   WIDTH of the group it sits in, and `tier` the typographic weight suiting that
   footprint. Vertical sizing lives on the columns and groups (see `columns`). */
export interface Chapter {
  kicker: string;
  title: string;
  body: string[];
  list?: string[];
  /* Photographs in public/legacy/, from Wikimedia Commons. Every one is
     CC BY-SA 4.0 and requires the credit recorded in public/legacy/CREDITS.md
     to appear wherever the image is published. */
  image: string;
  /* shown in the opened panel — required by the image licence */
  credit: string;
  /* share of its group's width; unequal on purpose */
  grow: number;
  tier: "xl" | "lg" | "md" | "sm";
}

export const chapters: Chapter[] = [
  {
    kicker: "Amrita Devi's Sacrifice",
    title: "363 Lives, One Tree at a Time",
    grow: 1.0,
    tier: "xl",
    image: "/legacy/sacrifice.jpg",
    credit: "Photo: Kaushal Bishnoi · CC BY-SA 4.0",
    body: [
      "In September 1730, Maharaja Abhay Singh of Marwar sent a party to the village of Khejarli, near Jodhpur, to fell khejri trees for a royal building project — accounts differ on whether the wood was wanted for a new palace or for lime kilns. A village woman, Amrita Devi, stood in their way. Cutting a living tree went against everything her faith stood for, and she refused to let it happen — even when the soldiers offered a bribe to stand down. She and her three daughters, named in community tradition as Asu, Ratni, and Bhagu, embraced the trees and were killed.",
      "Word spread to the other Bishnoi villages nearby. One by one, more villagers arrived and embraced the remaining trees, each pledging a life for every tree standing. The elders went first, deliberately, before the young — everyone who died after Amrita Devi did so knowing exactly what had already happened. By the time the Maharaja himself rode out to stop it, 363 Bishnois had died protecting the grove. He is said to have travelled to the village to apologize, and to have decreed that Khejarli would never again be compelled to supply wood to the kingdom; later tradition remembers that protection as extending more broadly across Bishnoi land.",
      "The sacrifice is remembered every year at Khejarli, and September 11 is now observed across India as National Forest Martyrs Day in honor of Amrita Devi and the 363 who died beside her. Environmental historians widely point to Khejarli as a forerunner of the 20th-century Chipko movement, which used the same tree-hugging protest more than two centuries later.",
    ],
  },
  {
    kicker: "Where They Live",
    title: "From the Thar Desert, Outward",
    grow: 2.1,
    tier: "lg",
    image: "/legacy/homeland.jpg",
    credit: "Photo: Clément Bardot · CC BY-SA 4.0",
    body: [
      "The Bishnoi community's roots are in the Thar Desert of western Rajasthan — around Bikaner, Jodhpur, and Nagaur — with communities also found further afield across northern India. Estimates of its size vary widely, from around 600,000 to roughly 1.5 million, depending on whether the count is of religious adherents or of the wider community. The Bishnoi are organized into roughly 360 gotras, or clans, of equal social standing, and today include descendants of Jat, Rajput, Bania, and other communities — a reminder that Bishnoi has always been a code of conduct and a faith open to anyone who takes up its principles, not a single bloodline.",
    ],
  },
  {
    kicker: "Living the Principles",
    title: "The Desert's Unofficial Wildlife Wardens",
    grow: 1.95,
    tier: "md",
    image: "/legacy/wardens.jpg",
    credit: "Photo: Tisha Mukherjee · CC BY-SA 4.0",
    body: [
      "Long before wildlife protection laws existed in India, the Bishnoi were already living by them. Blackbuck and chinkara move freely and safely through Bishnoi villages, where hunting on community land is simply not tolerated. Eight of the 29 principles are devoted entirely to protecting animals and the environment, and Bishnoi villages are often described as unofficial wildlife sanctuaries for exactly that reason.",
      "Local tradition tells of Bishnoi women nursing orphaned fawns alongside their own children, and of villagers digging and refilling water troughs for birds and animals through the harshest months of the desert dry season — small, daily acts of the same conviction that led to Khejarli.",
      "Among today's Bishnoi conservationists carrying that legacy forward are Khamu Ram Bishnoi and Radheshyam Bishnoi, both recognized for grassroots wildlife protection work in Rajasthan.",
    ],
  },
  {
    kicker: "A Fight That's Still Going",
    title: "Guarding the Desert's Rarest Bird",
    grow: 1.0,
    tier: "sm",
    image: "/legacy/bustard.jpg",
    credit: "Photo: SVKMBFLY, edited by MPF · CC BY-SA 4.0",
    body: [
      "The same stretch of the Thar Desert the Bishnoi call home is also the last stronghold of one of the rarest birds on Earth. The Great Indian Bustard has been pushed to the edge of extinction — recent estimates put fewer than 150 surviving in the wild, down from around 250 a decade earlier — largely by collisions with overhead power lines and the rapid spread of new roads, solar farms, and wind turbines across its desert grassland habitat in Rajasthan. It's the same desert, and the same instinct that drove Amrita Devi in 1730: the conviction that this landscape, and what lives in it, is worth protecting.",
    ],
  },
  {
    kicker: "Desert Wisdom",
    title: "The Groves and the Water They Guard",
    grow: 1.0,
    tier: "md",
    image: "/legacy/groves.jpg",
    credit: "Photo: LRBurdak · CC BY-SA 4.0",
    body: [
      "The reverence for the khejri tree extends beyond individual trees to whole patches of land. Bishnoi villages are known for maintaining orans — community-protected stretches of native scrub forest, off-limits to cutting or grazing, that function as informal sacred groves. Thousands are maintained across Rajasthan, and they are widely credited with holding down soil and slowing the spread of desertification in one of India's driest regions. That same instinct for stewardship runs through how desert communities, Bishnoi included, have long managed water in a landscape that gets almost none of it — treating every drop as something to be caught, stored, and shared rather than wasted.",
    ],
  },
  {
    kicker: "Faith & Identity",
    title: "A Vaishnava Path, A Living Legacy",
    grow: 0.72,
    tier: "md",
    image: "/legacy/faith.jpg",
    credit: "Photo: Kaushal Bishnoi · CC BY-SA 4.0",
    body: [
      "The Bishnoi Panth sits within the broader Vaishnava tradition of Hinduism: Guru Jambheshwar's followers worship Vishnu — as Narayana and Hari — alongside Lakshmi, placing the faith among India's Sant devotional traditions. That devotional core is also why the community's name is sometimes spelled “Vishnoi.” Guru Jambheshwar's memory lives on in modern institutions too — Guru Jambheshwar University of Science and Technology, established in 1995 in Hisar, Haryana, carries his name in tribute to, as the university itself puts it, “a saint environmentalist of the 15th century.”",
    ],
  },
  {
    kicker: "Legacy",
    title: "A Legacy Still Being Written",
    grow: 0.7,
    tier: "sm",
    image: "/legacy/lineage.jpg",
    credit: "Photo: Omprakash bishnoi 12451 · CC BY-SA 4.0",
    body: [
      "Environmental historians widely cite the Khejarli sacrifice as a spiritual forerunner of India's 20th-century Chipko movement, which used the same tree-embracing method of protest decades later and helped reshape modern Indian environmental policy. The Bishnoi story has also reached a global readership: Martin Goodman's 2025 book, “My Head for a Tree: The Extraordinary Story of the Bishnois, the World's First Eco-Warriors,” tells the community's history for readers outside India.",
    ],
  },
  {
    kicker: "Traditions",
    title: "Festivals & Living Traditions",
    grow: 1.0,
    tier: "lg",
    image: "/legacy/traditions.jpg",
    credit: "Photo: Kalpit Bishnoi · CC BY-SA 4.0",
    body: [],
    list: [
      "Janmashtami at Peepasar — marking Guru Jambheshwar's birthplace.",
      "The Bhadrapad Amavasya fair at Mukam — the community's largest annual gathering.",
      "The Chaitra Amavasya fair at Jambholav.",
      "Monthly Amavasya fasting and satsang, observed as part of the 29 principles.",
      "The annual Khejarli commemoration each September, alongside National Forest Martyrs Day.",
    ],
  },
];

/* The canvas runs vertically: rows stack downward, each with its OWN height, and
   each row holds items of their own widths. Items fill their row's height so no
   holes open up under the shorter ones; asymmetry lives in the differing widths
   within a row and the differing heights between rows. */
/* The canvas is a GRID, not nested flex. Nested flex could not guarantee a
   filled rectangle — a column sized by its content leaves slack that shows as a
   gap — whereas an explicit grid tiles the box completely by definition.

   The tracks are deliberately unequal, and cards span different numbers of them,
   so the composition mixes wide-and-short with tall-and-thin while still
   flowing edge to edge with nothing between. `area` is
   row-start / column-start / row-end / column-end. */
export const COL_FR = [2.5, 0.7, 1.5, 0.6, 0.5];
export const ROW_FR = [1.5, 0.75, 0.9];

/* Mobile keeps the same idea at 2 columns: unequal rows, mixed spans, no gaps. */
export const MOBILE_ROWS = "13rem 8rem 8rem 8rem 12rem";

export interface Placement {
  item: number;
  area: string;
  mobileArea: string;
  col: number;
  rows: number[];
  /* thin panel: sets its title on its side */
  vertical?: boolean;
}

export const placement: Placement[] = [
  { item: 0, area: "1 / 1 / 3 / 2", mobileArea: "1 / 1 / 2 / 3", col: 0, rows: [0, 1] },
  { item: 1, area: "3 / 1 / 4 / 2", mobileArea: "2 / 1 / 3 / 2", col: 0, rows: [2] },
  { item: 5, area: "1 / 2 / 3 / 3", mobileArea: "2 / 2 / 4 / 3", col: 1, rows: [0, 1], vertical: true },
  { item: 6, area: "3 / 2 / 4 / 3", mobileArea: "4 / 2 / 5 / 3", col: 1, rows: [2] },
  { item: 2, area: "1 / 3 / 2 / 4", mobileArea: "3 / 1 / 4 / 2", col: 2, rows: [0] },
  { item: 4, area: "2 / 3 / 4 / 4", mobileArea: "4 / 1 / 5 / 2", col: 2, rows: [1, 2] },
  { item: 3, area: "1 / 4 / 4 / 5", mobileArea: "5 / 1 / 6 / 2", col: 3, rows: [0, 1, 2], vertical: true },
  { item: 7, area: "1 / 5 / 4 / 6", mobileArea: "5 / 2 / 6 / 3", col: 4, rows: [0, 1, 2], vertical: true },
];

export const LEGACY_EASE = "cubic-bezier(.22,1,.36,1)";
export const LEGACY_DARK = "linear-gradient(158deg,#2E2822 0%,#1C1815 100%)";
