# Ja-Nee RP landing website

A responsive, single-page landing site for Ja-Nee RP, built with React and Vite. The visual direction is documented in **docs/DESIGN-CONCEPT.md**. The original style selection was randomized, then refined into a modern dark editorial design with a #165209 forest green identity, deep evergreen canvas, translucent raised panels, warm gold accents, rounded cards, glass blur, and a section navigator.

The project includes editable content and theme settings, responsive chapter layouts, mobile navigation, rules and FAQ accordions, a direct Discord invite, an honest FiveM status reader, reduced-motion support, local bundled fonts, and a GitHub Pages deployment workflow. Larger screens use gentle scroll snapping and a compact chapter navigator. Server-specific facts and links that were not supplied are left empty or marked as examples.

## Before publishing

The original project folder did not contain an existing site, Discord invite, server address, or social profiles. Before you announce the site:

1. Review the welcome copy and add any Ja-Nee RP details that the team has approved.
2. Replace or remove every sample rule and sample FAQ answer before treating those sections as official guidance.
3. Add the official Discord invite.
4. Configure a supported FiveM status endpoint if you want live status.
5. Add only verified social profile URLs.
6. Add your logo, cursor pack, and any preferred background images.
7. Add an absolute HTTPS URL for the Open Graph image after the site URL is known.

The page deliberately says UNKNOWN when no status source is configured or the status service cannot be reached.

## Requirements

Install Node.js 22.12 or newer. This project uses npm and the included package lock file.

## Download or clone

Once you have created a GitHub repository for this project, clone it with your repository URL:

~~~bash
git clone YOUR_REPOSITORY_URL
cd "Ja-Nee Website"
npm ci
~~~

Replace YOUR_REPOSITORY_URL with the URL for your own repository. If you are starting from the folder already on your computer, open a terminal in that folder and run npm install instead of cloning.

## Run the local preview

~~~bash
npm run dev
~~~

Open the local URL printed in the terminal, normally http://localhost:5173. Vite Hot Module Replacement updates the preview as you edit text, styles, images, or configuration. Most edits do not require a manual refresh.

## Checks and production preview

~~~bash
npm run lint
npm run build
npm run preview
~~~

The production build is written to the dist folder. The preview command serves that built site locally. The build creates a small version.json file used by the optional deployed-update notice. Visitors can dismiss that notice; the site never forces a refresh.

## The central settings file

Edit **src/config/siteConfig.js** for site changes. It contains the page metadata, palette, fonts, every section's text, navigation, section visibility, logos and images, social and invite links, FiveM status source, cursor art, motion, and footer content. The **copy** group contains shared interface labels and accessibility wording; longer paragraphs and headings live with their section data.

The **design** group controls the site-wide layout widths and gutters, desktop and mobile section spacing, hero and navigation sizing, text scale, corner radii, translucent surface colours, blur, shadows, and transition feel. For a one-off detail that has no named setting, add CSS to **design.cssOverrides** at the bottom of that group. Enter it as a JavaScript template string, for example:

~~~js
cssOverrides: `
  .feature-row { border-radius: 36px; }
  .hero { min-height: 92vh; }
`,
~~~

Those rules load after the built-in styles, so this gives you a final override for any element while keeping your customisation in the central file.

Starter About text is flagged by starterCopy. Feature examples use isExample. Sample rule categories and questions are grouped in arrays so you can add, remove, rename, and reorder them without editing component markup. A social appears as soon as it has a valid HTTP or HTTPS URL; set enabled to false to hide it without deleting its settings.

## Change the logo

