/**
 * JA-NEE RP SITE SETTINGS
 * Each heading below names the part of the website it controls.
 * Assets in src/assets are found recursively, including nested folders.
 */
const siteConfig = {
  // PAGE TITLE, DESCRIPTION, FAVICON, AND SOCIAL PREVIEW
  general: {
    name: "Ja-Nee RP",
    title: "Ja-Nee RP | A city for your next story",
    description: "Discover Ja-Nee RP, explore the community, and find the details you need before joining.",
    locale: "en-ZA",
    themeColor: "#0C1A12",
    favicon: "assets/images/favicon.svg",
    openGraph: {
      title: "Ja-Nee RP | A city for your next story",
      description: "Discover Ja-Nee RP, explore the community, and find the details you need before joining.",
      image: "assets/images/hero-city.svg",
      type: "website"
    }
  },
  // LOGOS: paths can point to files anywhere inside src/assets
  branding: {
    logo: "assets/optimized/ja-nee-logo-2x.png",
    alternativeLogo: "",
    logoAlt: "Ja-Nee RP",
    logoHeight: 56,
    logoMaxWidth: 224,
    logoPosition: "center"
  },
  // COLOURS AND FONT FAMILIES
  theme: {
    ink: "#F6F5EE",
    inkSoft: "#D0D8D0",
    forest: "#165209",
    forestDeep: "#0C1A12",
    panel: "#1B3022",
    panelHover: "#284431",
    navSurface: "#0C1A12",
    footerSurface: "#070E09",
    paper: "#0D1711",
    paperWarm: "#111F16",
    white: "#F6F5EE",
    muted: "#B5C1B8",
    mutedLight: "#D0D8D0",
    line: "#2B3C30",
    lineDark: "#36503C",
    gold: "#D4AF37",
    coral: "#C89D59",
    amber: "#E8CD7D",
    neutral: "#A6B0A4",
    bodyFont: "Montserrat, Arial, sans-serif",
    displayFont: "\"STIX Two Text\", Georgia, serif",
    monoFont: "SFMono-Regular, Consolas, Liberation Mono, monospace"
  },
  // LAYOUT, CORNERS, SPACING, GLASS, AND CSS OVERRIDES
  design: {
    layout: {
      pageMaxWidth: "1200px",
      pageGutter: "48px",
      pageMaxWidthTablet: "720px",
      pageGutterTablet: "28px",
      pageMaxWidthMobile: "560px",
      pageGutterMobile: "20px",
      pageGutterNarrow: "16px",
      navMaxWidth: "1320px",
      navGutter: "48px",
      navMaxWidthTablet: "720px",
      navGutterTablet: "40px",
      navGutterMobile: "28px",
      navGutterNarrow: "20px",
      navHeight: "68px",
      navHeightTablet: "64px",
      navHeightMobile: "60px",
      navOffsetTop: "14px",
      sectionMinHeight: "88svh",
      sectionMinHeightTablet: "0",
      sectionPadding: "clamp(92px, 10vw, 140px)",
      sectionPaddingTablet: "100px",
      sectionPaddingMobile: "82px",
      heroMinHeight: "max(760px, 100svh)",
      heroMinHeightTablet: "max(820px, 100svh)",
      heroMinHeightMobile: "max(900px, 100svh)",
      heroPaddingTop: "132px",
      heroPaddingBottom: "94px",
      heroPaddingTopTablet: "126px",
      heroPaddingTopMobile: "116px",
      heroPaddingBottomMobile: "100px",
      heroStatusOverlap: "52px",
      heroSceneCaptionBottom: "clamp(145px, 14vw, 170px)",
      scrollOffset: "92px",
      scrollOffsetMobile: "78px",
      sectionScrollMargin: "82px"
    },
    shape: {
      panelRadius: "28px",
      cardRadius: "20px",
      controlRadius: "14px",
      pillRadius: "999px"
    },
    surfaces: {
      glass: "rgba(18, 35, 24, .82)",
      darkGlass: "rgba(8, 20, 12, .78)",
      raisedGlass: "rgba(38, 64, 45, .72)",
      glassBlur: "12px",
      shadowSoft: "0 24px 76px rgba(0, 0, 0, .25)",
      shadowCard: "0 18px 48px rgba(0, 0, 0, .28)"
    },
    typography: {
      bodySize: "12px",
      bodyLargeSize: "14px",
      smallSize: "10px",
      navSize: "11px",
      buttonSize: "11px",
      heroSize: "clamp(68px, 7.4vw, 112px)",
      heroSizeTablet: "clamp(56px, 7.2vw, 72px)",
      heroSizeWideTablet: "clamp(62px, 7.8vw, 82px)",
      heroSizeMobile: "clamp(58px, 13.7vw, 83px)",
      sectionHeadingSize: "clamp(45px, 5.8vw, 76px)",
      sectionHeadingTablet: "clamp(48px, 7.3vw, 68px)",
      sectionHeadingMobile: "clamp(42px, 10.7vw, 62px)",
      cardTitleSize: "clamp(27px, 3.2vw, 38px)",
      lineHeight: "1.7",
      headingLetterSpacing: "-.045em"
    },
    effects: {
      hoverLift: "2px",
      fastTransition: "180ms",
      baseTransition: "220ms",
      heroGridOpacity: ".1"
    },
    cssOverrides: ""
  },
  // TOP NAVIGATION LABELS AND SECTION LINKS
  navigation: [
    {
      id: "home",
      label: "Home"
    },
    {
      id: "about",
      label: "About"
    },
    {
      id: "features",
      label: "Features"
    },
    {
      id: "rules",
      label: "Rules"
    },
    {
      id: "faqs",
      label: "FAQs"
    },
    {
      id: "socials",
      label: "Socials"
    }
  ],
  // TOGGLE WHOLE PAGE SECTIONS ON OR OFF
  sections: {
    about: true,
    features: true,
    rules: true,
    faqs: true,
    socials: true,
    footer: true
  },
  // SMALL SHARED BUTTON, NAV, AND ACCESSIBILITY LABELS
  copy: {
    brand: {
      homeLabel: "Ja-Nee RP home",
      initials: "JN",
      name: "JA-NEE",
      descriptor: "ROLEPLAY"
    },
    navigation: {
      mainLabel: "Main navigation",
      sectionLabel: "Page sections",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      goToSection: "Go to {label} section",
      skipToContent: "Skip to content",
      joinLabel: "Join the community",
      detailsLabel: "Community details",
      inviteUnavailable: "Add an official HTTPS invite URL in siteConfig.js to enable direct access."
    },
    hero: {
      inviteUnavailable: "The community invite is unavailable right now.",
      sceneBrand: "JA-NEE RP",
      sceneTagline: "YOUR NEXT CHAPTER",
      sceneKicker: "A CITY OF STORIES",
      sceneTitle: [
        "There’s room",
        "for your story."
      ],
      scrollCue: "SCROLL TO EXPLORE",
      scrollCueAria: "Scroll to explore Ja-Nee RP"
    },
    launch: {
      eyebrow: "JA-NEE RP / OPENING SOON",
      countdownAria: "Time remaining until the server launch",
      timerOnlyAria: "Countdown until the server opens",
      discordLabel: "Join the Discord community",
      discordAria: "Open the Ja-Nee RP Discord invite in a new tab",
      units: {
        days: "DAYS",
        hours: "HOURS",
        minutes: "MINUTES",
        seconds: "SECONDS"
      }
    },
    mascot: {
      roast: [
        "One marshmallow, coming right up.",
        "Getting that just right.",
        "A tiny campfire break."
      ],
      point: [
        "This looks like a good next stop.",
        "Found something for you.",
        "That one caught my eye."
      ],
      wave: [
        "Oh, hi there.",
        "Just passing through.",
        "Taking a little look around."
      ],
      inspect: [
        "Hmm. Looking good so far.",
        "Just checking the details.",
        "I like this little corner."
      ]
    },
    status: {
      heading: "FIVEM SERVER STATUS",
      serverName: "JA-NEE RP",
      noUpdate: "No successful update yet",
      updatedPrefix: "Updated",
      waiting: "Waiting for a verified status source.",
      notConnected: "Live status is not connected yet.",
      checking: "Checking live status.",
      timedOut: "Live status check timed out.",
      unreachable: "Live status could not be reached.",
      unsupportedResponse: "Live status returned an unsupported response.",
      playersSuffix: "PLAYERS",
      online: "ONLINE",
      offline: "OFFLINE",
      restarting: "RESTARTING",
      maintenance: "MAINTENANCE",
      unknown: "UNKNOWN",
      checkLink: "Check FiveM server status"
    },
    about: {
      artStamp: "STORY / PLACE / PEOPLE",
      artCoordinate: "JA-NEE RP · 01",
      storyNote: "Every story starts somewhere.",
      communityHeading: "The community",
      philosophyHeading: "Our philosophy",
      expectationsHeading: "What to expect"
    },
    features: {
      sideLabel: [
        "YOUR STORY",
        "SETS THE PACE"
      ],
      exampleLabel: "EXAMPLE COPY",
      footnote: "Every good story is better when it’s made together."
    },
    rules: {
      asideKicker: "THE COMMUNITY GUIDE",
      asideDescription: "Choose a chapter to explore.",
      tabsLabel: "Rule categories",
      fullRulesLabel: "Read the complete rules",
      fullRulesAria: "Open the complete Ja-Nee RP rulebook in a new tab",
      footerNote: [
        "RULES CAN CHANGE",
        "CHECK OFFICIAL UPDATES"
      ],
      panelEyebrow: "JA-NEE RP / COMMUNITY GUIDE",
      defaultCategory: "Rules",
      itemCountSuffix: "ITEMS",
      emptyState: "No rules are listed in this chapter yet.",
      emptyStateHint: "Add official entries in siteConfig.js."
    },
    faqs: {
      allCategory: "All questions",
      filterLabel: "Filter questions by topic",
      statusNote: "SOME DETAILS ARE STILL BEING PREPARED",
      emptyState: "No questions in this topic yet.",
      emptyStateHint: "Add one in the FAQ list in siteConfig.js."
    },
    socials: {
      eyebrow: "05 / FOLLOW THE STORY",
      title: "Find Ja-Nee out there.",
      description: "Choose a channel below to follow Ja-Nee RP around the web.",
      emptyTitle: "Your community, around the web.",
      emptyDescription: "No social links have been added yet.",
      emptyIndex: "SOCIALS / 00"
    },
    common: {
      warningPrefix: "WARNING:"
    },
    footer: {
      exploreLabel: "EXPLORE",
      connectLabel: "CONNECT",
      staffLabel: "STAFF TEAM",
      discordLink: "Discord community",
      socialsLink: "Explore social channels",
      editionName: "JA-NEE RP",
      editionLabel: "COMMUNITY / ROLEPLAY",
      copyrightSuffix: "All rights reserved."
    },
    update: {
      available: "A newer Ja-Nee RP website is available.",
      refresh: "Refresh page",
      dismiss: "Dismiss update notice"
    }
  },
  // HERO HEADLINE, INTRODUCTION, AND BUTTONS
  hero: {
    eyebrow: "JA-NEE ROLEPLAY  /  YOUR NEXT CHAPTER",
    titleLines: [
      "Find your place",
      "in the story."
    ],
    tagline: "Make yourself at home.",
    description: "Meet the Ja-Nee RP community, take a look around, and discover where your next chapter could lead.",
    primaryLabel: "Meet the community",
    secondaryLabel: "Take a look around",
    imageAlt: "Illustrated city skyline at dusk",
    showScrollCue: true
  },
  // ABOUT SECTION COPY AND IMAGE
  about: {
    index: "01",
    eyebrow: "ABOUT JA-NEE",
    title: "A place for the stories you bring.",
    introduction: "Ja-Nee RP is a roleplay community with room for new characters, unexpected turns, and stories made together.",
    community: "Every person arrives with a point of view. The best scenes leave space for others to shape what happens next.",
    philosophy: "Bring intention to your character, curiosity to each scene, and respect for the people sharing the world.",
    expectations: "A thoughtful start begins by reading the community guidance and arriving ready to share the scene.",
    experience: "Your next chapter could start with one introduction, one conversation, or a decision you did not plan to make.",
    starterCopy: true,
    image: "assets/images/story-map.svg",
    imageAlt: "Abstract illustrated map of a city with connected story paths"
  },
  // FEATURES SECTION HEADING AND INTRODUCTION
  featureSection: {
    index: "02",
    eyebrow: "THE JA-NEE EXPERIENCE",
    title: "What could your story hold?",
    description: "A few small things that make a shared story feel worth coming back to."
  },
  // FEATURE CARDS AND THEIR IMAGE PATHS
  features: [
    {
      number: "01",
      title: "Start with a hello.",
      description: "A story can begin with an introduction, a first scene, or a simple idea.",
      category: "MEET THE COMMUNITY",
      accent: "gold",
      icon: "spark",
      image: "",
      accentColor: "",
      isExample: false
    },
    {
      number: "02",
      title: "Make the city yours.",
      description: "Bring a point of view, find your rhythm, and see where your character might go next.",
      category: "YOUR STORY",
      accent: "gold",
      icon: "pin",
      image: "",
      accentColor: "",
      isExample: false
    },
    {
      number: "03",
      title: "Leave room for others.",
      description: "The most memorable moments take shape when everyone has space to contribute.",
      category: "PLAY TOGETHER",
      accent: "gold",
      icon: "arrow",
      image: "",
      accentColor: "",
      isExample: false
    },
    {
      number: "04",
      title: "Let the story grow.",
      description: "Good roleplay unfolds one thoughtful scene at a time, with room for the unexpected.",
      category: "ONE SCENE AT A TIME",
      accent: "gold",
      icon: "spark",
      image: "",
      accentColor: "",
      isExample: false
    }
  ],
  // RULES INTRODUCTION, CATEGORIES, AND RULE TEXT
  rules: {
    index: "03",
    eyebrow: "BEFORE YOU PLAY",
    title: "A good scene starts with shared ground.",
    description: "A little shared understanding makes it easier for everyone to settle in and enjoy the story.",
    starterNotice: "",
    // Add a PDF or document path here, e.g. assets/rules/Ja-Nee-RP-Rulebook.pdf.
    // Files in src/assets work from nested folders; public/assets paths work too.
    documentUrl: "assets/rules/JA•NEE RP OFFICAL SERVER RULES.pdf",
    categories: [
      {
        id: "general",
        label: "GENERAL",
        rules: [
          {
            title: "RESPECT EVERYONE",
            description: "Treat everyone with respect, both in and outside the city",
            note: "Discrimination, racism, sexism, harassment, hate speech and targeted bullying will not be tolerated",
            warning: ""
          },
          {
            title: "COMMON SENSE",
            description: "Not every possible situation will have its own rule",
            note: "If something is clearly unfair, disruptive or intended to ruin another person's experience, don't do it.",
            warning: ""
          },
          {
            title: "CHEATING & THIRD-PARTY SOFTWARE",
            description: "Any use of cheats, hacks, mod menus, scripts or third-party software that provides an unfair advantage is strictly prohibited.",
            note: "If you are found using these software, you will get permanently banned",
            warning: ""
          }
        ]
      },
      {
        id: "roleplay",
        label: "ROLEPLAY",
        rules: [
          {
            title: "STAY IN CHARACTER (IC)",
            description: "Once you fly into city, you are expected to remain in character",
            note: "Avoid discussing Discord conversations, staff matters or other out-of-character information during roleplay"
          },
          {
            title: "METAGAMING",
            description: "Using info your character has not obtained through roleplay is considered metagaming.",
            note: "Examples: Watching someone's stream to find their location, using Discord to locate other players, etc."
          },
          {
            title: "POWERGAMING",
            description: "Forcing actions or situations onto another player without giving them a reasonable opportunity to respond is NOT allowed.",
            note: "Examples: Performing unrealistic actions that would not be possible in real life, abusing game mechanics to gain an unfair advantage."
          }
        ]
      },
      {
        id: "crime",
        label: "CRIME & ILLEGAL ACTIVITIES",
        rules: [
          {
            title: "VALID INITIATION",
            description: "Criminal activities must have a reasonable roleplay initiation.",
            note: "You cannot simply shoot someone because you feel like it."
          },
          {
            title: "ROBBERIES",
            description: "Robberies must involve proper roleplay.",
            note: "Give the other party an opportunity to respond and don't use robberies as an excuse to randomly kill players."
          },
          {
            title: "REVENGE KILLING",
            description: "You may not return to kill someone simply because they killed you previously.",
            note: "Your character must have a valid reason and must follow the New Life Rule"
          }
          
        ]
      }
    ]
  },
  // FREQUENTLY ASKED QUESTIONS AND ANSWERS
  faqs: [
    {
      category: "Getting started",
      question: "How do I join Ja-Nee RP?",
      answer: "Join our Discord Server through this website, fill in an application and get started"
    },
    {
      category: "Getting started",
      question: "What do I need to play?",
      answer: "**A legitimate copy of GTA V, a quad-core CPU, 4–8 GB RAM (16 GB recommended), a 1–2 GB GPU, and 110–133 GB of storage for GTA V and FiveM.**"
    },
    {
      category: "The community",
      question: "Where can I read the rules?",
      answer: "You can read the rules both in the Discord server and on this website, by clicking on the link in the previous section"
    },
    {
      category: "The community",
      question: "How can I contact staff?",
      answer: "Open a support ticket in the Discord server"
    },
    {
      category: "The community",
      question: "What if the server is restarting or under maintenance?",
      answer: "Unfortunately the server may restart or be under maintenance from time to time, but you can always check the status here, on discord, and on the announcements channel on Discord"
    }
  ],
  // FAQ SECTION HEADING AND INTRODUCTION
  faqSection: {
    index: "04",
    eyebrow: "QUICK ANSWERS",
    title: "Before you step inside.",
    description: "A few quick answers to make the first steps feel simple."
  },
  // SOCIALS SECTION HEADING
  socialsSection: {
    index: "05"
  },
  // OFFICIAL DISCORD INVITE URL
  discord: {
    inviteUrl: "https://discord.gg/jKx5JRHE86"
  },
  // SOCIAL PROFILE LINKS AND CARD DETAILS
  socials: [
    {
      name: "TikTok",
      icon: "tiktok",
      url: "https://www.tiktok.com/@janeerp?is_from_webapp=1&sender_device=pc",
      image: "",
      description: "Short clips and moments from the city.",
      color: "#D4AF37"
    },
    {
      name: "YouTube",
      icon: "youtube",
      url: "",
      image: "",
      description: "Videos, highlights, and community stories.",
      color: "#ff8668"
    },
    {
      name: "Instagram",
      icon: "instagram",
      url: "",
      image: "",
      description: "Scenes and updates from Ja-Nee RP.",
      color: "#e4a78e"
    },
    {
      name: "Facebook",
      icon: "facebook",
      url: "",
      image: "",
      description: "News and community updates.",
      color: "#9ebcde"
    }
  ],
  // FOOTER STAFF PROFILES AND AVATAR PATHS
  staffTeam: {
    enabled: true,
    members: [
      {
        name: "Sakkie de Kok • Owner",
        avatar: "assets/optimized/sakkie-avatar-400.jpg"
      },
      {
        name: "Meyer Hunter • Co-Owner",
        avatar: "assets/optimized/meyer-avatar-400.jpg"
      },
      {
        name: "Rico Moretti • Co-Owner",
        avatar: "assets/staff/rico.png"
      },
      {
        name: "Eddie Rose • Admin",
        avatar: "assets/staff/eddie.png"
      }
    ]
  },
  // FULL-SCREEN LAUNCH ANNOUNCEMENT AND COUNTDOWN
  launch: {
    // Leave false while editing. Set true when the launch screen is ready to publish.
    enabled: true,
    // Choose "timer" (timer only), "message" (message only), or "both" (message + timer).
    mode: "message",
    // Use any future ISO date/time; +02:00 is South African local time. A few minutes ahead is fine for testing.
    // TEMPORARY TEST VALUE: 2026-11-26T03:10:00+02:00. Replace before the real launch.
    launchAt: "",
    // Candle begins shrinking during this many final minutes before launch.
    candleBurnMinutes: 15,
    title: "A new chapter is on the horizon.",
    message: "We’re getting the city ready. We’ll open the doors soon.",
    // Leave blank to use discord.inviteUrl. The link is hidden when that URL is not valid.
    discordUrl: "https://discord.gg/jKx5JRHE86",
    showDiscordLink: true,
    // Add { label: "Rules", url: "https://..." } entries for optional links beside Discord.
    // Leave empty to show only the Discord link.
    links: []
  },
  // PIXEL MASCOT: OCCASIONAL SITE VISITS AND SMALL INTERACTIONS
  mascot: {
    enabled: true,
    // These images were cut from the supplied mascot sheet; paths are relative to public/.
    frontSprite: "assets/mascot/ja-nee-front.png",
    walkingLeftSprite: "assets/mascot/ja-nee-left.png",
    walkingRightSprite: "assets/mascot/ja-nee-right.png",
    desktopHeight: 142,
    mobileHeight: 106,
    firstVisitDelayMinMs: 3500,
    firstVisitDelayMaxMs: 7000,
    returnDelayMinMs: 38000,
    returnDelayMaxMs: 72000,
    walkDurationMs: 2700,
    stayDurationMinMs: 4200,
    stayDurationMaxMs: 6800,
    roastMarshmallowEnabled: true,
    roastMarshmallowWeight: 30,
    pointAtLinksEnabled: true,
    pointAtLinksWeight: 42,
    waveEnabled: true,
    waveWeight: 16,
    inspectEnabled: true,
    inspectWeight: 12,
    respectReducedMotion: false
  },
  // LIVE UPDATE CHECKS (cPanel still needs a successful GitHub deploy first)
  updates: {
    enabled: true,
    // Visitors are prompted to refresh within this interval after a new build is published.
    checkIntervalMs: 15000
  },
  // SITE-WIDE CLICK SOUNDS. Volumes range from 0 (silent) to 1 (full volume).
  audio: {
    enabled: true,
    interfaceClicksEnabled: true,
    interfaceClickVolume: 0.04,
    countdownClicksEnabled: true,
    countdownClickVolume: 0.1
  },
  // FIVEM STATUS CONNECTION SETTINGS
  fivem: {
    serverIp: "",
    serverPort: 30120,
    statusApiEndpoint: "",
    directEndpointPath: "/dynamic.json",
    refreshIntervalMs: 60000,
    timeoutMs: 7000,
    showPlayerCount: true
  },
  // SECTION BACKGROUNDS, CROPPING, AND OVERLAYS
  images: {
    hero: {
      src: "assets/images/hero-city.svg",
      position: "center",
      size: "cover",
      repeat: "no-repeat",
      overlayColor: "#102416",
      overlayOpacity: 0.28,
      imageOpacity: 0.64,
      gradient: "linear-gradient(90deg, rgba(13, 29, 17, .96) 0%, rgba(13, 29, 17, .82) 48%, rgba(13, 29, 17, .36) 100%)",
      blur: 12
    },
    about: {
      src: "",
      position: "center",
      size: "cover",
      repeat: "no-repeat",
      overlayColor: "#F5F2EA",
      overlayOpacity: 0.08,
      gradient: "",
      blur: 0
    },
    features: {
      src: "",
      position: "center",
      size: "cover",
      repeat: "no-repeat",
      overlayColor: "#102416",
      overlayOpacity: 0.22,
      gradient: "",
      blur: 0
    },
    rules: {
      src: "",
      position: "center",
      size: "cover",
      repeat: "no-repeat",
      overlayColor: "#F5F2EA",
      overlayOpacity: 0.08,
      gradient: "",
      blur: 0
    },
    faqs: {
      src: "",
      position: "center",
      size: "cover",
      repeat: "no-repeat",
      overlayColor: "#EEE9DE",
      overlayOpacity: 0.08,
      gradient: "",
      blur: 0
    },
    socials: {
      src: "",
      position: "center",
      size: "cover",
      repeat: "no-repeat",
      overlayColor: "#F5F2EA",
      overlayOpacity: 0.08,
      gradient: "",
      blur: 0
    },
    footer: {
      src: "",
      position: "center",
      size: "cover",
      repeat: "no-repeat",
      overlayColor: "#0B1A10",
      overlayOpacity: 0.1,
      gradient: "",
      blur: 0
    }
  },
  // CUSTOM CURSOR FILES, SIZE, AND HOTSPOTS
  cursor: {
    enabled: true,
    defaultImage: "assets/cursors/ja-nee-default.png",
    pointerImage: "assets/cursors/ja-nee-hover.png",
    textImage: "assets/cursors/ja-nee-text.png",
    interactionImage: "assets/cursors/ja-nee-link.png",
    width: 48,
    height: 48,
    hotspotX: 7,
    hotspotY: 6,
    hotspots: {
      default: {
        x: 7,
        y: 6
      },
      pointer: {
        x: 7,
        y: 6
      },
      text: {
        x: 19,
        y: 24
      },
      interaction: {
        x: 18,
        y: 5
      }
    },
    animate: false
  },
  // MOTION AND REVEAL EFFECTS
  animations: {
    enabled: true,
    speed: 1,
    scrollReveal: true,
    revealDistance: 18,
    parallax: false,
    hoverEffects: true
  },
  // FOOTER DESCRIPTION, COPYRIGHT, AND LINKS
  footer: {
    description: "A place for the stories you bring.",
    copyrightName: "Ja-Nee RP",
    copyrightSymbol: "©",
    copyrightYear: "2026",
    backToTopLabel: "Back to top",
    statusLinkEnabled: true
  }
}

export default siteConfig
