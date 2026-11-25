# Publish Ja-Nee RP from GitHub to Hyper Layer cPanel

This project is a static React/Vite website. GitHub Actions builds it, then uploads the finished `dist/` folder to the primary cPanel destination over FTPS. An optional second destination can receive another copy. GitHub remains the place where you edit, review, and keep the source code. cPanel serves the built files on your custom domain.

The cPanel account does not need Node.js, React, Git, or a database to serve the finished website. The build runs on GitHub’s runner. The deployment workflow does not upload `src/`, `.git/`, `node_modules/`, or your FTP credentials.

## Important hosting details to confirm

Hyper Layer’s public web-hosting page lists cPanel, FTP access, and free SSL. It does not specify the FTP server hostname, FTPS mode, port, or your domain’s document root. Get those exact values from your Hyper Layer welcome email or support before enabling live uploads. The workflow defaults to explicit FTPS (`ftps`) on port `21`. If Hyper Layer confirms a different secure FTPS mode, set the corresponding GitHub variable. If the account only offers plain, unencrypted FTP, ask Hyper Layer about FTPS or SFTP rather than sending the password over plain FTP.

If the custom domain is an additional domain on the hosting account, confirm the plan permits it. Keep the existing website backed up, and use a separate document root if that domain already has a site.

## 1. Add the domain and identify its document root

1. Sign in to Hyper Layer’s cPanel.
2. Open **Domains**. If the domain is not already listed, add it there. Choose a separate document root for this site rather than sharing another domain’s root.
3. Note the exact document-root folder cPanel shows. The primary domain often uses `public_html`; an additional domain usually has a separate folder. Use the value shown in your account instead of assuming a path.
4. If possible, create a temporary subdomain such as `preview.yourdomain.com` with its own empty document root first. You can test the deployment there before switching the production domain.

The site uses one page with section anchors (such as `#rules` and `#faqs`), so it does not need a server rewrite rule for client-side routes.

## 2. Point DNS and enable HTTPS

1. Ask Hyper Layer for the DNS records or nameservers for your hosting account. Do not guess the server IP.
2. At the domain’s DNS provider, point the root domain and `www` to the values Hyper Layer specifies. If you change nameservers, first copy any existing email-related MX and TXT records (SPF, DKIM, and DMARC) so domain email is not interrupted.
3. Wait until Hyper Layer can see the domain resolving to its hosting server.
4. In cPanel, open **SSL/TLS Status** and check that AutoSSL has issued a certificate for the root domain and `www` name you intend to use. Hyper Layer advertises free SSL with its web hosting.
5. Confirm the domain opens over `https://` before announcing it. Enable cPanel’s HTTPS redirect only after the certificate is active.

Do not remove or overwrite an existing live site until you have a backup and confirmed the new document root is correct.

## 3. Create a dedicated cPanel FTP account

1. In cPanel, open **FTP Accounts** and create a new account just for this deployment. Do not use your main cPanel login.
2. Set the FTP account’s directory to the domain’s document root from step 1. This limits the account’s access to this website.
3. Use a new, strong FTP password and keep it in a password manager. You will enter it into GitHub Secrets in the next step, not into any project file.
4. Record the FTP hostname, username, secure protocol, and port supplied by Hyper Layer. The hostname is usually a server name, not a URL; do not add `ftp://` or `https://` unless Hyper Layer explicitly tells you to.
5. When the FTP account is restricted to the document root, the deployment directory is usually `./`. If the host gives a different path relative to the FTP login, use that exact path. The directory value must end with `/`.

## 4. Add GitHub Actions secrets and variables

Open the GitHub repository **Settings → Secrets and variables → Actions**. Add these **repository secrets**:

| Secret | Value |
| --- | --- |
| `CPANEL_FTP_HOST` | FTP hostname provided by Hyper Layer |
| `CPANEL_FTP_USERNAME` | Dedicated FTP username |
| `CPANEL_FTP_PASSWORD` | Password for that FTP account |

Then add these **repository variables**:

| Variable | Initial value | Purpose |
| --- | --- | --- |
| `CPANEL_DEPLOY_ENABLED` | `false` | Keeps uploads disabled while you prepare the domain and credentials. |
| `CPANEL_DEPLOY_DRY_RUN` | `true` | Makes the first connection check list the intended file changes without uploading them. |
| `CPANEL_FTP_PROTOCOL` | `ftps` | Secure explicit FTPS. Use another value only if Hyper Layer confirms the mode: `ftps-legacy` for implicit FTPS. |
| `CPANEL_FTP_PORT` | `21` | Replace this with the port Hyper Layer provides. Implicit FTPS commonly uses `990`, but confirm it with the host. |
| `CPANEL_FTP_SERVER_DIR` | `./` | Path to the document root relative to the FTP account’s starting folder; keep the final `/`. |
| `CPANEL_FTP_SECONDARY_SERVER_DIR` | Leave unset to skip | Optional second upload folder, also relative to the FTP account’s starting folder; keep the final `/`. |

Do not add the cPanel password to `siteConfig.js`, the workflow file, or the README. GitHub masks Actions secrets in logs; the workflow references them only as secrets. If you ever expose the FTP password, change it in cPanel and update the GitHub secret.

## 5. Run a safe deployment preview

