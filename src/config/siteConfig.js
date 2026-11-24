/**
 * JA-NEE RP WEBSITE CONFIGURATION
 * Change site copy, images, links, colours, status settings and motion here.
 * Starter copy and sample content are marked so they can be reviewed before launch.
 */

const siteConfig = {
  // GENERAL WEBSITE DETAILS
  general: {
    name: 'Ja-Nee RP',
    title: 'Ja-Nee RP | A city for your next story',
    description: 'Discover Ja-Nee RP, explore the community, and find the details you need before joining.',
    themeColor: '#165209',
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
    logo: '',
    alternativeLogo: '',
    logoAlt: 'Ja-Nee RP',
    logoHeight: 42,
    logoMaxWidth: 176,
    logoPosition: 'center',
  },

  // DESIGN TOKENS: edit the colour palette and type stacks in one place.
  theme: {
    ink: '#F8F5E8',
    inkSoft: '#E5EAD9',
    forest: '#165209',
    forestDeep: '#0B3007',
    panel: '#103D09',
    panelHover: '#12470B',
    navSurface: '#092804',
    footerSurface: '#082704',
    paper: '#165209',
    paperWarm: '#1D5D12',
    white: '#FFF9E8',
    muted: '#C1D0B6',
    line: '#3D7433',
    gold: '#D4AF37',
    coral: '#E5C56A',
    amber: '#E9C65C',
    neutral: '#ADB8A4',
    bodyFont: 'Montserrat, Arial, sans-serif',
    displayFont: '"STIX Two Text", Georgia, serif',
    monoFont: 'SFMono-Regular, Consolas, Liberation Mono, monospace',
  },

  // TOP-LEVEL NAVIGATION AND VISIBLE SECTIONS
  navigation: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'rules', label: 'Rules' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'socials', label: 'Socials' },
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

  // HERO: introductory copy and image are starter material, ready to personalise.
  hero: {
    eyebrow: 'ROLEPLAY • COMMUNITY • YOUR NEXT CHAPTER',
    titleLines: ['Make space', 'for your next', 'story.'],
    tagline: 'A city is only as memorable as the stories you bring to it.',
    description: 'Ja-Nee RP is ready for its introduction. Explore the community, review the essentials, and see how to join.',
    primaryLabel: 'Join the Discord',
    secondaryLabel: 'Explore Ja-Nee RP',
    imageAlt: 'Illustrated city skyline at dusk',
    showScrollCue: true,
  },

  // ABOUT US: starter copy is intentionally general; replace with approved details.
  about: {
    eyebrow: '01 / ABOUT JA-NEE',
    title: 'A place for the stories you bring.',
    introduction: 'Ja-Nee RP is a roleplay community with room for new characters, unexpected turns, and stories made together.',
    community: 'Every person arrives with a point of view. The best scenes leave space for others to shape what happens next.',
    philosophy: 'Bring intention to your character, curiosity to each scene, and respect for the people sharing the world.',
    expectations: 'Review the official rules and community guidance before you play. Add Ja-Nee RP’s specific expectations here.',
    experience: 'Your next chapter could start with one introduction, one conversation, or a decision you did not plan to make.',
    starterCopy: true,
    image: 'assets/images/story-map.svg',
    imageAlt: 'Abstract illustrated map of a city with connected story paths',
  },

  // FEATURES: these are examples only, not claims about the live server.
  features: [
    {
      number: '01',
      title: 'Community-led stories',
      description: 'Example copy: describe how players shape scenes and community life on Ja-Nee RP.',
      category: 'COMMUNITY',
      accent: 'gold',
      icon: 'spark',
      image: '',
      accentColor: '',
      isExample: true,
    },
    {
      number: '02',
      title: 'Room to build a life',
      description: 'Example copy: add confirmed details about civilian paths, businesses, or other opportunities.',
      category: 'LIFE IN THE CITY',
      accent: 'gold',
      icon: 'pin',
      image: '',
      accentColor: '',
      isExample: true,
    },
    {
      number: '03',
      title: 'Stories with stakes',
      description: 'Example copy: explain the kind of roleplay experience the server is designed to support.',
      category: 'ROLEPLAY',
      accent: 'gold',
      icon: 'arrow',
      image: '',
      accentColor: '',
      isExample: true,
    },
    {
      number: '04',
      title: 'A city still in motion',
      description: 'Example copy: share verified information about events, updates, or server development.',
      category: 'WHAT’S NEXT',
      accent: 'gold',
      icon: 'spark',
      image: '',
      accentColor: '',
      isExample: true,
    },
  ],

  // RULES: replace the illustrative sample rules with your official rules before publishing.
  rules: {
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

  // DISCORD: supply your own invite and server ID. No server details are assumed.
  discord: {
    inviteUrl: '',
    serverId: '',
    widgetEnabled: true,
    widgetTheme: 'dark',
    widgetWidth: 340,
    widgetHeight: 400,
    heading: 'Your next story starts with a hello.',
    message: 'Meet the Ja-Nee RP community, get the details you need, and find your way into the city.',
  },

  // SOCIAL LINKS: only entries marked enabled with a valid URL will appear.
  socials: [
    { name: 'TikTok', icon: 'tiktok', url: '', image: '', description: 'Short clips and moments from the city.', color: '#a8a4c7', enabled: false },
    { name: 'YouTube', icon: 'youtube', url: '', image: '', description: 'Videos, highlights, and community stories.', color: '#ff8668', enabled: false },
    { name: 'Instagram', icon: 'instagram', url: '', image: '', description: 'Scenes and updates from Ja-Nee RP.', color: '#e4a78e', enabled: false },
    { name: 'Facebook', icon: 'facebook', url: '', image: '', description: 'News and community updates.', color: '#9ebcde', enabled: false },
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
      overlayColor: '#0B3007',
      overlayOpacity: 0.28,
      gradient: 'linear-gradient(90deg, rgba(11, 48, 7, .96) 0%, rgba(11, 48, 7, .82) 45%, rgba(11, 48, 7, .36) 100%)',
      blur: 0,
    },
    about: {
      src: '',
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat',
      overlayColor: '#165209',
      overlayOpacity: 0.08,
      gradient: '',
      blur: 0,
    },
    features: { src: '', position: 'center', size: 'cover', repeat: 'no-repeat', overlayColor: '#0B3007', overlayOpacity: 0.25, gradient: '', blur: 0 },
    rules: { src: '', position: 'center', size: 'cover', repeat: 'no-repeat', overlayColor: '#165209', overlayOpacity: 0.1, gradient: '', blur: 0 },
    faqs: { src: '', position: 'center', size: 'cover', repeat: 'no-repeat', overlayColor: '#1D5D12', overlayOpacity: 0.1, gradient: '', blur: 0 },
    socials: { src: '', position: 'center', size: 'cover', repeat: 'no-repeat', overlayColor: '#165209', overlayOpacity: 0.1, gradient: '', blur: 0 },
    join: {
      src: 'assets/images/join-district.svg',
      position: 'center',
      size: 'cover',
      repeat: 'no-repeat',
      overlayColor: '#0B3007',
      overlayOpacity: 0.42,
      gradient: 'linear-gradient(110deg, rgba(11, 48, 7, .97) 4%, rgba(11, 48, 7, .86) 58%, rgba(11, 48, 7, .5) 100%)',
      blur: 0,
    },
    footer: { src: '', position: 'center', size: 'cover', repeat: 'no-repeat', overlayColor: '#0B3007', overlayOpacity: 0.1, gradient: '', blur: 0 },
    socialPreview: { src: 'assets/images/hero-city.svg' },
  },

  // CUSTOM CURSOR: keep disabled until your cursor pack has been added.
  cursor: {
    enabled: false,
    defaultImage: '',
    pointerImage: '',
    textImage: '',
    interactionImage: '',
    width: 28,
    height: 28,
    hotspotX: 3,
    hotspotY: 3,
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
    backToTopLabel: 'Back to top',
  },
}

export default siteConfig