1. Put your main logo in **public/assets/logos/**. SVG, PNG, WebP, or another browser-supported image format is suitable.
2. In the branding group in siteConfig.js, set logo to a path such as assets/logos/janee-logo.svg.
3. Set logoAlt, logoHeight, logoMaxWidth, and logoPosition to describe and size it.
4. Set alternativeLogo if you have a separate footer version. The footer uses it when present.

Leave logo empty to use the built-in Ja-Nee text mark. Keep asset filenames simple and use a web-ready image size.

## Add or replace images

Put artwork in **public/assets/images/** and point to its path in the images group. The included city and map SVGs are starter artwork. Replace them with compressed WebP, AVIF, or SVG files if you prefer.

Each background setting supports src, position, size, repeat, overlayColor, overlayOpacity, imageOpacity, gradient, and blur. The settings cover the hero, About, features, rules, FAQs, socials, and footer areas. A blank background path leaves the section’s colour and CSS styling in place. The About illustration has its own image path in the about group.

Other asset folders are ready for logos and custom interface icons. The site bundles Montserrat (including ExtraBold) and STIX Two Text in **src/assets/fonts/**, so headings and supporting text use the requested fonts without relying on a remote font service. Their SIL Open Font License notices are included beside the font files. If you replace either font, keep its filename or update the matching `@font-face` path in **src/styles/brand-overrides.css**. Vite includes these files in the production build, including when the site is published beneath a GitHub project URL.

## Change colours and copy

The theme group contains the main palette and font stacks. The default palette uses #165209 as its forest green, near-black evergreen page surfaces, lighter translucent green panels, and #D4AF37 gold accents. The default headers use STIX Two Text; Montserrat is used for supporting copy and controls, with ExtraBold emphasis on key subtext. The design group sits alongside it for layout and effect controls. The general group contains the browser title, site description, locale, favicon, theme colour, and Open Graph title, description, and image.

Edit the hero group for the intro heading, description, and buttons. Edit about for the community introduction and philosophy, featureSection for the experience heading, faqSection for FAQ headings, and rules for the rules heading and chapters. Set the official Discord invite URL in the discord group; its call-to-action and footer wording are in copy. The included About text is generic starter copy; set starterCopy to false after replacing it with approved wording. Set section visibility switches in sections to hide a complete section. Navigation entries are generated from the navigation list.

## Edit rules

Open the rules group in siteConfig.js. Each category has an id, label, and rules list. A rule can contain title, description, and note. Add, remove, or reorder items in those arrays. The category selector and accordion are generated from the data.

The bundled rule text is illustrative only. Replace it with Ja-Nee RP’s official rules before publishing. Set rules.starterNotice to your own short introduction when the examples have been reviewed. If a category has no rules, the page displays a clear empty state.

## Edit FAQs

Edit the faqs list in siteConfig.js. Each item supports category, question, answer, and isExample. The category filters and accordion are generated from that list. Replace each sample answer with verified information and set isExample to false or remove it.

## Add social links

Edit the socials list in siteConfig.js. Enter the official URL, platform name, icon name, description, and optional colour. A valid URL makes the card visible automatically; set enabled to false to temporarily hide an entry. Supported built-in icons are instagram, youtube, facebook, and tiktok. Social links open in a new tab. Empty or invalid URLs are not shown.

The Discord invite is configured separately in the discord group.

## Show the staff team

Save profile pictures in **public/assets/staff/** and add each person under `staffTeam.members` in **src/config/siteConfig.js** with a `name` and an `avatar` path, such as `assets/staff/staff-name.png`. You can also use a complete HTTPS avatar URL. Set `staffTeam.enabled` to `true` to show the row in the footer; leave it `false` to hide the roster. Names appear when visitors hover over or keyboard-focus an avatar, and remain visible on touch screens. Entries missing either a name or avatar are skipped.

## Configure the Discord invite

In the discord group in siteConfig.js:

- Set inviteUrl to the complete official Discord invite URL, beginning with https://.

The site does not embed a Discord server preview. Its invite button opens the configured invite in a new tab. Do not place bots, API secrets, or private credentials in this frontend project.

## Configure FiveM status

The fivem group in siteConfig.js contains serverIp, serverPort, statusApiEndpoint, directEndpointPath, refreshIntervalMs, timeoutMs, and showPlayerCount.

The default direct path is /dynamic.json. Cfx.re documents the public server information endpoint at /info.json and the dynamic server endpoint in its proxy guide. A browser request can still fail because of HTTPS mixed-content rules or CORS. GitHub Pages is served over HTTPS, so a plain HTTP FiveM endpoint may be blocked by the browser. For dependable deployed status, use a public HTTPS status endpoint or a small proxy you control, with CORS enabled. Do not put private API keys in siteConfig.js.

When statusApiEndpoint is set, it takes priority over the direct host. The response can use a status field with online, offline, restarting, or maintenance and optional players and maxPlayers values. It can also use players and capacity fields such as those returned by dynamic.json; those fields indicate online when the response is valid. An unreachable, timed-out, blocked, malformed, or unconfigured endpoint shows UNKNOWN. The page never guesses OFFLINE from a failed network request. The last successful update and player count are shown only when available.

## Configure the custom cursor

The Ja-Nee cursor pack is split into transparent default, hover, link-hand, and text caret images in **public/assets/cursors/**. It is enabled in the cursor group of **src/config/siteConfig.js**. Edit defaultImage, pointerImage, textImage, and interactionImage there to replace a state. The `hotspots` object aligns the arrow tip, link fingertip, and text caret with the actual pointer location; adjust each state’s x/y values if you replace the sprite artwork. Change width and height to resize all cursor states, or set enabled to false to restore the browser cursor.

The custom cursor is used only with a fine mouse pointer. It is hidden on touchscreen devices, does not intercept pointer events, and falls back to the default sprite if a state-specific image is not set. Text fields and selectable text use the text caret image; links use the link hand, and buttons use the green hover arrow.

## GitHub Pages deployment

The project includes **.github/workflows/deploy.yml**. It runs the lint check and production build, uploads the dist folder as the `github-pages` artifact, then publishes it from a separate job when you push to main or master. Keeping deployment in a dependent job avoids GitHub’s intermittent artifact lookup race. It can also be started manually from the repository’s Actions tab. The workflow uses GitHub Pages’ Actions deployment.

If you are publishing this folder for the first time:

1. Create an empty GitHub repository for the site.
2. In this project folder, initialise Git, commit the files, and connect the repository URL:

~~~bash
git init -b main
git add .
git commit -m "Create Ja-Nee RP website"
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
~~~

3. In the GitHub repository, open Settings, then Pages, and set the publishing source to GitHub Actions.
4. Open the Actions tab and check the latest “Build and deploy Ja-Nee RP website” run.
5. Use the page URL shown by the deployment after it succeeds.

The Vite configuration reads the GitHub repository from the Actions environment and sets the project-site base path. It also recognises the account-site repository format. If your default branch has another name, add it to the push.branches list in deploy.yml. After the initial push, each push to main or master runs checks, builds the static site, and deploys it. A custom domain and the absolute share-image URL must be configured with the actual domain after you know it.

## SEO and sharing

The browser title, description, theme colour, favicon, Open Graph title, description, type, and image are read from the general group. Vite writes these values into the built HTML so social crawlers can see them without running React. For a correct social preview, set openGraph.image to the full public HTTPS URL of your final social image once you know the deployed site URL. Use a compressed, well-sized image intended for sharing.

## Accessibility and motion

The site uses landmark elements, a skip link, labelled navigation, keyboard-focus indicators, semantic buttons, accordion state attributes, a live status region, and text labels in addition to colour. Scroll reveals, gentle desktop scroll snapping, glass blur, and the custom cursor respect reduced-motion and touch-device settings. Disable all motion through animations.enabled if you prefer.

## Troubleshooting

- **Status remains UNKNOWN:** Confirm the server host or HTTPS status endpoint, port, endpoint path, timeout, response format, CORS headers, and HTTPS compatibility. UNKNOWN is expected when the browser cannot confirm the source.
- **Discord invite button is unavailable:** Add a complete official HTTPS invite URL in the discord group.
- **An image is missing:** Check the filename and path relative to the public folder. Paths in siteConfig start with assets/, not public/.
- **GitHub Pages shows a blank page:** Check the Actions run and Pages source setting. Confirm the repository name is available to the workflow and the deployed artifact contains the built files.
- **GitHub Actions says “No artifacts named github-pages”:** Confirm the build job’s “Upload website” step succeeded. The deploy job waits for the build job so GitHub has time to register the uploaded artifact.
- **The workflow does not start:** Push to main or master, or add your branch name to deploy.yml.
- **A mobile menu remains open:** Use its menu button to close it; selecting a section link closes the menu automatically.
- **The custom cursor does not appear:** Confirm the image path and enabled flag, then test with a mouse on a desktop-sized pointer. It is hidden on touchscreen devices.

## Project structure

~~~text
public/
  assets/
    cursors/
    fonts/
    icons/
    images/
    logos/
    staff/
src/
  assets/fonts/
  components/
  config/siteConfig.js
  sections/
  styles/
  utils/
.github/workflows/deploy.yml
docs/DESIGN-CONCEPT.md
index.html
package.json
vite.config.js
~~~

For a live server, Discord server details, approved rules, official social links, and branding assets, use only the values supplied by the Ja-Nee RP team.
