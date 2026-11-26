# Ja-Nee RP landing website

A responsive, single-page landing site for Ja-Nee RP, built with React and Vite. The visual direction is documented in **docs/DESIGN-CONCEPT.md**. The original style selection was randomized, then refined into a modern dark editorial design with a #165209 forest green identity, deep evergreen canvas, translucent raised panels, warm gold accents, rounded cards, glass blur, and a section navigator.

The project includes editable content and theme settings, responsive chapter layouts, mobile navigation, rules and FAQ accordions, a direct Discord invite, an honest FiveM status reader, reduced-motion support, local bundled fonts, and a GitHub Actions workflow for cPanel deployment. Larger screens use gentle scroll snapping and a compact chapter navigator. Server-specific facts and links that were not supplied are left empty or marked as examples.

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

The production build is written to the dist folder. The preview command serves that built site locally. The build creates a small version.json file used by the deployed-update notice. Visitors are prompted within 15 seconds of a new successful deployment and choose when to refresh; the site never reloads while they are reading. Set `updates.enabled` or `updates.checkIntervalMs` in `siteConfig.js` to change this behavior. Live changes still need the GitHub build and cPanel upload to finish; for immediate editing feedback, use the local Vite preview above.

For the cPanel version, use `npm run build:cpanel`. It adds the PHP FiveM status relay to `dist/api/`; the GitHub deploy workflow uses this command automatically. `npm run dev` uses Vite’s local proxy for status testing. `npm run preview` is a static file preview and cannot execute the PHP relay.

For cPanel, `public/.htaccess` is copied into the build root. It prevents stale copies of `index.html` and `version.json` from being reused, gives fingerprinted build assets long-lived caching, and keeps ordinary assets on a short revalidation interval. If the host or a separate proxy has its own cache, that cache may also need clearing after a deploy.

## The central settings file

Edit **src/config/siteConfig.js** for site changes. It contains the page metadata, palette, fonts, every section's text, navigation, section visibility, logos and images, social and invite links, FiveM status source, cursor art, motion, launch announcement, pixel mascot, staff team, and footer content. The `statusSection` settings control the dedicated live-status chapter and its state glow; `copy.status.buttonLabel` controls the status button above the home logo. Each major group has a comment explaining what it controls, and the launch and mascot options are documented next to their settings.

The **design** group controls the site-wide layout widths and gutters, desktop and mobile section spacing, hero and navigation sizing, text scale, corner radii, translucent surface colours, blur, shadows, and transition feel. For a one-off detail that has no named setting, add CSS to **design.cssOverrides** at the bottom of that group. Enter it as a JavaScript template string, for example:

~~~js
cssOverrides: `
  .feature-row { border-radius: 36px; }
  .hero { min-height: 92vh; }
`,
~~~

Those rules load after the built-in styles, so this gives you a final override for any element while keeping your customisation in the central file.

Starter About text is flagged by starterCopy. Feature examples use isExample. Rules and FAQ entries are grouped in arrays so you can add, remove, rename, and reorder them without editing component markup. A social appears as soon as it has a valid HTTP or HTTPS URL; set enabled to false to hide it without deleting its settings.

## Change the logo

