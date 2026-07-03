// Project data for the cosmos landing + case-study pages.
// Each project has: cosmos placement info (accent, planet shape), card/hero
// images, intro copy, and a `sections[]` list of typed content blocks that
// ProjectPage renders generically.

// Project images live in public/projects/<slug>/ instead of linking out to
// the old Adobe Portfolio CDN, so this site keeps working even if that
// account/site is ever taken down. import.meta.env.BASE_URL resolves to '/'
// in dev and '/moses-portfolio/' in production (see vite.config.js), so
// local asset links still work once deployed to GitHub Pages.
const asset = (path) => `${import.meta.env.BASE_URL}projects/${path}`;

export const TRACK = 88;
export const BELL = 0.075;
export const ZOOM_END = 0.12;
export const CONTACT_AT = 0.95;

// Evenly-spaced bell-curve centers for `n` hotspots along the post-intro
// scroll range, leaving room before for the "arrival" and after for contact.
export function centersFor(n) {
  if (n <= 1) return [0.45];
  const start = 0.18, end = 0.82;
  return Array.from({ length: n }, (_, i) => start + ((end - start) * i) / (n - 1));
}

// Bell-curve width to pair with centersFor(n): wide enough that adjacent
// hotspots' cards just touch (a slight overlap for a smooth crossfade)
// instead of leaving a stretch of scroll with no card visible at all — but
// capped, since for very sparse galleries (e.g. n=2, spread across the same
// 0.18–0.82 range as a full one) half the spacing is huge, and an uncapped
// width makes the first card already partly visible at p=0, before the
// user has scrolled at all. The cap keeps bell(0, 0.18, width) ≈ 0 so
// everything starts hidden and only fades in once you actually scroll
// toward it; a sparser gallery just has a bit more empty travel between
// cards instead of zero.
export function bellWidthFor(n) {
  if (n <= 1) return 0.16;
  const spacing = (0.82 - 0.18) / (n - 1);
  return Math.min((spacing / 2) * 1.15, 0.16);
}

export const galaxies = [
  {
    key: 'ads',
    title: 'Advertising & Social',
    tagline: 'Campaigns, scripts, and social work built to shift perception.',
    accent: '#5b8cff',
    tags: ['Advertising', 'Brand Strategy'],
  },
  {
    key: 'film',
    title: 'Short Film & Documentary',
    tagline: 'Personal, true stories told through the camera.',
    accent: '#ff2bd1',
    tags: ['Documentary', 'Short Film'],
  },
];

