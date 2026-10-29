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
// instead of leaving a stretch of scroll with no card visible at all, but
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
        "For two and a half years, and counting, I've run social media for Denver Sports Betting, Denver's home for betting talk, Broncos memes, and the Denver Sports Betting Show. What started as a 9.5K-follower account is now a verified brand at 18K+ followers, with reels pulling millions of views.",
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
          { number: '2×', text: 'Follower count doubled, from 9.5K to 18K+, with the account earning its verified badge along the way.' },
          { number: '3.9M', text: 'Views on the top pinned reel. Posts regularly clear six figures, with memes pulling 60K–184K views each.' },
          { number: '900+', text: 'Posts published across two and a half years of game days, offseasons, and everything in between.' },
        ],
      },
      {
        type: 'phoneShots',
        heading: 'The Growth',
        shots: [
          { src: asset('denver-sports-betting/account-before.jpg'), alt: 'Denver Sports Betting Instagram profile when I took over, at 9,537 followers', label: 'Day One', caption: '9,537 followers when I took over the account.' },
          { src: asset('denver-sports-betting/account-after.jpg'), alt: 'Denver Sports Betting Instagram profile today, verified with 18K followers', label: 'Today', caption: '18K+ followers, verified, with pinned reels at 1.4M and 3.9M views.' },
        ],
      },
      {
        type: 'textBlock',
        heading: 'The Content',
        paragraphs: [
          "No ad budget. No paid reach. Just knowing the audience, reacting to the moment while it's still the moment, in the voice Denver fans actually talk in. The best posts travel way beyond the follower count:",
        ],
      },
      {
        type: 'phoneShots',
        shots: [
          { src: asset('denver-sports-betting/top-posts.jpg'), alt: 'Grid of Denver Sports Betting meme reels with view counts from 60K to 184K', caption: 'Meme reels riding the news cycle: 63K, 72K, 167K, 184K views.' },
          { src: asset('denver-sports-betting/pinned-posts.jpg'), alt: 'Denver Sports Betting profile grid with pinned reels at 1.4M and 3.9M views', caption: 'The profile today: pinned reels sitting at 1.4M and 3.9M views.' },
        ],
      },
      {
        type: 'localVideo',
        heading: 'The Top Performer',
        src: asset('denver-sports-betting/top-performing-post.mp4'),
        poster: asset('denver-sports-betting/top-performing-post-poster.jpg'),
        caption: 'The account’s top-performing post: concept, edit, and caption all mine.',
      },
      {
        type: 'textBlock',
        heading: 'Sponsors & The Show',
        paragraphs: [
          'The account is more than memes: it’s a media brand. I build branded content for sponsors like We Live It Media and Flatirons Fire, and cut the Denver Sports Betting Show into clips made for social.',
        ],
      },
      {
        type: 'phoneShots',
        shots: [
          { src: asset('denver-sports-betting/sponsor-graphic.jpg'), alt: 'Sponsor graphic for We Live It Media and Flatirons Fire', caption: 'Sponsor integrations designed for the feed.' },
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
    slug: 'nfl-nsac',
    galaxy: 'ads',
    title: 'NFL: It Starts With One',
    tags: ['Brand Strategy', 'Integrated Campaign'],
    accent: '#d50a0a',
    planet: { radius: 2.8, ring: true, moon: true },
    thumb: asset('nfl-nsac/cover.jpg'),
    hero: asset('nfl-nsac/cover.jpg'),
    intro: {
      paragraphs: [
        "For the American Advertising Federation's National Student Advertising Competition, the country's premier student ad competition since 1973, our CU Boulder team (Team 519) was given a real client and a real brief: the NFL. The task was to unify a decade of scattered youth health and wellness programs (NFL Flag, Play 60, My Cause My Cleats, Character Playbook) into one campaign that actually changes how people see the League.",
        "Girls and women see football as exclusive and hyper-masculine. Casual fans have no idea these programs even exist. Over the course of the competition, our six-person team built the research, the strategy, the creative identity, and a full $10M media plan to fix that: an entire agency's worth of work, from strategy to execution.",
      ],
      details: [
        { label: 'Client', value: 'NFL, via AAF National Student Advertising Competition' },
        { label: 'Team', value: 'Team 519, University of Colorado Boulder' },
        { label: 'Scope', value: 'Research, brand strategy, creative identity, media plan' },
      ],
    },
    sections: [
      {
        type: 'textBlock',
        heading: 'The Challenge',
        paragraphs: [
          'For a decade, the NFL has launched purpose-led campaigns around its youth health and wellness initiatives, yet most people have no idea the League has a year-round presence in schools and communities nationwide. Fragmented messaging and inconsistent measurement have left the NFL without one holistic identity tying it all together.',
          "The primary audience is casual NFL fans who enjoy football's communal side without being deeply invested. At the center of it: today's youth (ages 6–17): girls who want to compete but feel culturally excluded, and boys who need to learn to welcome them. Parents are the gatekeepers who decide whether their kids ever get the invitation in the first place.",
        ],
      },
      {
        type: 'statGrid',
        stats: [
          { number: '306', text: 'Survey respondents, ages 16–60, behind every insight in this campaign.' },
          { number: '16', text: 'Focus groups: parents, college students, and casual fans.' },
          { number: '4', text: 'Audience personas built to keep the strategy grounded in real people, not just data.' },
        ],
      },
      {
        type: 'textBlock',
        heading: 'What We Found',
        paragraphs: [
          "Play has moved from outside to online. Today's youth reach for a screen before a ball: screen time over an hour a day is linked to a higher risk of depression, while consistent physical activity cuts anxiety and depressive symptoms by up to 28%.",
          "That's made worse by exclusivity: 70% of girls drop out of sports by age 14, twice the rate of boys, and kids from low-income households are 6x more likely to quit over cost alone. One focus group participant put it bluntly: “When I think about the NFL and what I associate with it, it's hyper-masculinity.”",
          "But the fix doesn't have to be big. One mentor creates 5x the likelihood of upward progress. One small action triggers the same psychological pull as an unfinished to-do list: the brain wants to see it through. No invitation is too small to change the trajectory.",
        ],
      },
      {
        type: 'persona',
        heading: 'Meet the Audience',
        initials: 'BB',
        name: 'Burnt Out Brooklyn',
        subtitle: '16 · Austin, TX · Primary Audience',
        paragraphs: [
          "Brooklyn has played field hockey her whole life. This semester, she quit her varsity team: her coach stripped the fun out of the sport she loved, and she was shamed for having a muscular build. She's taken up yoga and jewelry-making since, and likes that they feel more “girly,” but deep down she misses the competitiveness and community of a team.",
          'She lives on TikTok, YouTube, and Instagram, where frequent use is already linked to worse mental health outcomes for teen girls than for boys.',
        ],
      },
      {
        type: 'persona',
        heading: '',
        initials: 'PP',
        name: 'Papa Phil',
        subtitle: '43 · Tampa, FL · Secondary Audience',
        paragraphs: [
          'Phil is a nurse practitioner, a former college cornerback, and a Buccaneers fan who watches every game with his 14-year-old son, teaching him to play, inspiring him to follow in his footsteps. He has a 7-year-old daughter, too. As he teaches his son football, he never once considers teaching her.',
          "That's the gatekeeper problem in one house: the invitation only goes one way, without anyone deciding to keep it that way.",
        ],
      },
      {
        type: 'textBlock',
        heading: 'The Solution: It Starts With One',
        paragraphs: [
          "Audiences ignore messages that speak to a broad crowd instead of to them individually. They need a spark of encouragement, proof that their own actions matter more than they think. So the strategy became a single unifying idea: a campaign that puts every NFL youth program under one identity, and turns every parent, coach, and casual fan into the “01” who starts something for someone else.",
          '“It Starts With One” deliberately echoes the NFL\'s own recent “It Takes All of Us” language: familiar, but reframed around the power of a single person inside a larger group.',
        ],
      },
      {
        type: 'callout',
        content: [
          { tag: 'text', text: 'Behind every great movement, there is a beginning. A backstory. Starting with one idea. One action. One moment. It doesn\'t matter how many times you get knocked down, because you only need one win to keep going. One person to inspire you. One invitation to belong. Together we win. ' },
          { tag: 'strong', text: 'It starts with one.' },
        ],
      },
      {
        type: 'imageGrid',
        heading: 'Bringing the Identity to Life',
        rows: [
          { cols: 1, images: [{ src: asset('nfl-nsac/billboard.jpg'), alt: 'Campaign billboard: "01 Parent to see her Potential" over a girls\' soccer huddle', wide: true }] },
        ],
      },
      {
        type: 'localVideo',
        wide: true,
        heading: 'The Anthem Spot',
        src: asset('nfl-nsac/anthem-spot.mp4'),
        poster: asset('nfl-nsac/anthem-spot-poster.jpg'),
        caption: 'The campaign\'s :30 TV anthem spot, written and produced for the plans book presentation.',
      },
      {
        type: 'textBlock',
        heading: 'Media Strategy',
        paragraphs: [
          'A yearlong rollout across three phases keeps the message tied to the NFL calendar: Launch (Aug–Dec) drives awareness of the programs that exist; Peak (Jan–Feb) leans on the Super Bowl moment to lift brand perception; Post-Season (Mar–Jul) shifts from storytelling to activation, pushing families toward real sign-ups.',
          'The plan spans streaming and TV, social, out-of-home, cinema, gaming and retail partnerships (Madden, Dick\'s Sporting Goods), PR activations, and owned stadium placements, across both domestic and international markets.',
        ],
      },
      {
        type: 'statGrid',
        stats: [
          { number: '$10M', text: 'Total media budget across the full 11-month, 3-phase rollout.' },
          { number: '4.6B', text: 'Projected impressions across every paid channel.' },
          { number: '4.86M', text: 'Projected clicks driving families to the campaign\'s program hub.' },
        ],
      },
      {
        type: 'imageGrid',
        heading: 'Campaign Touchpoints',
        rows: [
          {
            cols: 2,
            images: [
              { src: asset('nfl-nsac/social-post.jpg'), alt: '"Share Your One" social stunt: a phone mockup inviting people to post the one person or moment that changed everything for them' },
              { src: asset('nfl-nsac/hub-screenshot.jpg'), alt: 'The "01 NFL Hub" website and app mockup, the one place to explore and sign up for every NFL youth program' },
            ],
          },
          {
            cols: 2,
            images: [
              { src: asset('nfl-nsac/bus-wrap.jpg'), alt: 'Bus wrap: "01 Coach to inspire Change" featuring a youth football team' },
              { src: asset('nfl-nsac/stadium-seat.jpg'), alt: 'The "01 Seat" PR activation: a reserved, branded seat at a live game honoring one person whose impact goes beyond the field' },
            ],
          },
        ],
      },
      {
        type: 'textBlock',
        heading: 'Social Content',
        paragraphs: [
          '"Share Your One" is a social stunt built to travel: it asks people to post the one person, moment, or experience that changed everything for them, turning a campaign line into something the audience actually says in their own words. Two of the social cuts built around that question:',
        ],
      },
      {
        type: 'localVideo',
        src: asset('nfl-nsac/social-promo-1.mp4'),
        poster: asset('nfl-nsac/social-promo-1-poster.jpg'),
        caption: '"What\'s your ONE moment?": a social cut built around the campaign\'s core question.',
      },
      {
        type: 'localVideo',
        src: asset('nfl-nsac/social-promo-2.mp4'),
        poster: asset('nfl-nsac/social-promo-2-poster.jpg'),
        caption: '"Who\'s the ONE that gets you out to play?": a second cut of the same social concept.',
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: '84% of people we tested felt connected to the campaign\'s local-care message, and 60% preferred "It Starts With One" concepts over the alternatives.' },
          { tag: 'text', text: ' A full agency-style campaign built from scratch by a six-person student team: research, strategy, identity, film, and a $10M media plan. from scratch by a six-person student team.' },
        ],
      },
    ],
  },

  {
    slug: 'no-on-2k',
    galaxy: 'ads',
    title: 'No on 2K',
    tags: ['Political', 'Paid Media'],
    accent: '#ff5d8f',
    planet: { radius: 2.6, ring: false, moon: true },
    thumb: asset('no-on-2k/cover.jpg'),
    hero: asset('no-on-2k/cover.jpg'),
    intro: {
      paragraphs: [
        'No on 2K: Demand Fiscal Responsibility is the Boulder, Colorado committee that opposed Ballot Issue 2K, a $400 million city bond. Working through the campaign manager as Markels Creative, I handled social media, paid ads on Meta and Google, website embeds, email, and video editing.',
        'The campaign had about six weeks, a small team, and one fixed deadline: Election Day, November 3, 2026. The job was to turn the committee\'s message into clear, consistent creative across every channel, and to spend a limited ad budget where it would be seen.',
      ],
      details: [
        { label: 'Client', value: 'No on 2K: Demand Fiscal Responsibility' },
        { label: 'Role', value: 'Paid ads, social media, video editing, website embeds, email' },
        { label: 'Duration', value: 'September to November 2026' },
      ],
    },
    sections: [
      {
        type: 'textBlock',
        heading: 'The Situation',
        paragraphs: [
          'Ballot Issue 2K asked Boulder voters to approve up to $400 million in city debt. The committee opposed it and wanted voters to ask for a clearer plan and cost before they voted. That was the campaign\'s message, and my job was to present it clearly, not to argue it for them.',
          'Most voters decide late on local ballot measures. So the work had to be ready before ballots arrived, easy to read on a phone, and consistent enough that a voter would recognize it from one ad to the next.',
        ],
      },
      {
        type: 'textBlock',
        heading: 'The Paid Media Plan',
        paragraphs: [
          'Step 1, pick the channels. Meta (Facebook and Instagram) was the main channel, because that is where Boulder voters are and where the creative was built to fit. Google Search was a small, low cost layer for people looking up "Boulder 2K." Google Display and Daily Camera ads (homepage takeovers and a Sunday half page) rounded out the plan.',
          'Step 2, set the flight. Build and test first, to find which ads work. Then spend the most from the week ballots arrive, using only the winners. Then a final get out the vote push using ads that already ran.',
          'Step 3, target carefully. Meta limits political targeting, so there was no voter file. I kept to the City of Boulder, adults 25 and older, and a cap of about 3 views per person per week so the same people did not get worn out.',
          'Step 4, build every size once. The Creative Book collects 95 ad files across 4 channels and 5 core messages, so each message looked the same everywhere.',
        ],
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: 'The Meta last week rule.' },
          { tag: 'text', text: ' Meta stops accepting new political ads in the final seven days before Election Day. Ads that already ran keep running. So every ad we wanted for the last week had to be live and had to have at least one view before about October 26.' },
        ],
      },
      {
        type: 'phoneShots',
        heading: 'Paid graphics: making the case',
        shots: [
          {
            src: asset('no-on-2k/ad-cost.jpg'),
            alt: 'Meta feed ad with a Boulder sunset photo on top, a large $8,000 headline on navy, and a red Vote No on 2K bar with the committee logo at the bottom.',
            label: 'Cost',
            caption: 'One big number, one plain sentence.',
          },
          {
            src: asset('no-on-2k/ad-debt.jpg'),
            alt: 'Meta feed ad with a lake and mountain photo, a large $650M headline on navy, and a red Vote No on 2K bar at the bottom.',
            label: 'Debt',
            caption: 'Same layout, new message.',
          },
          {
            src: asset('no-on-2k/ad-no-plan.jpg'),
            alt: 'Meta feed ad with a Flatirons photo, a headline reading No plan on navy, and a red Vote No on 2K bar at the bottom.',
            label: 'No plan',
            caption: 'Makes clear the question is the plan, not whether Boulder builds.',
          },
        ],
      },
      {
        type: 'phoneShots',
        heading: 'Paid graphics: sign up, give, vote',
        shots: [
          {
            src: asset('no-on-2k/ad-add-your-name.jpg'),
            alt: 'Meta feed ad with a trail and mountain photo, an Add your name headline on navy with a white button, and a red Vote No on 2K bar.',
            label: 'List building',
          },
          {
            src: asset('no-on-2k/ad-chip-in.jpg'),
            alt: 'Meta feed ad with a reflective lake photo, a Chip in headline on navy with a white Donate button, and a red Vote No on 2K bar.',
            label: 'Donate',
          },
          {
            src: asset('no-on-2k/ad-vote-nov-3.jpg'),
            alt: 'Meta feed ad with blue sky and a mountain, a Nov 3 headline on navy saying ballots are due by 7 p.m., and a red Vote No on 2K bar.',
            label: 'Get out the vote',
          },
        ],
      },
      {
        type: 'phoneShots',
        heading: 'Daily Camera, press conference, and email',
        shots: [
          {
            src: asset('no-on-2k/daily-camera-takeover.jpg'),
            alt: 'Five Daily Camera homepage takeover banner sizes shown together, all with a $650M headline, a Boulder aerial photo, and a red Vote No on 2K bar.',
            label: 'Daily Camera takeover',
            caption: 'Every banner size the site required, built from one design.',
          },
          {
            src: asset('no-on-2k/press-conference-graphic.jpg'),
            alt: 'Navy event graphic reading No Blank Checks, with the Thursday, Oct. 15 noon press conference details and the committee logo.',
            label: 'Press conference',
            caption: 'Promo for the October 15 event at the Alpine-Balsam site.',
          },
          {
            src: asset('no-on-2k/rally-email.jpg'),
            alt: 'Full length email with a navy header reading No Blank Checks, a boxed event time and place, five ways to help, and a donate button.',
            label: 'Rally email',
            caption: 'Invite plus five simple ways to help.',
          },
        ],
      },
      {
        type: 'textBlock',
        heading: 'The Press Conference Video',
        paragraphs: [
          'On October 15, the campaign held a press conference at the Alpine-Balsam site with community leaders, local business groups, former mayors, and City Council candidates. I edited the footage into vertical clips and reels with captions, a branded header, and the committee\'s "Paid for by" line on every one.',
        ],
      },
      {
        type: 'localVideo',
        heading: 'Press conference clips and reels',
        src: asset('no-on-2k/press-clip-trust-us.mp4'),
        poster: asset('no-on-2k/press-clip-trust-us-poster.jpg'),
        caption: 'A short cut from the press conference, with captions.',
      },
      {
        type: 'localVideo',
        src: asset('no-on-2k/press-reel-too-much.mp4'),
        poster: asset('no-on-2k/press-reel-too-much-poster.jpg'),
        caption: 'A City Council candidate speaking to camera after the event, with a headline and captions.',
      },
      {
        type: 'localVideo',
        src: asset('no-on-2k/press-clip-not-never.mp4'),
        poster: asset('no-on-2k/press-clip-not-never-poster.jpg'),
        caption: 'A highlight from the question and answer session.',
      },
      {
        type: 'textBlock',
        heading: 'Motion Graphic Reels',
        paragraphs: [
          'For paid social I also made short motion graphic reels. They put one idea on screen at a time, with big type and a simple branded layout, so the point lands even with the sound off.',
        ],
      },
      {
        type: 'localVideo',
        src: asset('no-on-2k/paid-reel-real-cost.mp4'),
        poster: asset('no-on-2k/paid-reel-real-cost-poster.jpg'),
        caption: 'The Real Cost: a 31 second motion graphic on what the bond could cost with interest.',
      },
      {
        type: 'localVideo',
        src: asset('no-on-2k/paid-reel-no-blank-check.mp4'),
        poster: asset('no-on-2k/paid-reel-no-blank-check-poster.jpg'),
        caption: 'No Blank Check: a 32 second reel on what the committee said the ballot measure did not include.',
      },
      {
        type: 'localVideo',
        src: asset('no-on-2k/paid-reel-whos-saying-no.mp4'),
        poster: asset('no-on-2k/paid-reel-whos-saying-no-poster.jpg'),
        caption: 'Who\'s Saying No: a 34 second reel listing the groups that opposed the measure.',
      },
      {
        type: 'phoneShots',
        heading: 'FAQ carousel',
        shots: [
          {
            src: asset('no-on-2k/faq-slide-1.jpg'),
            alt: 'Carousel slide 1 of 8 with a Flatirons photo behind a headline reading $400 million in new debt.',
            label: 'Slide 1',
          },
          {
            src: asset('no-on-2k/faq-slide-3.jpg'),
            alt: 'Carousel slide 3 of 8 headed Taxpayers deserve to know the real cost, with three white rows showing yearly cost for a $1M, $2M and $3M home.',
            label: 'Slide 3',
          },
          {
            src: asset('no-on-2k/faq-slide-5.jpg'),
            alt: 'Carousel slide 5 of 8 headed A blank check, with three short bullet points on a blue photo background.',
            label: 'Slide 5',
          },
          {
            src: asset('no-on-2k/faq-slide-7.jpg'),
            alt: 'Carousel slide 7 of 8 headed Join us, with a checklist of ways to take part and the get involved web address.',
            label: 'Slide 7',
            caption: 'An 8 slide explainer for Instagram and Facebook that sent people to the site FAQ.',
          },
        ],
      },
      {
        type: 'imageGrid',
        heading: 'Website embeds',
        rows: [
          {
            cols: 1,
            images: [
              {
                src: asset('no-on-2k/site-embed.jpg'),
                alt: 'Preview of an In the News page block for the campaign site, with a press conference video area, candidate video tiles, a press release, and a list of news articles.',
              },
            ],
          },
        ],
      },
      {
        type: 'textBlock',
        paragraphs: [
          'The campaign site was on Wix, so I built the extra pages as embeddable blocks: a FAQ, an endorsements list, a resources page, a donate button, and an In the News page with the press conference, press release, and coverage. I also checked the Get Involved form on a regular schedule and added new endorsers to the page. The image above is a preview of the In the News block.',
        ],
      },
      {
        type: 'statGrid',
        stats: [
          { number: '$1,746', text: 'Total Meta ad spend from October 11 to 26, across 13 ads.' },
          { number: '30,067', text: 'People reached, each counted once, with 91,006 video plays.' },
          { number: '$0.17', text: 'Average cost per viewer who watched 15 seconds or more. 10,308 people did.' },
        ],
      },
      {
        type: 'textBlock',
        heading: 'What We Learned',
        paragraphs: [
          'I sent the campaign manager a report on October 26 with the numbers from Meta Ads Manager. These are paid ads only, and free views on regular posts are not counted.',
          'Trusted local voices worked best. Two ads built around trusted local voices each reached about 15,000 people. The best ad that ran for several days cost about $0.14 per 15 second view.',
          'Video beat image posts by 3 to 4 times on cost per real view, so video became the focus.',
        ],
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: 'Built to be checked.' },
          { tag: 'text', text: ' The ads and reels were built to carry the committee\'s "Paid for by" line, and the creative drew on a fact sheet I wrote at the start of the campaign, which kept sourced facts separate from my own estimates.' },
        ],
      },
    ],
  },

  {
    slug: 'benita-duran',
    galaxy: 'ads',
    title: 'Benita Duran for City Council',
    tags: ['Political', 'Social Media'],
    accent: '#2dd4a0',
    planet: { radius: 2.4, ring: true, moon: false },
    thumb: asset('benita-duran/hero.jpg'),
    hero: asset('benita-duran/hero.jpg'),
    intro: {
      paragraphs: [
        'Benita Duran ran for Boulder City Council in the November 3, 2026 election. I worked on her campaign through the campaign manager as a subcontractor, handling social media, website SEO, graphics, video editing and a small paid ad budget.',
        'The campaign was short and ran on a tight calendar, so the job was to make a lot of clear, consistent material quickly: reels, graphics, display ads and a website that was easy to find and easy to trust.',
      ],
      details: [
        { label: 'Client', value: 'Benita Duran for Boulder City Council' },
        { label: 'Role', value: 'Social media, SEO, graphics, video editing, ad creative' },
        { label: 'Duration', value: 'September to November 2026' },
      ],
    },
    sections: [
      {
        type: 'textBlock',
        heading: 'The Situation',
        paragraphs: [
          'Thirteen candidates were running for five council seats, and voters had little time to get to know any one of them. Benita had decades of public service behind her, and the campaign needed to put that in front of voters quickly.',
          'Her campaign site was on Squarespace, her Facebook Page was live, and her Instagram account existed but had no posts. The campaign had one manager, a short calendar and a small paid ad budget.',
        ],
      },
      {
        type: 'textBlock',
        heading: 'The Approach',
        paragraphs: [
          'I started with the site, because every post and ad would end up there. I audited all six pages, then wrote the exact title, description and heading changes for each one.',
          'Then I built a content calendar for Facebook and Instagram with two feed posts and a Story each day, tied to four phases: organic only, ballots are out, persuade, and get out the vote. Each slot had a status, so we could see what was ready and what was waiting on a photo, a fact check or a sign-off.',
          'Every quote and every claim went through approval before it was published. Anything that was not confirmed stayed out of public copy.',
        ],
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: 'One rule shaped the whole project.' },
          { tag: 'text', text: ' If it was not a published fact or an approved quote, it did not go on a graphic. That kept the work fast and safe to post.' },
        ],
      },
      {
        type: 'localVideo',
        heading: 'Reels from iPhone Footage',
        src: asset('benita-duran/reel-meet-benita.mp4'),
        poster: asset('benita-duran/reel-meet-benita-poster.jpg'),
        caption: 'Meet Benita. I cut the raw phone footage into a short vertical reel with captions, a name card and a paid-for line.',
      },
      {
        type: 'localVideo',
        src: asset('benita-duran/reel-wildfire.mp4'),
        poster: asset('benita-duran/reel-wildfire-poster.jpg'),
        caption: 'Wildfire safety, one of the campaign\'s main topics. Short topic labels appear on screen so the message lands with the sound off.',
      },
      {
        type: 'localVideo',
        src: asset('benita-duran/reel-work-with-everybody.mp4'),
        poster: asset('benita-duran/reel-work-with-everybody-poster.jpg'),
        caption: 'In her own words on working with everyone. I cut seven reels in this format, each with its own caption.',
      },
      {
        type: 'phoneShots',
        heading: 'Photo Ads',
        shots: [
          { src: asset('benita-duran/graphic-afford.jpg'), alt: 'Teal photo ad of Benita Duran with the headline "Families should be able to afford Boulder. Benita will fight for that."', label: 'Affordability' },
          { src: asset('benita-duran/graphic-budget.jpg'), alt: 'Teal photo ad of Benita Duran standing outdoors with the headline "Boulder needs a budget that works. Benita knows how to build one."', label: 'Budget' },
          { src: asset('benita-duran/graphic-ballot-is-here.jpg'), alt: 'Graphic reading "Your ballot is here. Vote for up to five," with a mock ballot with one filled-in bubble next to Benita Duran and her photo.', label: 'Ballot is here' },
        ],
      },
      {
        type: 'phoneShots',
        heading: 'Endorsement and Issue Posts',
        shots: [
          { src: asset('benita-duran/graphic-daily-camera.jpg'), alt: 'Navy post reading "The Daily Camera endorses Benita Duran" with a short quote from the editorial and a portrait of Benita.', label: 'Daily Camera' },
          { src: asset('benita-duran/graphic-cwa-7799.jpg'), alt: 'Cream post with a rainbow and Benita\'s portrait reading "CWA Local 7799 endorses Benita Duran."', label: 'CWA Local 7799' },
          { src: asset('benita-duran/graphic-creek-path.jpg'), alt: 'Navy quote graphic with Benita\'s photo and a line from her essay about the Boulder Creek Path: "Boulder deserves both, and it\'s time to get it done."', label: 'Creek Path' },
        ],
      },
      {
        type: 'textBlock',
        heading: 'Display Ads',
        paragraphs: [
          'I built five banner sets in six standard sizes each, from a 160 by 600 skyscraper to a 728 by 90 leaderboard. Each set has one clear message and one button, and every size carries the paid-for line.',
          'The messages were Meet Benita, two endorsement quotes, A Boulder where people can stay, and a $25 donation ask tied to the city\'s matching funds program. The overview below shows three of the five sets.',
        ],
      },
      {
        type: 'imageGrid',
        rows: [
          { cols: 1, images: [{ src: asset('benita-duran/banner-set.jpg'), alt: 'Three sets of purple and teal display banners for Benita Duran in several sizes, with messages about being a fifth-generation Coloradan, a Boulder where people can stay, and a $25 matching funds donation.' }] },
        ],
      },
      {
        type: 'textBlock',
        heading: 'Daily Camera Takeover',
        paragraphs: [
          'For October 18 I designed a set of five ad sizes for a Daily Camera homepage takeover, each with a 2x version. The message was a personal one, built around Benita\'s birthday and a simple ask for her vote.',
        ],
      },
      {
        type: 'imageGrid',
        rows: [
          { cols: 1, images: [{ src: asset('benita-duran/takeover-all-sizes.jpg'), alt: 'Five teal banner sizes reading "Vote Benita Duran. It\'s my birthday today! The greatest gift to me is your vote and your voice," with a Ballot number 5 badge and a portrait among sunflowers.' }] },
        ],
      },
      {
        type: 'statGrid',
        stats: [
          { number: '6', text: 'Pages on the Squarespace site that I audited, with nothing changed on the live site during the audit.' },
          { number: '21', text: 'Issues found: 6 critical, 7 high and 8 medium.' },
          { number: '0', text: 'Analytics, pixel or Search Console tags on the site before the audit.' },
        ],
      },
      {
        type: 'textBlock',
        heading: 'The Website and Endorsements Page',
        paragraphs: [
          'The audit found placeholder page titles, a homepage still promoting an event that had passed, missing headings and a newsletter form that was not saving signups. I wrote the fixes in a plain list, ordered by effort, for the campaign manager to approve.',
          'I also built the endorsements page as a custom code block on Squarespace, with quotes, endorsers and supporters laid out in a clean grid and a button for new supporters to add their name.',
        ],
      },
      {
        type: 'imageGrid',
        rows: [
          { cols: 1, images: [{ src: asset('benita-duran/endorsements-page.jpg'), alt: 'Top of the endorsements page: the heading "Endorsements and supporters," a note that Benita is endorsed by Open Boulder, and a quote card from Federico Pena.' }] },
        ],
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: 'Everything here is the campaign\'s own message.' },
          { tag: 'text', text: ' My job was to make it clear, consistent and easy to find, from the first search result to the last reminder to return a ballot.' },
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
        "Spirit Airlines built its brand on low fares, but after a failed JetBlue merger, bankruptcy headlines, and media-fueled fear around flight safety, trust took a nosedive (no pun intended). With routes slashed and ticket sales slipping, Spirit isn't just battling competitors. It's battling perception.",
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
          "My first impression: everyone loves to hate Spirit. The objective is clear: rebuild trust and reposition Spirit as the smartest way to fly on a budget.",
        ],
      },
      {
        type: 'imageGrid',
        rows: [{ cols: 1, images: [{ src: asset('spirit-airlines/challenge-overview.jpg'), alt: 'The Challenge overview', wide: true }] }],
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
          { number: '48%', text: 'fall into the lower third of monthly income. Calculated spenders, not broke, just budget-savvy.' },
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
            { src: asset('spirit-airlines/audience-insights.jpg'), alt: 'Audience insights' },
            { src: asset('spirit-airlines/audience-data.jpg'), alt: 'Audience data' },
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
          { text: 'It ends up costing the same as a regular airline. You get tricked by the low price, then pay for everything else.', note: "They feel misled, not by the price, but by the lack of transparency." },
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
          "Josh is part creative, part entrepreneur, and he's building his business one flight at a time. He books gigs across the country, travels light, and edits on the go. His schedule is flexible, but his income isn't always steady. That means every trip has to make sense, financially and logistically.",
          [{ tag: 'text', text: 'Josh has flown Spirit before. He knows what he\'s getting, but he still hesitates. Not because of the service, but because of the ' }, { tag: 'em', text: 'uncertainty' }, { tag: 'text', text: '. Is he going to get hit with surprise fees? Is the plane safe? Is it worth it?' }],
          [{ tag: 'text', text: "He doesn't need a drink cart or complimentary pretzels. He needs a brand that levels with him. Josh doesn't want upgrades. He wants " }, { tag: 'strong', text: 'clarity' }, { tag: 'text', text: ". And that's what builds trust." }],
        ],
      },
      {
        type: 'imageGrid',
        rows: [{
          cols: 2,
          images: [
            { src: asset('spirit-airlines/persona-research.jpg'), alt: 'Persona research' },
            { src: asset('spirit-airlines/persona-insights.jpg'), alt: 'Persona insights' },
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
          { tag: 'strong', text: "That's a $75 soda." }, { tag: 'text', text: " Spirit didn't charge you less because they cut corners. They charged you less because they didn't assume you needed everything, and even if you did, this flight is still cheaper." },
        ],
      },
      {
        type: 'textBlock',
        heading: 'The Work',
        paragraphs: [
          [
            { tag: 'text', text: 'Not free snacks. Not fake luxury. We\'re selling ' }, { tag: 'strong', text: 'clarity' },
            { tag: 'text', text: '. Control. And choice. Spirit isn\'t the airline you settle for; it\'s the airline you ' },
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
              { src: asset('spirit-airlines/campaign-work-1.jpg'), alt: 'Campaign work 1' },
              { src: asset('spirit-airlines/campaign-work-2.jpg'), alt: 'Campaign work 2' },
              { src: asset('spirit-airlines/campaign-work-3.jpg'), alt: 'Campaign work 3' },
              { src: asset('spirit-airlines/campaign-work-4.jpg'), alt: 'Campaign work 4' },
            ],
          },
          {
            cols: 1,
            images: [{ src: asset('spirit-airlines/campaign-final-spread.jpg'), alt: 'Campaign final spread', wide: true }],
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
        "During a two-month internship with Rise Comedy, Denver's home for standup, improv, and sketch comedy, I helped bring video to a social feed that had, until then, been graphics-only.",
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
          { number: '4.8K', text: 'Followers on Rise Comedy’s Instagram: one feed covering the comedy club, its class program, and its annual festival.' },
          { number: '71.5K', text: 'Views in a recent 30-day stretch, per the account’s own analytics dashboard.' },
          { number: '2,357', text: 'Posts in the account’s history: the archive I was adding video content into.' },
        ],
      },
      {
        type: 'phoneShots',
        heading: 'The Account',
        shots: [
          { src: asset('rise-comedy/account-screenshot.jpg'), alt: 'Rise Comedy Instagram profile, a Denver comedy club with 4,798 followers', caption: 'Rise Comedy’s Instagram: shows, classes, and festival programming in one feed.' },
        ],
      },
      {
        type: 'textBlock',
        heading: 'Adding Video to a Graphics-Only Feed',
        paragraphs: [
          "Rise Comedy's feed leaned entirely on static graphics, flyers for shows, class promos, festival announcements. My focus was introducing short-form video alongside that existing style, giving the feed some actual motion and personality without abandoning the graphic-heavy look their audience already knew.",
          "I also kept the graphics pipeline going, built the posting calendar so content went out consistently, and tracked engagement each week to see which formats, video or graphic, were actually resonating.",
        ],
      },
      {
        type: 'localVideo',
        wide: true,
        heading: 'Video Content',
        src: asset('rise-comedy/social-video-1.mp4'),
        poster: asset('rise-comedy/social-video-1-poster.jpg'),
        caption: 'A captioned, on-camera interview clip shot in front of Rise Comedy’s step-and-repeat, one of the first video formats added to the feed.',
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
          { src: asset('rise-comedy/open-mic-graphic.jpg'), alt: 'Rise & Shine graphic promoting Rise Comedy’s weekly open mic night', caption: 'Weekly open mic promo: sign-up and show times front and center.' },
        ],
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: 'Two months, one feed, two content styles working together.' },
          { tag: 'text', text: ' Video gave the account new energy; the graphics, and a real posting rhythm behind both, kept it consistent.' },
        ],
      },
    ],
  },

  {
      slug: 'talk-to-the-camera',
      galaxy: 'ads',
      title: 'Talk to the Camera',
      tags: ['Email Marketing', 'Social Media'],
      accent: '#ff9ecb',
      planet: { radius: 2.2, ring: false, moon: true },
      thumb: asset('talk-to-the-camera/cover.jpg'),
      hero: asset('talk-to-the-camera/cover.jpg'),
      intro: {
        paragraphs: [
          'Talk to the Camera is a Colorado video and filmmaking education company. It runs after-school classes and school-break camps for kids across the Denver metro area. I started there as a Video Production Instructor, teaching students video production, editing, and writing.',
          'In July 2026 I moved into a Marketing Specialist role. I manage the social media content, design the branded graphics, and build and send the weekly company newsletter in Mailchimp. This page shows the email system I built for that newsletter and one of the Instagram posts that goes with it.',
        ],
        details: [
          { label: 'Client', value: 'Talk to the Camera' },
          { label: 'Role', value: 'Video Production Instructor, then Marketing Specialist' },
          { label: 'Duration', value: 'Instructor since June 2023, marketing since July 2026' },
        ],
      },
      sections: [
        {
          type: 'textBlock',
          heading: 'The Situation',
          paragraphs: [
            'Talk to the Camera runs camps and classes at many locations on many dates. The weekly newsletter has to say what is open right now, in a way a parent can scan on a phone in a few seconds.',
            'I also teach for the company, so I know the programs I am writing about.',
          ],
        },
        {
          type: 'statGrid',
          stats: [
            { number: '10', text: 'Email templates built for camp and class campaigns.' },
            { number: '20+', text: 'Denver-metro schools listed for after-school classes in the fall campaign.' },
            { number: 'Weekly', text: 'Newsletter I design and send in Mailchimp.' },
          ],
        },
        {
          type: 'textBlock',
          heading: 'The System',
          paragraphs: [
            'I built the newsletter as a set of responsive HTML templates that work in Mailchimp and in common email clients. Every email shares the same pieces: the logo at the top, a bold hero band with one clear headline and one button, then simple cards for each location, with the dates, ages, and a registration link.',
            'Because the pieces repeat, every email looks like it comes from the same company, and parents can learn where to look for what they need.',
          ],
        },
        {
          type: 'callout',
          content: [
            { tag: 'strong', text: 'One structure, many campaigns.' },
            { tag: 'text', text: ' The header, hero, and card layout stay the same. The message, the urgency, and the color of the hero change with the moment.' },
          ],
        },
        {
          type: 'textBlock',
          heading: 'Urgency Campaigns',
          paragraphs: [
            'As summer camps neared their end, I wrote a short series of reminder emails. Each one has a clear deadline in the first lines: camp starts tomorrow, one last week, or the final camp week at a location.',
            'The red and orange top bars, the highlighted discount note, and a single bright button keep the focus on one action: register before the session closes.',
          ],
        },
        {
          type: 'phoneShots',
          heading: 'Last call and last week emails',
          shots: [
            {
              src: asset('talk-to-the-camera/email-last-call.jpg'),
              alt: 'Top of a Talk to the Camera email with a red banner, the logo, the headline Last Call, Parents, a yellow discount note, a coral Register button, and the first camp location cards.',
              label: 'Last call',
              caption: 'Camp starts tomorrow, with the closing time for the next session.',
            },
            {
              src: asset('talk-to-the-camera/email-last-week.jpg'),
              alt: 'Top of a Talk to the Camera email with the logo, the headline One Last Week of Camp Magic, a yellow discount note, a Register Today button, and a list of camps for the week of July 27 to 31.',
              label: 'Last week',
              caption: 'A calm reminder for the final week of summer camps.',
            },
            {
              src: asset('talk-to-the-camera/email-hyland-hills-last-week.jpg'),
              alt: 'Top of a Talk to the Camera email with an orange banner reading Final Camp Week at Hyland Hills, the headline Last Chance, One Week Left, an orange button, and a card for the last session.',
              label: 'Final week at one location',
              caption: 'A location-specific email for the last camp week at Hyland Hills.',
            },
          ],
        },
        {
          type: 'textBlock',
          heading: 'Program Guides',
          paragraphs: [
            'In the fall the job changed. Instead of pushing one deadline, the emails had to help parents choose. I made a camps email for school breaks, a class guide that explains each program, and a combined email for classes and camps.',
            'The hero band goes pink, dark, or bright depending on the campaign, but the logo, the stripe, and the card layout stay the same. Schools are listed alphabetically so parents can find theirs quickly.',
          ],
        },
        {
          type: 'phoneShots',
          heading: 'Camp and class emails',
          shots: [
            {
              src: asset('talk-to-the-camera/email-break-camps.jpg'),
              alt: 'Top of a Talk to the Camera email with a rainbow stripe, the logo, a pink hero reading No School, No Problem, a yellow See All Camps button, and a Fall Break Camp card dated October 12 to 16, 2026.',
              label: 'Break camps',
              caption: 'Fall break camps for days when school is out.',
            },
            {
              src: asset('talk-to-the-camera/email-classes-by-program.jpg'),
              alt: 'Top of a Talk to the Camera email with the logo, a dark hero asking Which Class Fits Your Kid\'s Creative Spark, a Find Your School button, and the first program card for Movie Magic with school listings.',
              label: 'Classes by program',
              caption: 'A guide that explains each program, then lists schools.',
            },
            {
              src: asset('talk-to-the-camera/email-all-classes-camps.jpg'),
              alt: 'Top of a Talk to the Camera email with a rainbow stripe, the logo, a pink hero reading Classes AND Camps, We\'ve Got Both, two buttons, and a purple Weekly After-School Classes band.',
              label: 'Classes and camps',
              caption: 'One email that points to both after-school classes and camps.',
            },
          ],
        },
        {
          type: 'textBlock',
          heading: 'Social Media',
          paragraphs: [
            'The same system carries over to Instagram. For the fall launch I designed a post that matches the combined email: the same cream background, color stripe, logo, and two dashed cards, one for after-school classes and one for break camps. It ends with a short line sending people to the link in the bio to register.',
          ],
        },
        {
          type: 'phoneShots',
          shots: [
            {
              src: asset('talk-to-the-camera/instagram-post.jpg'),
              alt: 'Instagram post with a color stripe across the top, the Talk to the Camera logo, a Fall 2026 label, the headline Classes AND Camps, We\'ve Got Both, two cards for After-School Classes and Break Camps, and a dark footer saying Link in bio to register.',
              label: 'Instagram post',
              caption: 'Fall 2026 announcement for classes and camps.',
            },
          ],
        },
        {
          type: 'callout',
          content: [
            { tag: 'strong', text: 'A system, not one-off emails.' },
            { tag: 'text', text: ' Ten templates share one header, one hero band, and one card layout, so every campaign still looks like Talk to the Camera.' },
          ],
        },
      ],
    },

  {
    slug: 'bar38',
    galaxy: 'ads',
    title: 'Bar38',
    tags: ['Social Media', 'Hospitality'],
    accent: '#e0b46c',
    planet: { radius: 2.5, ring: false, moon: false },
    thumb: asset('bar38/cover.jpg'),
    hero: asset('bar38/cover.jpg'),
    intro: {
      paragraphs: [
        'Bar38, also known as Plaza 38 Grill, is a bar and restaurant at 3550 W 38th Ave in Denver. Through We Live It Media, I worked on its social content: event posts, brunch and food features, and short reels.',
        'The goal was simple. Give people a clear reason to come in, with a steady feed that shows what is happening at the venue each week.',
      ],
      details: [
        { label: 'Client', value: 'Bar38 / Plaza 38 (via We Live It Media)' },
        { label: 'Role', value: 'Working with We Live It Media on Bar38’s social content' },
        { label: 'Duration', value: 'Summer 2026' },
      ],
    },
    sections: [
      {
        type: 'textBlock',
        heading: 'What the Work Was',
        paragraphs: [
          'We Live It Media supports Bar38 with social media management, content strategy, event promotion, marketing campaigns, and community and apartment outreach. My part was the social content that sits inside that work.',
          'Each post has one job: tell people what is on, when it is, and that parking is free. The details are always easy to find, so a quick scroll is enough to plan a night out.',
        ],
      },
      {
        type: 'phoneShots',
        heading: 'The Venue',
        shots: [
          {
            src: asset('bar38/venue.jpg'),
            alt: 'Inside Bar38 on a busy day. Guests sit at a long stone bar and wooden tables under a lit ceiling fixture, with big windows on the left, brick columns, and hanging plants.',
            label: 'Inside Bar38',
            caption: 'Open brick, concrete, and a long bar with plenty of screens.',
          },
        ],
      },
      {
        type: 'textBlock',
        heading: 'The Content Mix',
        paragraphs: [
          'The feed mixes a few kinds of posts so it never reads like one long ad.',
          [
            { tag: 'strong', text: 'Events and nights: ' },
            { tag: 'text', text: 'trivia, karaoke, live jazz, and a soul brunch with a featured artist.' },
          ],
          [
            { tag: 'strong', text: 'Game days and specials: ' },
            { tag: 'text', text: 'a Broncos happy hour with a pregame start time and a price list.' },
          ],
          [
            { tag: 'strong', text: 'Food and brunch: ' },
            { tag: 'text', text: 'a weekend menudo feature and a brunch for neighbors of the apartment building next door.' },
          ],
          [
            { tag: 'strong', text: 'Short video: ' },
            { tag: 'text', text: 'a quick reel built around a plate of pancakes.' },
          ],
        ],
      },
      {
        type: 'phoneShots',
        heading: 'Events and Game Days',
        shots: [
          {
            src: asset('bar38/broncos-happy-hour.jpg'),
            alt: 'Black Bar38 poster for a Broncos happy hour on Friday 8/14, with blue and orange type, three football players in orange jerseys, and a checklist of happy hour prices.',
            label: 'Broncos happy hour',
            caption: 'Pregame start time, happy hour prices, and free parking.',
          },
          {
            src: asset('bar38/trivia-night.jpg'),
            alt: 'Black Bar38 poster for trivia night with Mile High Music Patrol, in yellow and cream type, with the time and address at the bottom.',
            label: 'Trivia night',
            caption: 'Trivia night with a local music trivia host.',
          },
          {
            src: asset('bar38/karaoke-night.jpg'),
            alt: 'Bar38 karaoke night poster with a close photo of the host in a camouflage cap, sunglasses, and a purple jacket, over a dark background with soft lights.',
            label: 'Karaoke night',
            caption: 'Date, time, and the host up front.',
          },
          {
            src: asset('bar38/flatout-jazz.jpg'),
            alt: 'Black Bar38 poster for Flatout Jazz showing two musicians, one holding a guitar and one holding a saxophone, with the date and time in orange circles.',
            label: 'Live jazz',
            caption: 'A Saturday night with a two piece jazz act.',
          },
        ],
      },
      {
        type: 'phoneShots',
        heading: 'Brunch and Food',
        shots: [
          {
            src: asset('bar38/soul-sunday-brunch.jpg'),
            alt: 'Square Bar38 poster for Soul Sunday Brunch, with repeating bold text, a seated performer in a wide brim hat, and stacked pancakes, French toast, and waffles with strawberry sauce.',
            label: 'Soul Sunday brunch',
            caption: 'A Sunday brunch with a featured artist.',
          },
          {
            src: asset('bar38/brunch-alexan-tenants.jpg'),
            alt: 'Plaza 38 Grill poster inviting building tenants to a brunch with bottomless mimosas, showing two mimosa glasses and a stack of pancakes on a dark and cream background.',
            label: 'Neighbor brunch',
            caption: 'An invite to residents of the nearby apartments, tied to the opening.',
          },
          {
            src: asset('bar38/menudo-weekends.jpg'),
            alt: 'Gold Plaza 38 Grill poster that reads Menudo, with a bowl of menudo topped with radish and onion next to a plate of folded tortillas and lime.',
            label: 'Weekend menudo',
            caption: 'A weekend only dish, shown with a real photo of the food.',
          },
        ],
      },
      {
        type: 'localVideo',
        heading: 'A Quick Reel',
        src: asset('bar38/pancakes-reel.mp4'),
        poster: asset('bar38/pancakes-reel-poster.jpg'),
        caption: 'A short vertical reel for Plaza 38. It starts with an eye test question over a plate of red pancakes topped with berries and cream.',
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: 'The takeaway.' },
          { tag: 'text', text: ' A venue feed works best when every post is clear and useful: what it is, when it is, where to go, and why it is worth the trip.' },
        ],
      },
    ],
  },

  {
    slug: 'star-junction-healing-arts',
    galaxy: 'ads',
    title: 'Star Junction Healing Arts',
    tags: ['Local SEO', 'Content'],
    accent: '#b794f6',
    planet: { radius: 2.1, ring: true, moon: false },
    thumb: asset('star-junction-healing-arts/cover.jpg'),
    hero: asset('star-junction-healing-arts/cover.jpg'),
    intro: {
      paragraphs: [
        'Star Junction Healing Arts is a psychic medium and energy healing practice run by Jane S. Marino in Lakewood, Colorado. Jane offers readings, Reiki, and Reconnective Healing. She had a real studio and a real client base, but her Google listing and website were not doing much to bring new people in.',
        'I audited her local search presence, found out what people really type when they look for these services, rewrote her pages around those words, and built a plan to fix the biggest problem: almost no Google reviews. The work is a mix of research, strategy, and writing.',
      ],
      details: [
        { label: 'Client', value: 'Star Junction Healing Arts (Jane S. Marino), Lakewood, CO' },
        { label: 'Role', value: 'Local SEO strategy, site fixes, content writing' },
        { label: 'Duration', value: 'September to October 2026' },
      ],
    },
    sections: [
      {
        type: 'textBlock',
        heading: 'The Situation',
        paragraphs: [
          'Jane works from a studio in the 40 West Arts District in Lakewood, and also offers sessions by Zoom. Her Google listing was claimed and active, and her blog had steady posts. But when someone searched for a psychic medium or Reiki near her, the business was easy to skip.',
          'The goal was simple: get found by people in the Denver area who are already looking for these services, and give them a reason to book once they land on her listing or site.',
        ],
      },
      {
        type: 'statGrid',
        stats: [
          { number: '32/100', text: 'My local SEO audit score for the website and listing before any changes.' },
          { number: '3.0', text: 'Star rating on the listing I audited, from only 2 Google reviews.' },
          { number: '0', text: 'Google autocomplete suggestions for "psychic medium lakewood". Denver searches returned real suggestions for every service.' },
        ],
      },
      {
        type: 'imageGrid',
        heading: 'Step 1: The audit',
        rows: [
          { cols: 1, images: [ { src: asset('star-junction-healing-arts/score-breakdown.jpg'), alt: 'Dark purple chart titled Score breakdown showing a local SEO score of 32 out of 100, with bars for six areas: Google Business Profile 13 of 25, reviews 3 of 20, local on-page SEO 6 of 20, name address phone and citations 7 of 15, local schema 1 of 10, local links 2 of 10.' } ] },
        ],
      },
      {
        type: 'textBlock',
        heading: 'What the Audit Found',
        paragraphs: [
          'The address and phone number were correct everywhere, which is a good base. After that, the gaps were clear. The reviews were thin and had no replies. The site pages had weak titles and descriptions. The hidden business data that Google reads (called schema) was an empty shell. The Google listing said "Jane S. Marino" while the website, Yelp, and Facebook said "Star Junction Healing Arts".',
          'There were also five leftover template pages from the website theme, still live and listed in the sitemap. And the booking tool was installed but not connected to Google, so someone could not book straight from the map listing.',
          'One more note that shaped the whole project: Jane is not a licensed healthcare provider. The old services page used language about illness and the body that could read like treatment claims. I kept all new copy to what the services are: readings, Reiki, and Reconnective Healing as experiences of rest, clarity, and emotional support. No medical schema, no medical promises.',
        ],
      },
      {
        type: 'textBlock',
        heading: 'Step 2: Find the Real Search Words',
        paragraphs: [
          'The obvious plan was to target "Lakewood", since that is where her studio is. I did not have a paid keyword tool, so I checked Google autocomplete for about 40 search phrases. Autocomplete shows what people really type. It does not give monthly volume, so I treated it as direction, not exact numbers.',
          'The result changed the plan. "Lakewood" is shared with Ohio, New Jersey, Washington, California, and Florida, so searches with it are thin and confusing. Denver is the word people actually type.',
        ],
      },
      {
        type: 'imageGrid',
        rows: [
          { cols: 1, images: [ { src: asset('star-junction-healing-arts/denver-vs-lakewood.jpg'), alt: 'Dark purple comparison graphic titled Denver, not Lakewood. The Lakewood column shows searches like psychic medium lakewood returning zero suggestions and reiki lakewood returning Ohio. The Denver column shows searches like psychic near me returning psychic denver first, and energy healing denver returning energy healer denver.' } ] },
        ],
      },
      {
        type: 'quotes',
        quotes: [
          { text: 'psychic medium lakewood', note: 'Zero suggestions from Google. Strong sign that almost nobody searches this.' },
          { text: 'psychic near me  →  psychic denver', note: 'Denver is the number one suggestion. The map listing stays in Lakewood for "near me" searches, while titles and content lead with Denver.' },
          { text: 'reconnective healing vs reiki', note: 'A real search with a small field of competitors. Jane is both a Reiki Master and a certified Reconnective Healing Foundational Practitioner, so this became the best opportunity.' },
        ],
      },
      {
        type: 'textBlock',
        heading: 'Keyword Research by Tier',
        paragraphs: [
          [
            { tag: 'strong', text: 'Tier A, target these: ' },
            { tag: 'text', text: 'psychic, psychic medium, mediumship, Reiki, Reiki master, energy healing, and Reconnective Healing. Each one had real autocomplete suggestions tied to Denver or "near me".' },
          ],
          [
            { tag: 'strong', text: 'Tier B, use as modifiers: ' },
            { tag: 'text', text: 'intuitive, life coaching, angels, and similar words. They did not stand up alone, so they go in body copy and not in titles.' },
          ],
          [
            { tag: 'strong', text: 'Tier C, keep as brand voice: ' },
            { tag: 'text', text: 'words like lightworker, high vibration, and spirit guides. They are good words for people who already found Jane, but searches for them lead to games, movies, and definitions.' },
          ],
          'I also caught three traps. "Medium" alone brings up Denver steak and mattresses, so it always appears as "psychic medium". "Grief support" brings people looking for counseling, which is the wrong intent for a medium, so grief content targets "signs from departed loved ones" instead. And tarot and aura readings showed real demand, but I left them out until Jane confirms she offers them.',
        ],
      },
      {
        type: 'textBlock',
        heading: 'Step 3: Rewrite the Pages',
        paragraphs: [
          'Jane had one combined services page. Dedicated pages for each service are one of the strongest local ranking factors, so I split it into three drafts using her own words and her own explanations: Psychic Mediumship Readings, Reiki Healing, and Reconnective Healing. Each leads with Denver and names "Lakewood, CO" in full.',
          'The Reiki page says plainly that Reiki is not a medical treatment and not a substitute for medical care. The Reconnective Healing page explains how it differs from Reiki, since that is the question Jane gets most.',
          'On the site itself, I rewrote the page titles and descriptions, filled in the business details so the schema is no longer empty, added her address and a tap-to-call number to the footer, deleted the five template pages, and linked the three new pages from the services page. On Google, I added categories, a business description, a service list, corrected hours, and the online booking link.',
        ],
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: 'No medical claims, on purpose.' },
          { tag: 'text', text: ' Reiki and Reconnective Healing are described as experiences, and readings as readings. The pages never imply that a session treats an illness.' },
        ],
      },
      {
        type: 'textBlock',
        heading: 'Step 4: Fix the Review Problem',
        paragraphs: [
          'Reviews were the biggest gap. A nearby practitioner showed 75 reviews next to Jane\'s handful, and people choose the one with more. I also noticed that many of her clients are private about seeing a medium, especially people who are grieving, so asking cold by email would not work.',
          'The plan: ask in person at the end of a good session, hand over a phone, and make it one scan. I made a QR code that opens her Google review page, and I gave Jane a short line to say: a first name and last initial is fine. Everyone gets the same link. No gating, no incentives, no bought reviews. I set a target of 10 reviews in about 90 days, so the expectation was realistic from the start.',
        ],
      },
      {
        type: 'phoneShots',
        heading: 'The review request QR code',
        shots: [
          { src: asset('star-junction-healing-arts/review-qr.jpg'), alt: 'Black and white QR code that opens the Google review page for Star Junction Healing Arts.', label: 'Review card QR code', caption: 'Scans straight to the Google review form for the business listing.' },
        ],
      },
      {
        type: 'textBlock',
        heading: 'A Surprise: The Duplicate Listing',
        paragraphs: [
          'While working in Google Business Profile, I found two listings for the same studio. One was called "Jane S. Marino" and the other "Star Junction Healing Arts", which is the main listing. Two listings were splitting her reviews and her search signals.',
          'We reported the duplicate. By October 12, searching her business name and address showed only the main listing, with the online booking button working. I held off on merging the two until it can be done without hurting her rating.',
        ],
      },
      {
        type: 'textBlock',
        heading: 'Step 5: Publish Content',
        paragraphs: [
          'Jane had seven blog posts, all reflective writing, with none mentioning her services, Lakewood, or Denver. That meant there was no overlap and a lot of open search space. The pitch to her was: keep your voice, add a doorway.',
          [
            { tag: 'strong', text: 'Post 1: ' },
            { tag: 'em', text: 'What to Expect at a Psychic Medium Reading or Energy Healing Session. ' },
            { tag: 'text', text: 'About 900 words, built from the preparation advice Jane already had on her services page. People search this right before booking.' },
          ],
          [
            { tag: 'strong', text: 'Post 2: ' },
            { tag: 'em', text: 'Signs You May Be Experiencing a Spiritual Awakening. ' },
            { tag: 'text', text: 'Built from Jane\'s own short post. I kept every list and sentence of hers and added context around them, taking it from 383 words to about 800.' },
          ],
          'Both posts end with a link to her online booking page, and both are live on her site. I also lined up three more topics for later: Reiki vs. Reconnective Healing, energy healing in Denver, and signs from departed loved ones.',
        ],
      },
      {
        type: 'textBlock',
        heading: 'Where It Stands',
        paragraphs: [
          'Live on the site and listing: new page titles and descriptions, business details in the schema, footer address and tap-to-call, template pages removed, three service pages linked from the services page, two blog posts, extra Google categories, a service list, corrected hours, a working booking link, and a duplicate listing that no longer shows up in search for her business name.',
          'The main listing now shows 5.0 stars with 4 reviews. That is the number to watch, and it is the one thing I cannot fix for her. Getting from 4 to 10 and beyond depends on Jane asking clients in person, which is why the QR code and the "first name and last initial" line matter so much.',
          'I want to be clear about what I am not claiming. I do not have search ranking data yet, because Google Search Console is not connected. Jane\'s Google profile interactions peaked in September, at roughly 50 by my read of the chart, but that is one month and could be seasonal, so I do not credit it to the work.',
        ],
      },
      {
        type: 'callout',
        content: [
          { tag: 'strong', text: 'The first weeks were repairs. The rest compounds.' },
          { tag: 'text', text: ' The fixes stay fixed. Each new blog post, review, and directory listing adds to them, so the next step is steady posting, steady asking for reviews, and tracking real numbers in Search Console.' },
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
    thumb: asset('unique-communications-ireland/thumb.jpg'),
    hero: asset('unique-communications-ireland/hero.jpg'),
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
              { src: asset('unique-communications-ireland/harte-peat-1.jpg'), alt: 'Harte Peat 1' },
              { src: asset('unique-communications-ireland/harte-peat-2.jpg'), alt: 'Harte Peat 2' },
              { src: asset('unique-communications-ireland/harte-peat-3.jpg'), alt: 'Harte Peat 3' },
              { src: asset('unique-communications-ireland/harte-peat-4.jpg'), alt: 'Harte Peat 4' },
            ],
          },
          {
            cols: 1,
            images: [
              { src: asset('unique-communications-ireland/harte-peat-5.jpg'), alt: 'Harte Peat 5', wide: true },
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
              { src: asset('unique-communications-ireland/social-ad-1.jpg'), alt: 'Social Ad 1' },
              { src: asset('unique-communications-ireland/social-ad-2.jpg'), alt: 'Social Ad 2' },
              { src: asset('unique-communications-ireland/social-ad-3.jpg'), alt: 'Social Ad 3' },
              { src: asset('unique-communications-ireland/social-ad-4.jpg'), alt: 'Social Ad 4' },
            ],
          },
          {
            cols: 1,
            images: [
              { src: asset('unique-communications-ireland/social-ad-5.jpg'), alt: 'Social Ad 5', wide: true },
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
        "The episode follows three students through the actual design process (research, iteration, presentation) while carrying the emotional weight of the subject the whole way through. It's less about the finished memorials than about what it takes, personally, to sit with grief long enough to design something honest about it.",
      ],
      details: [
        { label: 'Series', value: 'Architectonics: Suicide Memorials' },
        { label: 'Episode', value: '1 of 3: "Built From Grief"' },
        { label: 'Subject', value: 'A CU Boulder class designing memorials for suicide loss' },
      ],
    },
    sections: [
      { type: 'vimeo', heading: 'Watch the Film', videoId: '1198130458', hash: '75b4c566fd' },
    ],
  },

  {
      slug: 'peaked-in-college',
      galaxy: 'film',
      title: 'The Peaked in College Show',
      tags: ['Sports Show', 'Video Production'],
      accent: '#f2c94c',
      planet: { radius: 2.7, ring: true, moon: false },
      thumb: asset('peaked-in-college/title-card.jpg'),
      hero: asset('peaked-in-college/title-card.jpg'),
      intro: {
        paragraphs: [
          'The Peaked in College Show is a weekly college football and betting segment inside the Denver Sports Betting Show, which streams on Fox31/KDVR. I co-host it with Elijah Adamson, and I also produce it, edit it, and build the graphics.',
          'Every week we recap the games, argue about who blew it, make our picks, and cut the whole thing into a YouTube version, a Fox version, and a pile of short clips for social.',
        ],
        details: [
          { label: 'Show', value: 'The Peaked in College Show' },
          { label: 'Role', value: 'Co-Host, Producer, Editor, Motion Graphics' },
          { label: 'Duration', value: 'Weekly, from September 2026' },
        ],
      },
      sections: [
        {
          type: 'textBlock',
          heading: 'The Show',
          paragraphs: [
            'The idea is simple: two hosts talking college football and betting the way fans talk at a bar. Elijah and I run through the week, apologize for our worst takes, and put our own bets on the line.',
            'The show sits inside the Denver Sports Betting Show, so it has to work for two audiences: people watching the Fox broadcast and people finding clips on their phones.',
          ],
        },
        {
          type: 'statGrid',
          stats: [
            { number: '7', text: 'Episodes edited so far, from Episode 1 through Episode 7.' },
            { number: '3', text: 'Cuts of each recent episode: a YouTube edit, a Fox edit, and a clips edit.' },
            { number: '15', text: 'Vertical reels cut from just Episodes 6 and 7, six from one and nine from the other.' },
          ],
        },
        {
          type: 'textBlock',
          heading: 'The Weekly Format',
          paragraphs: [
            'Each episode follows the same run of segments, so the audience always knows where they are. We open, take the sponsor read, do the Apology Tour, recap Colorado and look ahead to the next game, then play Who Blew It, where each of us brings a pick and we argue it on air.',
            'After that come the games of the last week, a look ahead at the next slate, and the Sub Sandwich of the Week, where we each pick the most embarrassing interception. Every segment ends with a line that leads into the next one.',
          ],
        },
        {
          type: 'callout',
          content: [
            { tag: 'strong', text: '3 STRYKs, You\'re Out.' },
            { tag: 'text', text: ' Each of us picks one bet a week. A loss is a strike, and three strikes means a punishment. It gives the show a running storyline that people can follow from week to week.' },
          ],
        },
        {
          type: 'textBlock',
          heading: 'My Workflow',
          paragraphs: [
            'Before we record, I build a cheat sheet for the episode: the last week of scores, the odds for the next slate, the picks to argue about, and the line that leads into each segment. It all fits on one screen, so I can read it without scrolling while we are on camera.',
            'After we record, I edit in DaVinci Resolve. I cut three versions of every episode: a YouTube edit, a Fox edit, and a clips edit that I use to pull the short reels.',
          ],
        },
        {
          type: 'imageGrid',
          heading: 'The Cheat Sheet',
          rows: [
            { cols: 1, images: [ { src: asset('peaked-in-college/episode-7-cheat-sheet.jpg'), alt: 'Episode 7 cheat sheet, a single navy and gold screen split into twelve panels covering the intro, apology tour, Colorado recap, picks, games of the week and wrap' } ] },
          ],
        },
        {
          type: 'textBlock',
          heading: 'The Work',
          paragraphs: [
            'The reels are where the show reaches new people. For each episode I find the moments worth keeping, add captions, and reframe the footage for vertical. The title of each reel is the topic of the clip.',
          ],
        },
        {
          type: 'localVideo',
          heading: 'Episode 6 Reels',
          src: asset('peaked-in-college/reel-buffs-undefeated.mp4'),
          poster: asset('peaked-in-college/reel-buffs-undefeated-poster.jpg'),
          caption: 'Ep 6 Reel 2: Buffs Went Undefeated.',
        },
        {
          type: 'localVideo',
          src: asset('peaked-in-college/reel-playbook-at-the-bar.mp4'),
          poster: asset('peaked-in-college/reel-playbook-at-the-bar-poster.jpg'),
          caption: 'Ep 6 Reel 3: Playbook at the Bar.',
        },
        {
          type: 'localVideo',
          src: asset('peaked-in-college/reel-dad-vs-mike-tyson.mp4'),
          poster: asset('peaked-in-college/reel-dad-vs-mike-tyson-poster.jpg'),
          caption: 'Ep 6 Reel 5: Dad vs Mike Tyson.',
        },
        {
          type: 'localVideo',
          src: asset('peaked-in-college/reel-arch-manning-bust.mp4'),
          poster: asset('peaked-in-college/reel-arch-manning-bust-poster.jpg'),
          caption: 'Ep 6 Reel 6: Arch Manning Bust.',
        },
        {
          type: 'localVideo',
          heading: 'Episode 7 Reels',
          src: asset('peaked-in-college/reel-pick-heard-round-boulder.mp4'),
          poster: asset('peaked-in-college/reel-pick-heard-round-boulder-poster.jpg'),
          caption: 'Ep 7 Reel 2: Pick Heard Round Boulder.',
        },
        {
          type: 'localVideo',
          src: asset('peaked-in-college/reel-notre-dame-is-a-fraud.mp4'),
          poster: asset('peaked-in-college/reel-notre-dame-is-a-fraud-poster.jpg'),
          caption: 'Ep 7 Reel 4: Notre Dame Is a Fraud.',
        },
        {
          type: 'localVideo',
          heading: 'Motion Graphics',
          src: asset('peaked-in-college/three-stryks-motion.mp4'),
          poster: asset('peaked-in-college/three-stryks-motion-poster.jpg'),
          caption: 'A 3 STRYKs, You\'re Out segment from Episode 5, with motion graphics I built for the picks.',
        },
        {
          type: 'phoneShots',
          heading: 'Thumbnails',
          shots: [
            { src: asset('peaked-in-college/episode-6-thumbnail.jpg'), alt: 'Episode 6 thumbnail showing both hosts in headphones with a Georgia logo marked Cashed, the text First Win Ever, and a badge reading Stryks Tied 1-1', label: 'Episode 6', caption: 'The Episode 6 thumbnail.' },
          ],
        },
        {
          type: 'callout',
          content: [
            { tag: 'strong', text: 'One weekly show, three edits, a stack of clips.' },
            { tag: 'text', text: ' I co-host it, prep it, cut it, and design the graphics, so each episode goes from cheat sheet to Fox broadcast to phone screens.' },
          ],
        },
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
        'THE SPEEKS is a short documentary following the band of the same name, a group of Boulder, Colorado college students turning late-night practices into a debut EP and a growing local following.',
        'Built around interviews with band members Micah and Cooper, the film follows what it actually takes to be a student and a band at the same time: the writing, the rehearsals, and the shows that make it real.',
      ],
      details: [
        { label: 'Type', value: 'Short Documentary' },
        { label: 'Subject', value: 'The Speeks, a student band in Boulder, CO' },
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
    thumb: asset('success/cover.jpg'),
    hero: asset('success/cover.jpg'),
    intro: {
      paragraphs: [
        'As I started thinking seriously about my future, one question kept coming up: What does it actually mean to be successful?',
        'Success is a personal documentary that explores this question through intimate interviews with friends and family, each with their own definitions, doubts, and dreams. I layered those conversations with my own voiceover, reflecting on the pressure to "make it," and whether success is something we define for ourselves, or something the world defines for us.',
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
    thumb: asset('how-she-hurt-me/cover.jpg'),
    hero: asset('how-she-hurt-me/cover.jpg'),
    intro: {
      paragraphs: [
        "Created during my time in the Boulder Technical Education Center's video production program, How She Hurt Me is a deeply personal short documentary about teen addiction, told through the metaphor of a toxic relationship.",
        'The film explores the emotional grip of substance abuse by personifying addiction as a romantic partner: alluring, destructive, and impossible to fully forget. It was inspired by real losses: friends and peers I grew up with who died from overdoses.',
        "This project was my way of making sense of it all, and more importantly, to start conversations about what so many teens go through in silence. It's a tribute, a warning, and a call for awareness.",
      ],
      details: [
        { label: 'Type', value: 'Short Documentary' },
        { label: 'Program', value: 'Boulder Technical Education Center, Video Production' },
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
    thumb: asset('advice-from-strangers/cover.jpg'),
    hero: asset('advice-from-strangers/cover.jpg'),
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
    thumb: asset('betting-the-future/cover.jpg'),
    hero: asset('betting-the-future/cover.jpg'),
    intro: {
      paragraphs: [
        "This isn't a moral panic piece. It's an unfiltered look at how easy, addictive, and omnipresent sports betting has become, especially for a generation raised on apps, odds, and influencer endorsements.",
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