Put the logo anywhere inside **src/assets/**, including nested folders, and set `branding.logo` to its path relative to that folder, such as `assets/logos/JA·NEE Roleplay Logo.png`. A unique filename also works without its folder path. Tune `logoHeight`, `logoMaxWidth`, and `logoPosition` in the branding group. Files in **public/assets/** can also be used by entering their web path, such as `assets/logos/logo.png`. Leave `logo` empty to use the built-in text mark.

## Add or replace images

Put artwork anywhere under **src/assets/** or **public/assets/** and point to it in the matching image field in the config. Source assets are discovered recursively, so nested folders work; use the project path (for example, `assets/scenes/city.webp`) or a unique filename. Files in `public/assets/` use their public path (for example, `assets/images/hero-city.svg`). Adding an image makes it available to the site; choose the setting where it should appear. The included city and map SVGs are starter artwork.

Each background setting supports src, position, size, repeat, overlayColor, overlayOpacity, imageOpacity, gradient, and blur. The settings cover the home hero, About, features, rules, FAQs, socials, and footer areas. To change the home backdrop, set `images.hero.src` to the path of an image under `src/assets/` or `public/assets/`. The homepage blurs that image, layers a restrained forest tint over it, and adds a soft glow matching the current server state. Change `images.hero.blur`, `gradient`, or the overlay fields to tune the effect. A blank background path leaves the section’s colour and CSS styling in place. The About illustration has its own image path in the about group.

Other asset folders are ready for logos and custom interface icons. The site bundles Montserrat (including ExtraBold) and STIX Two Text in **src/assets/fonts/**, so headings and supporting text use the requested fonts without relying on a remote font service. Their SIL Open Font License notices are included beside the font files. If you replace either font, keep its filename or update the matching `@font-face` path in **src/styles/brand-overrides.css**. Vite includes these files in the production build, including when the site is published beneath a GitHub project URL.

## Change colours and copy

The theme group contains the main palette and font stacks. The default palette uses #165209 as a forest-green accent, charcoal and near-black page surfaces, neutral glass panels, and #D8B66A warm-gold accents. The default headers use STIX Two Text; Montserrat is used for supporting copy and controls, with ExtraBold emphasis on key subtext. The design group sits alongside it for layout and effect controls. The general group contains the browser title, site description, locale, favicon, theme colour, and Open Graph title, description, and image.

Edit the hero group for the intro heading, description, and buttons. Edit `statusSection` for the new second-chapter heading, description, section number, and glow colours, and set `sections.status` to show or hide it. Edit about for the community introduction and philosophy, featureSection for the experience heading, faqSection for FAQ headings, and rules for the rules heading and chapters. Set the official Discord invite URL in the discord group; its call-to-action and footer wording are in copy. The included About text is generic starter copy; set starterCopy to false after replacing it with approved wording. Set section visibility switches in sections to hide a complete section. Navigation entries are generated from the navigation list.

## Edit rules

Open the `rules` group in **src/config/siteConfig.js**. Each category has an id, label, and rules list. A rule can contain title, description, and note. Add, remove, or reorder items in those arrays. The category selector and accordion are generated from the data. Example badges are not shown in the Rules or FAQ accordions.

To link a separate full rulebook, place the PDF in **src/assets/** or **public/assets/** and set `rules.documentUrl` to its path, for example `assets/rules/Ja-Nee-RP-Rulebook.pdf`. The “Read the complete rules” button appears when this field is set and opens the file in a new tab. Leave it blank to hide the button. The on-page categories can stay concise while the complete document lives in the file.

## Edit FAQs

Edit the `faqs` list in **src/config/siteConfig.js**. Each item supports category, question, and answer. The category filters and accordion are generated from that list. Example badges are no longer displayed.

## Add social links

Edit the socials list in siteConfig.js. Enter the official URL, platform name, icon name, description, and optional colour. A valid URL makes the card visible automatically; set enabled to false to temporarily hide an entry. Supported built-in icons are instagram, youtube, facebook, and tiktok. Social links open in a new tab. Empty or invalid URLs are not shown.

The Discord invite is configured separately in the discord group.

## Show the staff team

Save profile pictures in **src/assets/staff/** or **public/assets/staff/** and add each person under `staffTeam.members` in **src/config/siteConfig.js** with a `name` and an `avatar` path, such as `assets/staff/staff-name.png`. Files in `src/assets/staff/` are bundled and fingerprinted in the production build; files in `public/assets/staff/` are copied as-is. You can also use a complete HTTPS avatar URL. Set `staffTeam.enabled` to `true` to show the row in the footer; leave it `false` to hide the roster. Names appear when visitors hover over or keyboard-focus an avatar, and remain visible on touch screens. Entries missing either a name or avatar are skipped.

## Announce a launch

Leave `enabled` as `false` while you edit and preview the site. When the launch screen is ready for visitors, set it to `true` and push the change. Set `launchAt` to a future local date and time with its UTC offset, such as `2026-12-01T18:00:00+02:00` for South Africa.

Choose `mode` to control what visitors see:

- `timer`: the candle and countdown only.
- `message`: the candle, title, message, and links, with no countdown. This is useful before the launch date is decided.
- `both`: the candle, title, message, countdown, and links.

For example, set `enabled: true`, `mode: "both"`, and use a valid date such as `2026-12-01T18:00:00+02:00` in `launchAt`. The current value in `siteConfig.js` is a temporary test deadline of `2026-11-26T02:20:00+02:00`; replace it with the confirmed launch time before the real launch. A malformed or missing date hides the countdown, so keep the `T`, hour, minutes, seconds, and a valid timezone offset. For a quick test, set `launchAt` to any valid date/time about five minutes ahead; there is no minimum lead time. If the test date passes, the launch screen is treated as complete, so choose a new future date before testing again. When a valid countdown reaches zero, the page reloads and automatically shows the normal website; the expired date also keeps the launch screen hidden for visitors who arrive later. No config edit is needed at expiry. A message-only announcement stays visible until you turn `enabled` off. The timer uses the visitor’s clock, so the date must include the correct offset. `discordUrl` can override the main invite for this screen; leave it blank to use the `discord.inviteUrl` setting. Turn `showDiscordLink` off if you want to hide that link. Add `{ label: "Rules", url: "https://..." }` entries to `launch.links` for additional buttons beside Discord; only valid HTTP or HTTPS links are shown. Countdown labels are editable in `copy.launch`. The candle continues to animate.

`launch.candleBurnMinutes` controls how many final minutes the candle takes to burn down. It stays full until that burn window, then shortens gradually with the countdown. The default is 15 minutes; set it to match the countdown window you want to preview or use for launch.

## Configure the pixel mascot

The supplied mascot sheets are included as transparent local images in **public/assets/mascot/**, with the emote poses in **public/assets/mascot/emotes/**. The `mascot` group in **src/config/siteConfig.js** controls whether he appears, his walking images, desktop and mobile size, visit timing, and the weight of every action. Its `actionSprites` map lets you replace each pose image and tune its width ratio. The default first appearance is after 3.5–7 seconds; later visits are spaced 38–72 seconds apart. Each visit lasts roughly 10–13 seconds including his walk in and walk away. Set `respectReducedMotion` to `true` if you want him hidden for visitors whose device requests reduced motion.

His pose set now includes waving, roasting a marshmallow, pointing left or right, thumbs up or down, sitting, leaning, crossing his arms, dancing, cheering, shrugging, laughing, flexing, talking, facepalming, sleeping, and sitting by the fire. CSS gestures add saluting, stretching, thinking, and reading. Each action has several randomized lines in `copy.mascot`; the pixel speech bubbles use a local 5×7 bitmap font with letters, numbers, and common punctuation. He never clicks links or blocks the visitor’s pointer. Turn an action’s `...Enabled` option off to remove it; adjust its matching `...Weight` value to change its chance of appearing. Set `mascot.enabled` to false to hide him completely. Replace any action sprite in `mascot.actionSprites` with another file under **public/** (use a path beginning with `assets/`) and adjust `widthRatio` if its shape differs. The helper resolves these assets for a root domain or a cPanel subfolder.

The top-level `audio` group controls the click sounds. `interfaceClicksEnabled` plays a soft synthesized click on pointer/tap and keyboard activation, while `countdownClicksEnabled` plays one short tick each time the displayed countdown changes. The countdown is a normal timer in compact, rounded tiles. When its values change together, they share one tick; the sound engine also prevents a second sound from overlapping the first. Adjust each volume from `0` (silent) to `1` (full), or set `enabled` to `false` to turn all site sounds off. Browsers only permit audio after a visitor interaction, so countdown ticks begin after their first click, tap, or keyboard activation.

## Configure the Discord invite

In the discord group in siteConfig.js:

- Set inviteUrl to the complete official Discord invite URL, beginning with https://.

The site does not embed a Discord server preview. Its invite button opens the configured invite in a new tab. Do not place bots, API secrets, or private credentials in this frontend project.

## Configure FiveM status

The fivem group in siteConfig.js contains `serverIp`, `serverPort`, `cfxJoinCode`, `cfxApiBaseUrl`, `statusApiEndpoint`, `directEndpointPath`, `refreshIntervalMs`, `timeoutMs`, and `showPlayerCount`. The current Ja-Nee CFX join code is `4gbdm99`; update it if the server’s public CFX join link changes. The endpoint path is `api/fivem-status.php` (keep it relative, without a leading slash) so it works both at the domain root and in the optional `janeerp.co.za/` backup folder.

FiveM’s `dynamic.json` is an HTTP endpoint. A browser page served over HTTPS may not be allowed to fetch it directly because of mixed-content restrictions, and direct cross-origin requests can also fail CORS checks. The site therefore asks its own same-origin PHP endpoint for status. The build script packages that endpoint from this config file. It first checks the CFX server listing over HTTPS using `cfxJoinCode`, then falls back to `dynamic.json` at the configured IP and port. It only returns the server name/player counts needed by the page; it does not relay the full CFX response. cPanel needs PHP and outbound HTTPS access for the CFX lookup. No license key or API credential is required in this website project.

During `npm run dev`, Vite proxies the direct configured URL to `directEndpointPath` on your FiveM host, so the local website can check the live response without browser CORS. A static `npm run preview` server and GitHub Pages cannot execute the PHP endpoint; for deployed status, use the cPanel build and upload workflow. The PHP relay only calls the fixed CFX base URL/code and fixed server address configured in siteConfig.js; it never accepts a host or join code from a request, so it is not an open proxy.

The relay returns `status: online` with player counts when the CFX listing or direct endpoint provides recognizable server data. Failed, timed-out, blocked, malformed, or unlisted responses show UNKNOWN; the page never guesses OFFLINE from a failed network request. The last successful update and player count are shown only when available. Player labels, capacity labels, and fallback descriptions for each verified state are in `copy.status` in `siteConfig.js`. You can test the API directly by visiting `https://your-domain.example/api/fivem-status.php`; the response should be JSON with `status`, `players`, and `maxPlayers`. For the backup subfolder, add `/janeerp.co.za/` before `api/` in that URL.

The CFX single-server listing endpoint is not guaranteed as a stable public API and can change. Cfx staff recommend querying the server’s own `info.json`/`dynamic.json` endpoints; this relay keeps that direct query as a fallback. If CFX changes the listing API and the host still cannot reach the game port, status will return UNKNOWN until the connection path is changed. See [Cfx’s note about the server-list endpoint](https://forum.cfx.re/t/what-happened-to-the-fivem-server-single-endpoint/5329241).

The status card is in the dedicated Server Status section immediately after the homepage. That card also shows the F8 command `connect cfx.re/join/<code>` and a direct CFX join link, both generated from `fivem.cfxJoinCode`; change that one setting to update both. While `launch.enabled` is true, `launch.mode` is `message`, and that announcement is active, the launch page intentionally hides the normal website, including its status and join command.

## Configure the custom cursor

The Ja-Nee cursor pack is split into transparent default, hover, link-hand, and text caret images in **public/assets/cursors/**. It is enabled in the cursor group of **src/config/siteConfig.js**. Edit defaultImage, pointerImage, textImage, and interactionImage there to replace a state. The `hotspots` object aligns the arrow tip, link fingertip, and text caret with the actual pointer location; adjust each state’s x/y values if you replace the sprite artwork. Change width and height to resize all cursor states, or set enabled to false to restore the browser cursor.

The custom cursor is used only with a fine mouse pointer. It is hidden on touchscreen devices, does not intercept pointer events, and falls back to the default sprite if a state-specific image is not set. Text fields and selectable text use the text caret image; links use the link hand, and buttons use the green hover arrow.

## Publish to Hyper Layer cPanel

The GitHub repository is the source of truth. **.github/workflows/deploy.yml** runs the lint check, builds the site for the root of a custom domain, and can upload only the finished **dist/** files to cPanel over FTPS. It does not upload your source files, Git history, or `node_modules`. The site is static, so cPanel does not need to run Node.js or a database.

The upload is disabled until you add the cPanel connection details in GitHub and set `CPANEL_DEPLOY_ENABLED` to `true`. `CPANEL_FTP_SERVER_DIR` is the primary destination; an optional `CPANEL_FTP_SECONDARY_SERVER_DIR` can send a second copy to another folder, such as `janeerp.co.za/` when the FTP account starts in `public_html`. That second copy is public and is not a versioned recovery backup. For the complete domain, cPanel, GitHub, first-deploy, and rollback instructions, follow **[docs/CPANEL-DEPLOYMENT.md](docs/CPANEL-DEPLOYMENT.md)**. The workflow can be run manually from GitHub Actions or automatically on pushes to `main` or `master`.

The Vite configuration continues to use a repository subpath for GitHub Pages builds. The cPanel workflow sets `VITE_BASE_PATH=/`, so the same site and asset paths work at the root of your custom domain. The workflow no longer creates GitHub Pages artifacts.

## SEO and sharing

The browser title, description, theme colour, favicon, Open Graph title, description, type, and image are read from the general group. Vite writes these values into the built HTML so social crawlers can see them without running React. For a correct social preview, set openGraph.image to the full public HTTPS URL of your final social image once you know the deployed site URL. Use a compressed, well-sized image intended for sharing.

## Accessibility and motion

The site uses landmark elements, a skip link, labelled navigation, keyboard-focus indicators, semantic buttons, accordion state attributes, a live status region, and text labels in addition to colour. Scroll reveals, gentle desktop scroll snapping, glass blur, and the custom cursor respect reduced-motion and touch-device settings. Disable all motion through animations.enabled if you prefer.

## Troubleshooting

- **Status remains UNKNOWN:** Confirm the cPanel endpoint opens as JSON, PHP is enabled, `cfxJoinCode` matches the current public CFX join link, and outbound HTTPS is available. The relay then tries the configured `serverIp`/`serverPort` direct endpoint. UNKNOWN is expected when neither source can confirm the server.
- **Status card is not visible:** The card appears on the normal homepage hero. Set `launch.enabled` to `false` temporarily to reveal the homepage while testing.
- **Discord invite button is unavailable:** Add a complete official HTTPS invite URL in the discord group.
- **An image is missing:** Check the filename and path relative to the public folder. Paths in siteConfig start with assets/, not public/.
- **cPanel did not update:** Check that `CPANEL_DEPLOY_ENABLED` is exactly `true`, `CPANEL_DEPLOY_DRY_RUN` is `false`, the cPanel secrets are set, and the FTPS hostname, protocol, port, and document-root path match Hyper Layer’s details. Inspect the “Upload built website to cPanel over FTPS” step in the Actions run.
- **The page still shows old content after a successful deploy:** Wait for the update notice (normally within 15 seconds) and select **Refresh**, or reload the page. In cPanel File Manager, enable **Show Hidden Files** and confirm `.htaccess` is beside `index.html`; clear any separate host or proxy cache if one is enabled.
- **The deployed site has a blank page or missing files:** Confirm `CPANEL_FTP_SERVER_DIR` is the domain’s document root and ends in `/`; it should not point at the repository directory. Check that the built assets were uploaded alongside `index.html`.
- **The main site updates but the secondary folder does not:** Add `CPANEL_FTP_SECONDARY_SERVER_DIR` as a repository variable with the folder path relative to the FTP account’s starting directory, then confirm the optional second-upload step succeeded in Actions.
- **The custom domain does not open over HTTPS:** Confirm its DNS records point to the Hyper Layer hosting service, then check cPanel’s SSL/TLS Status and AutoSSL state.
- **The workflow says FTPS authentication or connection failed:** Verify the host’s exact FTP hostname, username, password, supported FTPS mode, and port with Hyper Layer. Do not change the protocol to unencrypted FTP to work around an error.
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
    mascot/
    staff/
src/
  assets/
    fonts/
    staff/
  components/
  config/siteConfig.js
  sections/
  styles/
  utils/
.github/workflows/deploy.yml
docs/CPANEL-DEPLOYMENT.md
docs/DESIGN-CONCEPT.md
index.html
package.json
vite.config.js
~~~

For a live server, Discord server details, approved rules, official social links, and branding assets, use only the values supplied by the Ja-Nee RP team.