export const projects = [
  {
    slug: 'denver-sports-betting',
    galaxy: 'ads',
    title: 'Denver Sports Betting',
    tags: ['Social Media', 'Content Creation'],
    accent: '#ff4d5a',
    planet: { radius: 2.4, ring: true, moon: true },
    thumb: asset('denver-sports-betting/logo.jpg'),
    hero: asset('denver-sports-betting/logo.jpg'),
    intro: {
      paragraphs: [
        "For two and a half years — and counting — I've run social media for Denver Sports Betting, Denver's home for betting talk, Broncos memes, and the Denver Sports Betting Show. What started as a 9.5K-follower account is now a verified brand at 18K+ followers, with reels pulling millions of views.",
        "The playbook: show up every day, know exactly what Denver fans are feeling after a win (or a brutal loss), and turn that into content people can't help but share.",
      ],
      details: [
        { label: 'Client', value: 'Denver Sports Betting' },
        { label: 'Role', value: 'Social Media Manager' },
        { label: 'Duration', value: '2.5 years and counting' },
      ],
    },
    sections: [
      {
        type: 'statGrid',
        stats: [
          { number: '2×', text: 'Follower count doubled — from 9.5K to 18K+ — with the account earning its verified badge along the way.' },
          { number: '3.9M', text: 'Views on the top pinned reel. Posts regularly clear six figures, with memes pulling 60K–184K views each.' },
          { number: '900+', text: 'Posts published across two and a half years of game days, offseasons, and everything in between.' },
        ],
      },
      {
        type: 'phoneShots',
        heading: 'The Growth',
        shots: [
          { src: asset('denver-sports-betting/account-before.png'), alt: 'Denver Sports Betting Instagram profile when I took over, at 9,537 followers', label: 'Day One', caption: '9,537 followers when I took over the account.' },
          { src: asset('denver-sports-betting/account-after.png'), alt: 'Denver Sports Betting Instagram profile today, verified with 18K followers', label: 'Today', caption: '18K+ followers, verified — with pinned reels at 1.4M and 3.9M views.' },
        ],
      },
      {
        type: 'textBlock',
        heading: 'The Content',
        paragraphs: [
          "No ad budget. No paid reach. Just knowing the audience — reacting to the moment while it's still the moment, in the voice Denver fans actually talk in. The best posts travel way beyond the follower count:",
        ],
      },
      {
        type: 'phoneShots',
        shots: [
          { src: asset('denver-sports-betting/top-posts.jpg'), alt: 'Grid of Denver Sports Betting meme reels with view counts from 60K to 184K', caption: 'Meme reels riding the news cycle — 63K, 72K, 167K, 184K views.' },
          { src: asset('denver-sports-betting/pinned-posts.png'), alt: 'Denver Sports Betting profile grid with pinned reels at 1.4M and 3.9M views', caption: 'The profile today — pinned reels sitting at 1.4M and 3.9M views.' },
        ],
      },
      {
        type: 'localVideo',
        heading: 'The Top Performer',
        src: asset('denver-sports-betting/top-performing-post.mp4'),
        poster: asset('denver-sports-betting/top-performing-post-poster.jpg'),
        caption: 'The account’s top-performing post — concept, edit, and caption all mine.',
      },
      {
        type: 'textBlock',
        heading: 'Sponsors & The Show',
        paragraphs: [
          'The account is more than memes — it’s a media brand. I build branded content for sponsors like We Live It Media and Flatirons Fire, and cut the Denver Sports Betting Show into clips made for social.',
        ],
      },
      {
        type: 'phoneShots',
        shots: [
          { src: asset('denver-sports-betting/sponsor-graphic.png'), alt: 'Sponsor graphic for We Live It Media and Flatirons Fire', caption: 'Sponsor integrations designed for the feed.' },
        ],
      },
      {
        type: 'localVideo',
        src: asset('denver-sports-betting/edited-show-clip.mp4'),
        poster: asset('denver-sports-betting/edited-show-clip-poster.jpg'),
        caption: 'A Denver Sports Betting Show segment, edited down for Reels.',
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: 'From 9.5K to a verified 18K-strong community.' },
          { tag: 'text', text: ' Millions of impressions, sponsor partnerships, and a daily voice Denver sports fans actually want in their feed.' },
        ],
      },
    ],
  },

  {
    slug: 'spirit-airlines',
    galaxy: 'ads',
    title: 'Spirit Airlines',
    tags: ['Advertising', 'Brand Strategy'],
    accent: '#ff7a18',
    planet: { radius: 2.1, ring: false, moon: true },
    thumb: asset('spirit-airlines/thumb.jpg'),
    hero: asset('spirit-airlines/hero.jpg'),
    intro: {
      paragraphs: [
        "Spirit Airlines built its brand on low fares, but after a failed JetBlue merger, bankruptcy headlines, and media-fueled fear around flight safety, trust took a nosedive (no pun intended). With routes slashed and ticket sales slipping, Spirit isn't just battling competitors — it's battling perception.",
        [{ tag: 'text', text: 'To challenge this, Spirit needs to go all in on ' }, { tag: 'strong', text: 'transparency' }, { tag: 'text', text: '.' }],
      ],
      details: [
        { label: 'Type', value: 'Advertising Campaign / Brand Strategy' },
        { label: 'Objective', value: 'Rebuild trust and reposition Spirit as the smartest way to fly on a budget' },
        { label: 'Approach', value: 'Own the low-cost model with radical transparency and honesty' },
      ],
    },
    sections: [
      {
        type: 'textBlock',
        heading: 'The Challenge',
        paragraphs: [
          [{ tag: 'text', text: "People don't trust the brand, and they confuse " }, { tag: 'em', text: '"cheap"' }, { tag: 'text', text: ' with ' }, { tag: 'em', text: '"unsafe."' }],
          "My first impression: everyone loves to hate Spirit. The objective is clear — rebuild trust and reposition Spirit as the smartest way to fly on a budget.",
        ],
      },
      {
        type: 'imageGrid',
        rows: [{ cols: 1, images: [{ src: asset('spirit-airlines/challenge-overview.png'), alt: 'The Challenge overview', wide: true }] }],
      },
      {
        type: 'textBlock',
        heading: "Who We're Speaking To",
        paragraphs: ["We're not speaking to luxury travelers. We're speaking to the ones who fly with purpose, not perks."],
      },
      {
        type: 'statGrid',
        stats: [
          { number: '47%', text: '18–34 year olds are more likely to fly Spirit than the general population. Side hustlers, gig workers, and creators who know how to stretch a dollar.' },
          { number: '58%', text: 'of Spirit flyers are men. Less brand loyalty, more price sensitivity. They book what makes sense, not what sounds fancy.' },
          { number: '48%', text: 'fall into the lower third of monthly income. Calculated spenders — not broke, just budget-savvy.' },
        ],
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: "They're frequent flyers" }, { tag: 'text', text: ", not frequent complainers. They're " },
          { tag: 'strong', text: 'destination-focused' }, { tag: 'text', text: ", deliberate, and decisive. They know that free snacks aren't really free, and they'd rather keep the $75." },
        ],
      },
      {
        type: 'imageGrid',
        rows: [{
          cols: 2,
          images: [
            { src: asset('spirit-airlines/audience-insights.png'), alt: 'Audience insights' },
            { src: asset('spirit-airlines/audience-data.png'), alt: 'Audience data' },
          ],
        }],
      },
      {
        type: 'textBlock',
        heading: "What They're Saying",
        paragraphs: ["We talked to college students and others who fit Spirit's demo about how they see budget airlines. Here's what we heard:"],
      },
      {
        type: 'quotes',
        quotes: [
          { text: 'It ends up costing the same as a regular airline. You get tricked by the low price, then pay for everything else.', note: "They feel misled — not by the price, but by the lack of transparency." },
          { text: 'I never trusted Spirit. It just feels sketchy.', note: "They're skeptical. Even if they've never had a bad experience, the brand's reputation does the damage." },
          { text: "I'd rather pay more upfront than worry about getting nickel-and-dimed.", note: 'They want control. Not more freebies. Just fewer surprises.' },
        ],
      },
      {
        type: 'persona',
        heading: 'Meet the Target',
        initials: 'JR',
        name: 'Josh Rivera',
        subtitle: 'Age 24 · Fort Lauderdale, FL · Wedding Photographer',
        paragraphs: [
          "Josh is part creative, part entrepreneur, and he's building his business one flight at a time. He books gigs across the country, travels light, and edits on the go. His schedule is flexible, but his income isn't always steady. That means every trip has to make sense — financially and logistically.",
          [{ tag: 'text', text: 'Josh has flown Spirit before. He knows what he\'s getting, but he still hesitates. Not because of the service, but because of the ' }, { tag: 'em', text: 'uncertainty' }, { tag: 'text', text: '. Is he going to get hit with surprise fees? Is the plane safe? Is it worth it?' }],
          [{ tag: 'text', text: "He doesn't need a drink cart or complimentary pretzels. He needs a brand that levels with him. Josh doesn't want upgrades. He wants " }, { tag: 'strong', text: 'clarity' }, { tag: 'text', text: ". And that's what builds trust." }],
        ],
      },
      {
        type: 'imageGrid',
        rows: [{
          cols: 2,
          images: [
            { src: asset('spirit-airlines/persona-research.png'), alt: 'Persona research' },
            { src: asset('spirit-airlines/persona-insights.png'), alt: 'Persona insights' },
          ],
        }],
      },
      {
        type: 'textBlock',
        heading: "The Truth: Spirit Isn't Cutting Corners. They're Cutting Nonsense.",
        paragraphs: ["How much does a soda really cost? A $251 Southwest flight includes free soda, snacks, and a checked bag. A $176 Spirit flight doesn't. But here's the twist: you're still paying for it either way."],
      },
      {
        type: 'priceCompare',
        cards: [
          {
            airline: '✈ Spirit Airlines',
            variant: 'spirit',
            lines: [
              { label: 'Base fare', value: '$122' },
              { label: 'Checked bag (round-trip)', value: '$50' },
              { label: 'Soda', value: '$4' },
              { label: 'Personal item', value: 'Included' },
              { label: 'Total', value: '$176', total: true },
            ],
          },
          {
            airline: '✈ Southwest Airlines',
            variant: 'southwest',
            lines: [
              { label: 'Base fare', value: '$251' },
              { label: 'Checked bag', value: 'Included' },
              { label: 'Soda + snacks', value: 'Included' },
              { label: 'Personal item', value: 'Included' },
              { label: 'Total', value: '$251.96', total: true },
            ],
          },
        ],
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: "That's a $75 soda." }, { tag: 'text', text: " Spirit didn't charge you less because they cut corners. They charged you less because they didn't assume you needed everything — and even if you did, this flight is still cheaper." },
        ],
      },
      {
        type: 'textBlock',
        heading: 'The Work',
        paragraphs: [
          [
            { tag: 'text', text: 'Not free snacks. Not fake luxury. We\'re selling ' }, { tag: 'strong', text: 'clarity' },
            { tag: 'text', text: '. Control. And choice. Spirit isn\'t the airline you settle for — it\'s the airline you ' },
            { tag: 'em', text: 'understand' }, { tag: 'text', text: '. Because when you know what you\'re paying for, you\'re not flying cheap. You\'re flying smart.' },
          ],
        ],
      },
      {
        type: 'imageGrid',
        rows: [
          {
            cols: 2,
            images: [
              { src: asset('spirit-airlines/campaign-work-1.png'), alt: 'Campaign work 1' },
              { src: asset('spirit-airlines/campaign-work-2.png'), alt: 'Campaign work 2' },
              { src: asset('spirit-airlines/campaign-work-3.png'), alt: 'Campaign work 3' },
              { src: asset('spirit-airlines/campaign-work-4.png'), alt: 'Campaign work 4' },
            ],
          },
          {
            cols: 1,
            images: [{ src: asset('spirit-airlines/campaign-final-spread.png'), alt: 'Campaign final spread', wide: true }],
          },
        ],
      },
    ],
  },

  {
    slug: 'rise-comedy',
    galaxy: 'ads',
    title: 'Rise Comedy',
    tags: ['Social Media', 'Graphic Design'],
    accent: '#ffcf3d',
    planet: { radius: 2.3, ring: false, moon: false },
    thumb: asset('rise-comedy/comedy-classes-graphic.jpg'),
    hero: asset('rise-comedy/comedy-classes-graphic.jpg'),
    intro: {
      paragraphs: [
        "During a two-month internship with Rise Comedy — Denver's home for standup, improv, and sketch comedy — I helped bring video to a social feed that had, until then, been graphics-only.",
        'Alongside producing short video content for Instagram, I designed promotional graphics for classes and shows, built out the posting schedule, and tracked engagement to see what actually landed with their audience.',
      ],
      details: [
        { label: 'Client', value: 'Rise Comedy' },
        { label: 'Role', value: 'Social Media Intern' },
        { label: 'Duration', value: '2-month internship' },
      ],
    },
    sections: [
      {
        type: 'statGrid',
        stats: [
          { number: '4.8K', text: 'Followers on Rise Comedy’s Instagram — one feed covering the comedy club, its class program, and its annual festival.' },
          { number: '71.5K', text: 'Views in a recent 30-day stretch, per the account’s own analytics dashboard.' },
          { number: '2,357', text: 'Posts in the account’s history — the archive I was adding video content into.' },
        ],
      },
      {
        type: 'phoneShots',
        heading: 'The Account',
        shots: [
          { src: asset('rise-comedy/account-screenshot.jpg'), alt: 'Rise Comedy Instagram profile, a Denver comedy club with 4,798 followers', caption: 'Rise Comedy’s Instagram — shows, classes, and festival programming in one feed.' },
        ],
      },
      {
        type: 'textBlock',
        heading: 'Adding Video to a Graphics-Only Feed',
        paragraphs: [
          "Rise Comedy's feed leaned entirely on static graphics — flyers for shows, class promos, festival announcements. My focus was introducing short-form video alongside that existing style, giving the feed some actual motion and personality without abandoning the graphic-heavy look their audience already knew.",
          "I also kept the graphics pipeline going, built the posting calendar so content went out consistently, and tracked engagement each week to see which formats — video or graphic — were actually resonating.",
        ],
      },
      {
        type: 'localVideo',
        wide: true,
        heading: 'Video Content',
        src: asset('rise-comedy/social-video-1.mp4'),
        poster: asset('rise-comedy/social-video-1-poster.jpg'),
        caption: 'A captioned, on-camera interview clip shot in front of Rise Comedy’s step-and-repeat — one of the first video formats added to the feed.',
      },
      {
        type: 'localVideo',
        wide: true,
        src: asset('rise-comedy/social-video-2.mp4'),
        poster: asset('rise-comedy/social-video-2-poster.jpg'),
        caption: 'Another interview-style clip from the same series, edited with on-screen captions for sound-off viewing.',
      },
      {
        type: 'localVideo',
        wide: true,
        src: asset('rise-comedy/social-video-landscape.mp4'),
        poster: asset('rise-comedy/social-video-landscape-poster.jpg'),
        caption: 'A landscape cut of the same interview series, framed for wider platforms like YouTube.',
      },
      {
        type: 'phoneShots',
        heading: 'Graphics',
        shots: [
          { src: asset('rise-comedy/comedy-classes-graphic.jpg'), alt: 'Neon-styled graphic promoting Rise Comedy improv, sketch, and standup classes', caption: 'Promo graphic for Rise Comedy’s class program.' },
          { src: asset('rise-comedy/open-mic-graphic.jpg'), alt: 'Rise & Shine graphic promoting Rise Comedy’s weekly open mic night', caption: 'Weekly open mic promo — sign-up and show times front and center.' },
        ],
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: 'Two months, one feed, two content styles working together.' },
          { tag: 'text', text: ' Video gave the account new energy; the graphics — and a real posting rhythm behind both — kept it consistent.' },
        ],
      },
    ],
  },

  {
    slug: 'unique-communications-ireland',
    galaxy: 'ads',
    title: 'Unique Communications Ireland',
    tags: ['Advertising', 'Script Writing'],
    accent: '#5b8cff',
    planet: { radius: 2.6, ring: true, moon: false },
    thumb: asset('unique-communications-ireland/thumb.png'),
    hero: asset('unique-communications-ireland/hero.png'),
    intro: {
      paragraphs: [
        "During an 8-week summer internship with Unique Communications in Dublin, Ireland, I gained hands-on experience researching clients, writing scripts, capturing promotional photos for websites, and filming social media ads.",
      ],
      details: [
        { label: 'Location', value: 'Dublin, Ireland' },
        { label: 'Duration', value: '8-week summer internship' },
        { label: 'Work', value: 'Script writing, photography, social media ads' },
      ],
    },
    sections: [
      {
        type: 'scriptCards',
        heading: 'Script Writing',
        cards: [
          {
            client: 'Tidy Storage',
            paragraphs: [
              [{ tag: 'em', text: '"Bin Chaos vs. Tidy Storage"' }],
              [
                { tag: 'direction', text: '[Opening shot: A grey, rainy day in a Dublin neighborhood]' },
                { tag: 'direction', text: '[Camera zooms in on a house with overflowing bins in front]' },
                { tag: 'direction', text: '[Wind blows the lid open. Trash spills across the driveway. A soggy pizza box flops into a puddle.]' },
                { tag: 'direction', text: '[Sound: Wind, rain, squelch, distant dog barking]' },
              ],
              [
                { tag: 'direction', text: "[Cut to neighbor's house next door: sleek, modern bin storage units from Tidy Storage]" },
                { tag: 'direction', text: '[The bins are neatly hidden. Rain rolls off the roof. Everything looks tidy and calm.]' },
                { tag: 'direction', text: '[Close ups of security features]' },
              ],
              [
                { tag: 'vo', text: '"Even your bins deserve better. Tidy Storage"' },
                { tag: 'direction', text: '[Text on screen / VoiceOver]: "Even your bins deserve better. Tidy Storage"' },
                { tag: 'direction', text: '[End with TidyStorage.ie logo over a few quick shots of each size option being assembled]' },
              ],
            ],
          },
          {
            client: 'ShuttersandDoors.ie',
            paragraphs: [
              [
                { tag: 'strong', text: 'Scene 1:' },
                { tag: 'direction', text: '[Factory footage: cutting, welding, assembly]' },
                { tag: 'vo', text: 'Voiceover: "Steel doors. Built tough. Delivered fast."' },
              ],
              [
                { tag: 'strong', text: 'Scene 2:' },
                { tag: 'direction', text: '[Showcase: security doors, fire exit doors, accessories]' },
                { tag: 'vo', text: 'Voiceover: "Security doors with reinforced steel cores. Emergency exits with panic bars and fire ratings. Accessories that complete the job."' },
              ],
              [
                { tag: 'strong', text: 'Scene 3:' },
                { tag: 'direction', text: '[Quick installs in retail, warehouses, schools]' },
                { tag: 'vo', text: 'Voiceover: "Standard sizes. Clean fit. Zero nonsense."' },
              ],
              [
                { tag: 'strong', text: 'Scene 4:' },
                { tag: 'direction', text: "[Overlay: 'Quick Lead Times | Tested | Trusted']" },
                { tag: 'vo', text: 'Voiceover: "Trusted across Ireland by contractors, facility managers, and business owners."' },
              ],
              [
                { tag: 'strong', text: 'Closing Scene:' },
                { tag: 'direction', text: '[Logo + contact info]' },
                { tag: 'vo', text: 'Voiceover: "ShuttersandDoors.ie — serious protection, made simple."' },
              ],
            ],
          },
          {
            client: 'Clifford Fireplaces',
            paragraphs: [
              [
                { tag: 'strong', text: '[0–5s]' },
                { tag: 'direction', text: 'Person walking through showroom, gesturing to fireplaces.' },
                { tag: 'vo', text: '"Picking a fireplace? Just bring a few photos, your room size, and fuel preference."' },
              ],
              [
                { tag: 'strong', text: '[5–10s]' },
                { tag: 'direction', text: 'Snap to a few fireplace styles: cast iron, marble, electric.' },
                { tag: 'vo', text: "VO: \"We'll help you match the perfect style to your space.\"" },
              ],
              [
                { tag: 'strong', text: '[10–15s]' },
                { tag: 'direction', text: 'Person at design desk, smiling.' },
                { tag: 'vo', text: '"Design, supply, install — easy. Visit CliffordFireplaces.com."' },
              ],
            ],
          },
        ],
      },
      {
        type: 'imageGrid',
        heading: 'Photos for Harte Peat Website',
        rows: [
          {
            cols: 2,
            images: [
              { src: asset('unique-communications-ireland/harte-peat-1.png'), alt: 'Harte Peat 1' },
              { src: asset('unique-communications-ireland/harte-peat-2.png'), alt: 'Harte Peat 2' },
              { src: asset('unique-communications-ireland/harte-peat-3.png'), alt: 'Harte Peat 3' },
              { src: asset('unique-communications-ireland/harte-peat-4.png'), alt: 'Harte Peat 4' },
            ],
          },
          {
            cols: 1,
            images: [
              { src: asset('unique-communications-ireland/harte-peat-5.png'), alt: 'Harte Peat 5', wide: true },
            ],
          },
        ],
      },
      {
        type: 'imageGrid',
        heading: 'Social Media Ads for Unique Communications',
        rows: [
          {
            cols: 2,
            images: [
              { src: asset('unique-communications-ireland/social-ad-1.png'), alt: 'Social Ad 1' },
              { src: asset('unique-communications-ireland/social-ad-2.png'), alt: 'Social Ad 2' },
              { src: asset('unique-communications-ireland/social-ad-3.png'), alt: 'Social Ad 3' },
              { src: asset('unique-communications-ireland/social-ad-4.png'), alt: 'Social Ad 4' },
            ],
          },
          {
            cols: 1,
            images: [
              { src: asset('unique-communications-ireland/social-ad-5.png'), alt: 'Social Ad 5', wide: true },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'built-from-grief',
    galaxy: 'film',
    title: 'Built From Grief',
    tags: ['Documentary', 'Design'],
    accent: '#6c7fd8',
    planet: { radius: 2.6, ring: false, moon: false },
    thumb: asset('built-from-grief/hero.jpg'),
    hero: asset('built-from-grief/hero.jpg'),
    intro: {
      paragraphs: [
        'Architectonics: Suicide Memorials is a three-part documentary series following a CU Boulder design class given an unusually heavy brief: design a memorial for suicide loss. Built From Grief is the first episode.',
        "The episode follows three students through the actual design process — research, iteration, presentation — while carrying the emotional weight of the subject the whole way through. It's less about the finished memorials than about what it takes, personally, to sit with grief long enough to design something honest about it.",
      ],
      details: [
        { label: 'Series', value: 'Architectonics: Suicide Memorials' },
        { label: 'Episode', value: '1 of 3 — "Built From Grief"' },
        { label: 'Subject', value: 'A CU Boulder class designing memorials for suicide loss' },
      ],
    },
    sections: [
      { type: 'vimeo', heading: 'Watch the Film', videoId: '1198130458', hash: '75b4c566fd' },
    ],
  },

  {
    slug: 'the-speeks',
    galaxy: 'film',
    title: 'The Speeks',
    tags: ['Documentary', 'Music'],
    accent: '#ff6b4a',
    planet: { radius: 2.5, ring: true, moon: false },
    thumb: asset('the-speeks/hero.jpg'),
    hero: asset('the-speeks/hero.jpg'),
    intro: {
      paragraphs: [
        'THE SPEEKS is a short documentary following the band of the same name — a group of Boulder, Colorado college students turning late-night practices into a debut EP and a growing local following.',
        'Built around interviews with band members Micah and Cooper, the film follows what it actually takes to be a student and a band at the same time — the writing, the rehearsals, and the shows that make it real.',
      ],
      details: [
        { label: 'Type', value: 'Short Documentary' },
        { label: 'Subject', value: 'The Speeks — student band, Boulder, CO' },
        { label: 'Format', value: 'Interviews + live performance footage' },
      ],
    },
    sections: [
      { type: 'youtube', heading: 'Watch the Film', videoId: 'g39U6mtSrX0' },
      {
        type: 'linkButton',
        label: 'Listen to The Speeks on Spotify →',
        href: 'https://open.spotify.com/artist/5uGReuWv7B8dfOi7RUYL6Q',
      },
    ],
  },

  {
    slug: 'success',
    galaxy: 'film',
    title: 'Success.',
    tags: ['Personal Documentary'],
    accent: '#18e0ff',
    planet: { radius: 2.4, ring: false, moon: true },
    thumb: asset('success/cover.png'),
    hero: asset('success/cover.png'),
    intro: {
      paragraphs: [
        'As I started thinking seriously about my future, one question kept coming up: What does it actually mean to be successful?',
        'Success is a personal documentary that explores this question through intimate interviews with friends and family — each with their own definitions, doubts, and dreams. I layered those conversations with my own voiceover, reflecting on the pressure to "make it," and whether success is something we define for ourselves — or something the world defines for us.',
      ],
      details: [
        { label: 'Type', value: 'Personal Documentary' },
        { label: 'Subject', value: 'Defining success on your own terms' },
        { label: 'Format', value: 'Intimate interviews + personal voiceover' },
      ],
    },
    sections: [
      { type: 'video', heading: 'Watch the Film', videoId: 'QA55YFmIvuA' },
    ],
  },

  {
    slug: 'how-she-hurt-me',
    galaxy: 'film',
    title: 'How She Hurt Me',
    tags: ['Short Film', 'Documentary'],
    accent: '#9b5cff',
    planet: { radius: 2.7, ring: false, moon: false },
    thumb: asset('how-she-hurt-me/cover.png'),
    hero: asset('how-she-hurt-me/cover.png'),
    intro: {
      paragraphs: [
        "Created during my time in the Boulder Technical Education Center's video production program, How She Hurt Me is a deeply personal short documentary about teen addiction — told through the metaphor of a toxic relationship.",
        'The film explores the emotional grip of substance abuse by personifying addiction as a romantic partner: alluring, destructive, and impossible to fully forget. It was inspired by real losses — friends and peers I grew up with who died from overdoses.',
        "This project was my way of making sense of it all — and more importantly, to start conversations about what so many teens go through in silence. It's a tribute, a warning, and a call for awareness.",
      ],
      details: [
        { label: 'Type', value: 'Short Documentary' },
        { label: 'Program', value: 'Boulder Technical Education Center — Video Production' },
        { label: 'Subject', value: 'Teen addiction told through metaphor' },
      ],
    },
    sections: [
      { type: 'video', heading: 'Watch the Film', videoId: 'QZZdPE3yq7R' },
    ],
  },

  {
    slug: 'advice-from-strangers',
    galaxy: 'film',
    title: 'Advice from Strangers',
    tags: ['Short Film', 'Documentary'],
    accent: '#ff2bd1',
    planet: { radius: 2.0, ring: true, moon: false },
    thumb: asset('advice-from-strangers/cover.png'),
    hero: asset('advice-from-strangers/cover.png'),
    intro: {
      paragraphs: [
        'Advice from Strangers is a light, heartwarming short film born from a simple idea: What if we just asked people for one piece of advice?',
        "A friend and I hit the Pearl Street Mall in Boulder with a camera and a question. The responses were spontaneous, funny, wise, and surprisingly human. There's no narrator. No agenda. Just strangers sharing real thoughts in a moment of connection.",
      ],
      details: [
        { label: 'Type', value: 'Short Documentary' },
        { label: 'Location', value: 'Pearl Street Mall, Boulder, CO' },
        { label: 'Style', value: 'Observational / Vérité' },
      ],
    },
    sections: [
      { type: 'video', heading: 'Watch the Film', videoId: '7Xk8Nyngy6q' },
    ],
  },

  {
    slug: 'betting-the-future',
    galaxy: 'film',
    title: 'Betting the Future',
    tags: ['Documentary', 'Short Film'],
    accent: '#b6ff3b',
    planet: { radius: 2.9, ring: false, moon: false },
    thumb: asset('betting-the-future/cover.png'),
    hero: asset('betting-the-future/cover.png'),
    intro: {
      paragraphs: [
        "This isn't a moral panic piece. It's an unfiltered look at how easy, addictive, and omnipresent sports betting has become — especially for a generation raised on apps, odds, and influencer endorsements.",
        "By letting the media speak for itself and the interviewees speak their truth, Betting The Future captures the intensity of a culture that's turning risk into routine.",
      ],
      details: [
        { label: 'Type', value: 'Short Documentary' },
        { label: 'Subject', value: 'Sports betting culture & youth' },
        { label: 'Approach', value: 'Unfiltered media analysis + direct interviews' },
      ],
    },
    sections: [
      { type: 'video', heading: 'Watch the Film', videoId: 'HN5UykU2xPQ' },
    ],
  },

];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
export const getGalaxy = (key) => galaxies.find((g) => g.key === key);
export const getProjectsByGalaxy = (key) => projects.filter((p) => p.galaxy === key);

// "Next project" stays within the same gallery (galaxy) and wraps around.
export const getNextProject = (slug) => {
  const current = getProjectBySlug(slug);
  if (!current) return null;
  const siblings = getProjectsByGalaxy(current.galaxy);
  const i = siblings.findIndex((p) => p.slug === slug);
  return siblings[(i + 1) % siblings.length];
};