1. Leave `CPANEL_DEPLOY_ENABLED` set to `false` until all three secrets and the path/protocol variables are saved. Push the prepared changes to GitHub; the workflow will lint and build the site, then report that cPanel upload is still disabled.
2. Confirm the build succeeds in the repository’s **Actions** tab.
3. When you are ready to test the server connection, set `CPANEL_DEPLOY_ENABLED` to `true` and leave `CPANEL_DEPLOY_DRY_RUN` set to `true`.
4. Open **Actions → Build and deploy Ja-Nee RP to cPanel → Run workflow** and run it on `main`. Review the primary upload step. If you set `CPANEL_FTP_SECONDARY_SERVER_DIR`, review the optional second-upload step too. Each should list the intended files and destination without changing the website.
5. If either step cannot connect, check the hostname, FTP username, password, secure mode, port, and server directory with Hyper Layer. Keep dry-run enabled until each configured preview points to its intended folder.

The action does not use its “clean slate” option. Even so, the document root must be dedicated to this site: deploying replaces files with matching names, and files left over from an unrelated prior site may remain. Do not point it at a directory containing another website.

## 6. Publish the first live version

1. Set `CPANEL_DEPLOY_DRY_RUN` to `false`.
2. Leave `CPANEL_DEPLOY_ENABLED` set to `true`.
3. Run the workflow manually once from the `main` branch, or push a reviewed commit to `main`.
4. Wait for the Actions run to show the build and FTPS upload succeeded.
5. Open the custom domain over HTTPS. Check desktop and mobile layout, images, fonts, Discord link, social links, and the launch screen if enabled.
6. If you deployed to a preview subdomain, change `CPANEL_FTP_SERVER_DIR` to the production domain’s document root, run a dry-run again, then run the live deployment.
7. After the cPanel site is confirmed, remove the old GitHub Pages custom-domain setting in **Settings → Pages** if one was previously configured. Update or remove DNS records that still point the production domain at GitHub Pages. You can disable Pages if you no longer want it as a separate preview.

After this, every push to `main` or `master` runs lint and build. If both succeed and `CPANEL_DEPLOY_ENABLED` remains `true`, GitHub Actions uploads the new `dist/` files to the primary destination and, if configured, the secondary destination. You can also start an upload manually from **Actions**.

The build includes `public/.htaccess` as a hidden file in the document root. On Apache hosting, it prevents browsers from holding on to old `index.html` and `version.json` responses, while long-cache fingerprinted build assets remain safe because each build gives them a new filename. The page checks for a new version every 15 seconds and offers a refresh button after the upload has completed; it does not reload visitors without asking. If the notice does not appear, enable **Show Hidden Files** in cPanel File Manager and confirm `.htaccess` is beside `index.html`. A separate host or proxy cache may need to be cleared independently.

## 7. Edit, publish, and roll back

Make changes in this repository, not in the deployed `dist/` output. For content and design edits, use `src/config/siteConfig.js`; for layout or interactions, edit the corresponding files in `src/`. Preview locally with:

~~~bash
npm ci
npm run dev
~~~

Before publishing, run:

~~~bash
npm run lint
npm run build
~~~

Commit and push reviewed work to the connected branch, for example:

~~~bash
git status
git add -A
git commit -m "Update Ja-Nee RP website"
git push origin main
~~~

If a bad change is already live, revert its commit and push the revert. That preserves history and automatically republishes the previous working content through the same workflow. You can also rerun a successful earlier Actions deployment if you need to restore the exact files from that run.

## Notes on the deployment design

- GitHub is the source repository; cPanel is the static-file host. Treat cPanel’s document root as generated output, not as the editable source tree.
- The primary destination stays `./` for an FTP account whose starting folder is the website’s `public_html` root. If that account starts in `public_html`, `janeerp.co.za/` as the secondary destination uploads a copy into `/public_html/janeerp.co.za/`.
- The secondary destination is another public copy of the current build, not a historical backup. It does not preserve prior versions for recovery, and visitors may be able to open it under the matching URL path.
- The workflow builds on GitHub with `VITE_BASE_PATH=/`, so hashed JavaScript, CSS, fonts, and images resolve from the custom domain root.
- The FTP deployment action is pinned to the exact upstream commit for v4.4.0. Review and deliberately update that pin when adopting a newer release.
- Each configured upload target receives `dist/` only. The workflow does not upload the React source or run `npm install` on Hyper Layer.
- The current rulebook PDF is about 9.9 MB and is included in `dist/`. Visitors download it only if they open the Rules link; it is not part of the page’s initial download.
- The workflow does not use GitHub Pages’ artifact upload/deploy steps, which avoids the Pages artifact handoff that caused earlier failures.
- GitHub Actions uses FTPS (encrypted FTP) by default. Hyper Layer’s public page confirms FTP access but not the exact TLS mode, host, or port; verify those with the provider before turning deployment on.
- If Hyper Layer offers only SFTP/SSH and not FTPS, stop before enabling uploads and ask for an SFTP-specific workflow. Do not place a cPanel password in repository code or use unencrypted FTP.

## References

- [Hyper Layer web-hosting features](https://billing.hyperlayer.net/store/web-hosting)
- [cPanel FTP Accounts](https://docs.cpanel.net/cpanel/files/ftp-accounts/)
- [cPanel Domains](https://docs.cpanel.net/cpanel/domains/domains/)
- [cPanel deployment setup](https://docs.cpanel.net/knowledge-base/web-services/guide-to-git-set-up-deployment/)
- [GitHub Actions secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
- [GitHub Actions secure-use guidance](https://docs.github.com/en/actions/reference/security/secure-use)
- [FTP Deploy Action usage and FTPS settings](https://github.com/SamKirkland/FTP-Deploy-Action)
