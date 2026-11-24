/**
 * JA-NEE RP WEBSITE CONFIGURATION
 * Change site content, metadata, assets, links, palette, layout, effects, and motion here.
 * Starter copy and sample content are marked so they can be reviewed before launch.
 */

const siteConfig = {
  // GENERAL WEBSITE DETAILS
  general: {
    name: 'Ja-Nee RP',
    title: 'Ja-Nee RP | A city for your next story',
    description: 'Discover Ja-Nee RP, explore the community, and find the details you need before joining.',
    locale: 'en-ZA',
    themeColor: '#0C1A12',
    favicon: 'assets/images/favicon.svg',
    openGraph: {
      title: 'Ja-Nee RP | A city for your next story',
      description: 'Discover Ja-Nee RP, explore the community, and find the details you need before joining.',
      image: 'assets/images/hero-city.svg',
      type: 'website',
    },
  },

  // BRANDING: leave logo blank to use the built-in text wordmark.
  branding: {
    logo: 'https://r2.fivemanage.com/mdsjuy4lvhuMYHC2IZ7O5/JANEERoleplayLogo.png',
    alternativeLogo: '',
    logoAlt: 'Ja-Nee RP',
    logoHeight: 42,
    logoMaxWidth: 176,
    logoPosition: 'center',
  },

  // DESIGN TOKENS: edit the colour palette and type stacks in one place.
  theme: {
    ink: '#F6F5EE',
    inkSoft: '#D0D8D0',
    forest: '#165209',
    forestDeep: '#0C1A12',
    panel: '#1B3022',
    panelHover: '#284431',
    navSurface: '#0C1A12',
    footerSurface: '#070E09',
    paper: '#0D1711',
    paperWarm: '#111F16',
    white: '#F6F5EE',
    muted: '#B5C1B8',
    mutedLight: '#D0D8D0',
    line: '#2B3C30',
    lineDark: '#36503C',
    gold: '#D4AF37',
    coral: '#C89D59',
    amber: '#E8CD7D',
    neutral: '#A6B0A4',
    bodyFont: 'Montserrat, Arial, sans-serif',
    displayFont: '"STIX Two Text", Georgia, serif',
    monoFont: 'SFMono-Regular, Consolas, Liberation Mono, monospace',
  },

  // GLOBAL DESIGN CONTROLS: tune the overall layout, type scale, shapes, glass, and hover feel here.
  // These settings apply across desktop and responsive layouts unless a component has its own rule.
  design: {
    layout: {
      pageMaxWidth: '1200px',
      pageGutter: '48px',
      pageMaxWidthTablet: '720px',
      pageGutterTablet: '28px',
      pageMaxWidthMobile: '560px',
      pageGutterMobile: '20px',
      pageGutterNarrow: '16px',
      navMaxWidth: '1320px',
      navGutter: '48px',
      navMaxWidthTablet: '720px',
      navGutterTablet: '40px',
      navGutterMobile: '28px',
      navGutterNarrow: '20px',
      navHeight: '68px',
      navHeightTablet: '64px',
      navHeightMobile: '60px',
      navOffsetTop: '14px',
      sectionMinHeight: '88svh',
      sectionMinHeightTablet: '0',
      sectionPadding: 'clamp(92px, 10vw, 140px)',
      sectionPaddingTablet: '100px',
      sectionPaddingMobile: '82px',
      heroMinHeight: 'max(760px, 100svh)',
      heroMinHeightTablet: 'max(820px, 100svh)',
      heroMinHeightMobile: 'max(900px, 100svh)',
      heroPaddingTop: '132px',
      heroPaddingBottom: '94px',
      heroPaddingTopTablet: '126px',
      heroPaddingTopMobile: '116px',
      heroPaddingBottomMobile: '100px',
      joinSectionPadding: 'clamp(100px, 12vw, 154px)',
      joinColumnGap: 'clamp(50px, 7vw, 102px)',
      scrollOffset: '92px',
      scrollOffsetMobile: '78px',
      sectionScrollMargin: '82px',
    },
    shape: {
      panelRadius: '28px',
      cardRadius: '20px',
      controlRadius: '14px',
      pillRadius: '999px',
    },
    surfaces: {
      glass: 'rgba(18, 35, 24, .82)',
      darkGlass: 'rgba(8, 20, 12, .78)',
      raisedGlass: 'rgba(38, 64, 45, .72)',
      glassBlur: '12px',
      shadowSoft: '0 24px 76px rgba(0, 0, 0, .25)',
      shadowCard: '0 18px 48px rgba(0, 0, 0, .28)',
    },
    typography: {
      bodySize: '12px',
      bodyLargeSize: '14px',
      smallSize: '10px',
      navSize: '11px',
      buttonSize: '11px',
      heroSize: 'clamp(68px, 7.4vw, 112px)',
      heroSizeTablet: 'clamp(56px, 7.2vw, 72px)',
      heroSizeWideTablet: 'clamp(62px, 7.8vw, 82px)',
      heroSizeMobile: 'clamp(58px, 13.7vw, 83px)',
      sectionHeadingSize: 'clamp(45px, 5.8vw, 76px)',
      sectionHeadingTablet: 'clamp(48px, 7.3vw, 68px)',
      sectionHeadingMobile: 'clamp(42px, 10.7vw, 62px)',
      cardTitleSize: 'clamp(27px, 3.2vw, 38px)',
      lineHeight: '1.7',
      headingLetterSpacing: '-.045em',
    },
    effects: {
      hoverLift: '2px',
      fastTransition: '180ms',
      baseTransition: '220ms',
      heroGridOpacity: '.1',
    },
    // Optional final override area for any fine detail not covered by the controls above.
    cssOverrides: '',
  },

  // TOP-LEVEL NAVIGATION AND VISIBLE SECTIONS
  navigation: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'rules', label: 'Rules' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'socials', label: 'Socials' },
    { id: 'join', label: 'Join' },
  ],
  sections: {
    about: true,
    features: true,
    rules: true,
    faqs: true,
    socials: true,
    join: true,
    footer: true,
  },

  // SITE-WIDE INTERFACE COPY: edit labels, captions, empty states, and accessibility text here.
  copy: {
    brand: {
      homeLabel: 'Ja-Nee RP home',
      initials: 'JN',
      name: 'JA-NEE',
      descriptor: 'ROLEPLAY',
    },
    navigation: {
      mainLabel: 'Main navigation',
      sectionLabel: 'Page sections',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      goToSection: 'Go to {label} section',
      skipToContent: 'Skip to content',
      joinLabel: 'Join the community',
      detailsLabel: 'Community details',
      inviteUnavailable: 'Discord invite is unavailable. See the join section for details.',
    },
    hero: {
      inviteUnavailable: 'The community invite is unavailable right now.',
      sceneBrand: 'JA-NEE RP',
      sceneTagline: 'YOUR NEXT CHAPTER',
      sceneKicker: 'A CITY OF STORIES',
      sceneTitle: ['There’s room', 'for your story.'],
      scrollCue: 'SCROLL TO EXPLORE',
      scrollCueAria: 'Scroll to explore Ja-Nee RP',
    },
    status: {
      heading: 'FIVEM SERVER STATUS',
      serverName: 'JA-NEE RP',
      noUpdate: 'No successful update yet',
      updatedPrefix: 'Updated',
      waiting: 'Waiting for a verified status source.',
      notConnected: 'Live status is not connected yet.',
      checking: 'Checking live status.',
      timedOut: 'Live status check timed out.',
      unreachable: 'Live status could not be reached.',
      unsupportedResponse: 'Live status returned an unsupported response.',
      playersSuffix: 'PLAYERS',
      online: 'ONLINE',
      offline: 'OFFLINE',
      restarting: 'RESTARTING',
      maintenance: 'MAINTENANCE',
      unknown: 'UNKNOWN',
      checkLink: 'Check FiveM server status',
    },
    about: {
      artStamp: 'STORY / PLACE / PEOPLE',
      artCoordinate: 'JA-NEE RP · 01',
      storyNote: 'Every story starts somewhere.',
      communityHeading: 'The community',
      philosophyHeading: 'Our philosophy',
      expectationsHeading: 'What to expect',
    },
    features: {
      sideLabel: ['YOUR STORY', 'SETS THE PACE'],
      exampleLabel: 'EXAMPLE COPY',
      footnote: 'Every good story is better when it’s made together.',
    },
    rules: {
      asideKicker: 'THE COMMUNITY GUIDE',
      asideDescription: 'Choose a chapter to explore.',
      tabsLabel: 'Rule categories',
      footerNote: ['RULES CAN CHANGE', 'CHECK OFFICIAL UPDATES'],
      panelEyebrow: 'JA-NEE RP / COMMUNITY GUIDE',
      defaultCategory: 'Rules',
      itemCountSuffix: 'ITEMS',
      emptyState: 'No rules are listed in this chapter yet.',
      emptyStateHint: 'Add official entries in siteConfig.js.',
    },
    faqs: {
      allCategory: 'All questions',
      filterLabel: 'Filter questions by topic',
      statusNote: 'SOME DETAILS ARE STILL BEING PREPARED',
      emptyState: 'No questions in this topic yet.',
      emptyStateHint: 'Add one in the FAQ list in siteConfig.js.',
    },
    socials: {
      eyebrow: '05 / FOLLOW THE STORY',
      title: 'Find Ja-Nee out there.',
      description: 'Choose a channel below to follow Ja-Nee RP around the web.',
      emptyTitle: 'Your community, around the web.',
      emptyDescription: 'No social links have been added yet.',
      emptyIndex: 'SOCIALS / 00',
    },
    join: {
      eyebrow: '06 / COME SAY HELLO',
      index: '06',
      inviteLabel: 'Join the community',
      inviteUnavailable: 'The community invite is unavailable right now.',
      promise: 'One landing page. All the details you need before you join.',
      pathEyebrow: 'A SIMPLE WAY TO BEGIN',
      pathMark: 'JN / 01',
      pathTitle: 'Your next chapter starts here.',
      pathDescription: 'Get to know the community, find your footing, and make yourself at home.',
      pathSteps: [
        { number: '01', title: 'Explore', description: 'Read the community guide and quick answers.' },
        { number: '02', title: 'Connect', description: 'Join the community when you are ready.' },
        { number: '03', title: 'Begin', description: 'Introduce yourself and start your story.' },
      ],
      pathFooter: 'EXPLORE · CONNECT · BEGIN',
      decoration: ['SEE YOU', 'IN THE CITY'],
    },
    common: {
      example: 'EXAMPLE',
      warningPrefix: 'WARNING:',
    },
    footer: {
      exploreLabel: 'EXPLORE',
      connectLabel: 'CONNECT',
      joinLink: 'Join us',
      discordLink: 'Discord community',
      socialsLink: 'Explore social channels',
      editionName: 'JA-NEE RP',
      editionLabel: 'COMMUNITY / ROLEPLAY',
      backToTopLink: 'BACK TO TOP ↑',
      backToTopAria: 'Return to the top of the page',
      copyrightSuffix: 'All rights reserved.',
    },
    update: {
      available: 'A newer Ja-Nee RP website is available.',
      refresh: 'Refresh page',
      dismiss: 'Dismiss update notice',
    },
  },

  // HERO: introductory copy and image are starter material, ready to personalise.
  hero: {
    eyebrow: 'JA-NEE ROLEPLAY  /  YOUR NEXT CHAPTER',
    titleLines: ['Find your place', 'in the story.'],
    tagline: 'Make yourself at home.',
    description: 'Meet the Ja-Nee RP community, take a look around, and discover where your next chapter could lead.',
    primaryLabel: 'Meet the community',
    secondaryLabel: 'Take a look around',
    imageAlt: 'Illustrated city skyline at dusk',
    showScrollCue: true,
  },

  // ABOUT US: starter copy is intentionally general; replace with approved details.
  about: {
    index: '01',
    eyebrow: '01 / ABOUT JA-NEE',
    title: 'A place for the stories you bring.',
    introduction: 'Ja-Nee RP is a roleplay community with room for new characters, unexpected turns, and stories made together.',
    community: 'Every person arrives with a point of view. The best scenes leave space for others to shape what happens next.',
    philosophy: 'Bring intention to your character, curiosity to each scene, and respect for the people sharing the world.',
    expectations: 'A thoughtful start begins by reading the community guidance and arriving ready to share the scene.',
    experience: 'Your next chapter could start with one introduction, one conversation, or a decision you did not plan to make.',
    starterCopy: true,
    image: 'assets/images/story-map.svg',
    imageAlt: 'Abstract illustrated map of a city with connected story paths',
  },

  featureSection: {
    index: '02',
    eyebrow: '02 / THE JA-NEE EXPERIENCE',
    title: 'What could your story hold?',
    description: 'A few small things that make a shared story feel worth coming back to.',
  },

  // FEATURES: these are examples only, not claims about the live server.
  features: [
    {
      number: '01',
      title: 'Start with a hello.',
      description: 'A story can begin with an introduction, a first scene, or a simple idea.',
      category: 'MEET THE COMMUNITY',
      accent: 'gold',
      icon: 'spark',
      image: '',
      accentColor: '',
      isExample: false,
    },
    {
      number: '02',
      title: 'Make the city yours.',
      description: 'Bring a point of view, find your rhythm, and see where your character might go next.',
      category: 'YOUR STORY',
      accent: 'gold',
      icon: 'pin',
      image: '',
      accentColor: '',
      isExample: false,
    },
    {
      number: '03',
      title: 'Leave room for others.',
      description: 'The most memorable moments take shape when everyone has space to contribute.',
      category: 'PLAY TOGETHER',
      accent: 'gold',
      icon: 'arrow',
      image: '',
      accentColor: '',
      isExample: false,
    },
    {
      number: '04',
      title: 'Let the story grow.',
      description: 'Good roleplay unfolds one thoughtful scene at a time, with room for the unexpected.',
      category: 'ONE SCENE AT A TIME',
      accent: 'gold',
      icon: 'spark',
      image: '',
      accentColor: '',
      isExample: false,
    },
  ],

  // RULES: replace the illustrative sample rules with your official rules before publishing.
  rules: {
    index: '03',
    eyebrow: '03 / BEFORE YOU PLAY',
    title: 'A good scene starts with shared ground.',
    description: 'A little shared understanding makes it easier for everyone to settle in and enjoy the story.',
    starterNotice: 'Sample content only. Replace these examples with Ja-Nee RP’s official rules before publishing.',
    categories: [
      {
        id: 'general',
        label: 'General',
        rules: [
          {
            title: 'Treat people with respect',
            description: 'Example only: add the exact conduct guidance approved for your community.',
            note: 'Sample rule — confirm or remove.',
            warning: '',
          },
          {
            title: 'Keep community guidance close',
            description: 'Example only: link or summarise the official community standards here.',
            note: 'Sample rule — confirm or remove.',
            warning: '',
          },
        ],
      },
      {
        id: 'roleplay',
        label: 'Roleplay',
        rules: [
          {
            title: 'Give scenes room to develop',
            description: 'Example only: add Ja-Nee RP’s definitions and expectations for roleplay here.',
            note: 'Sample rule — confirm or remove.',
          },
          {
            title: 'Know where to ask for help',
            description: 'Example only: explain the approved way to resolve questions or scene concerns.',
            note: 'Sample rule — confirm or remove.',
          },
        ],
      },
      {
        id: 'characters',
        label: 'Characters',
        rules: [
          {
            title: 'Make your character your own',
            description: 'Example only: add character creation guidance, limits, or application requirements.',
            note: 'Sample rule — confirm or remove.',
          },
        ],
      },
    ],
  },

  // FAQ: every answer below is a placeholder, not an official server policy.
  faqs: [
    {
      category: 'Getting started',
      question: 'How do I join Ja-Nee RP?',
      answer: 'Add the verified joining steps here, including any required Discord or application process.',
      isExample: true,
    },
    {
      category: 'Getting started',
      question: 'What do I need to play?',
      answer: 'List confirmed platform, game, and setup requirements here.',
      isExample: true,
    },
    {
      category: 'The community',
      question: 'Where can I read the rules?',
      answer: 'Add the official rules location or confirm that the Rules section on this page is current.',
      isExample: true,
    },
    {
      category: 'The community',
      question: 'How can I contact staff?',
      answer: 'Add the official support route and any response-time expectations here.',
      isExample: true,
    },
    {
      category: 'The community',
      question: 'What if the server is restarting or under maintenance?',
      answer: 'Explain where official service updates are posted and what players should do.',
      isExample: true,
    },
  ],

  faqSection: {
    index: '04',
    eyebrow: '04 / QUICK ANSWERS',
    title: 'Before you step inside.',
    description: 'A few quick answers to make the first steps feel simple.',
  },

  socialsSection: {
    index: '05',
  },

  // COMMUNITY INVITATION: configure the public invite link and approved invitation copy.
  discord: {
    inviteUrl: 'https://discord.gg/jKx5JRHE86',
    heading: 'Your next story starts with a hello.',
    message: 'Meet the Ja-Nee RP community, get the details you need, and find your way into the city.',
  },

  // SOCIAL LINKS: any valid URL appears automatically; set enabled: false to hide an entry.
  socials: [
    { name: 'TikTok', icon: 'tiktok', url: 'https://www.tiktok.com/@janeerp?is_from_webapp=1&sender_device=pc', image: '', description: 'Short clips and moments from the city.', color: '#D4AF37' },
    { name: 'YouTube', icon: 'youtube', url: '', image: '', description: 'Videos, highlights, and community stories.', color: '#ff8668' },
    { name: 'Instagram', icon: 'instagram', url: '', image: '', description: 'Scenes and updates from Ja-Nee RP.', color: '#e4a78e' },
    { name: 'Facebook', icon: 'facebook', url: '', image: '', description: 'News and community updates.', color: '#9ebcde' },
  ],

  // FIVE M SERVER STATUS: direct access may be blocked by browser security rules.
  // Use an HTTPS API endpoint with CORS enabled if the host cannot be reached directly.
  fivem: {
    serverIp: '',
    serverPort: 30120,
    statusApiEndpoint: '',
    directEndpointPath: '/dynamic.json',
    refreshIntervalMs: 60000,
    timeoutMs: 7000,
    showPlayerCount: true,
  },

  // IMAGE SETTINGS: set a local asset path or full https URL; blank paths use CSS fallbacks.
  // Overlay opacity ranges from 0 (clear) to 1 (opaque). Blur is optional.
  images: {
    hero: {
      src: 'assets/images/hero-city.svg',
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat',
      overlayColor: '#102416',
      overlayOpacity: 0.28,
      imageOpacity: 0.64,
      gradient: 'linear-gradient(90deg, rgba(13, 29, 17, .96) 0%, rgba(13, 29, 17, .82) 48%, rgba(13, 29, 17, .36) 100%)',
      blur: 12,
    },
    about: {
      src: '',
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat',
      overlayColor: '#F5F2EA',
      overlayOpacity: 0.08,
      gradient: '',
      blur: 0,
    },
    features: { src: '', position: 'center', size: 'cover', repeat: 'no-repeat', overlayColor: '#102416', overlayOpacity: 0.22, gradient: '', blur: 0 },
    rules: { src: '', position: 'center', size: 'cover', repeat: 'no-repeat', overlayColor: '#F5F2EA', overlayOpacity: 0.08, gradient: '', blur: 0 },
    faqs: { src: '', position: 'center', size: 'cover', repeat: 'no-repeat', overlayColor: '#EEE9DE', overlayOpacity: 0.08, gradient: '', blur: 0 },
    socials: { src: '', position: 'center', size: 'cover', repeat: 'no-repeat', overlayColor: '#F5F2EA', overlayOpacity: 0.08, gradient: '', blur: 0 },
    join: {
      src: 'assets/images/join-district.svg',
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat',
      overlayColor: '#102416',
      overlayOpacity: 0.42,
      imageOpacity: 0.4,
      gradient: 'linear-gradient(110deg, rgba(13, 29, 17, .97) 4%, rgba(13, 29, 17, .86) 58%, rgba(13, 29, 17, .5) 100%)',
      blur: 0,
    },
    footer: { src: '', position: 'center', size: 'cover', repeat: 'no-repeat', overlayColor: '#0B1A10', overlayOpacity: 0.1, gradient: '', blur: 0 },
  },

  // CUSTOM CURSOR: cursor pack artwork is stored in public/assets/cursors/.
  cursor: {
    enabled: true,
    defaultImage: 'assets/cursors/ja-nee-default.png',
    pointerImage: 'assets/cursors/ja-nee-hover.png',
    textImage: 'assets/cursors/ja-nee-text.png',
    interactionImage: 'assets/cursors/ja-nee-link.png',
    width: 48,
    height: 48,
    hotspotX: 7,
    hotspotY: 6,
    hotspots: {
      default: { x: 7, y: 6 },
      pointer: { x: 7, y: 6 },
      text: { x: 19, y: 24 },
      interaction: { x: 18, y: 5 },
    },
    animate: false,
  },

  // MOTION: reveal and hover effects respect the visitor’s reduced-motion setting.
  animations: {
    enabled: true,
    speed: 1,
    scrollReveal: true,
    revealDistance: 18,
    parallax: false,
    hoverEffects: true,
  },

  // FOOTER COPY
  footer: {
    description: 'A place for the stories you bring.',
    copyrightName: 'Ja-Nee RP',
    copyrightSymbol: '©',
    copyrightYear: '',
    backToTopLabel: 'Back to top',
    statusLinkEnabled: true,
  },
}

export default siteConfig
