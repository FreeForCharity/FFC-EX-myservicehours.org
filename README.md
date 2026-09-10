# FFC-EX-myservicehours.org

Static GitHub Pages site for **My Service Hours** (myservicehours.org), migrated from a live
self-hosted WordPress site (Hostinger) as part of the Free For Charity WordPress-to-Pages
migration (Wave 1, epic
[FFC-Cloudflare-Automation#702](https://github.com/FreeForCharity/FFC-Cloudflare-Automation/issues/702)).

Built on the [FFC Footer-Only Template](https://github.com/FreeForCharity/FFC-IN-Footer_Only_Template)
(Next.js App Router, static export) rather than a raw HTML capture — the captured WordPress
content was converted into real `src/app` routes instead of being dropped into `public/`.

## What this is

The live source (`myservicehours.org`) is a volunteer-hour tracking web application (Elementor +
BuddyPress-style account features on a WordPress/Sparkling theme), not a content marketing site.
Its real, non-account-gated content is small:

- **Home** (`/`) — the site's actual headline and mission copy, plus links out to the two
  volunteer-coordinator networks the live site itself linked to.
- **Tutorials** (`/tutorials`) — the two coordinator/volunteer walkthrough videos published on
  the live site (`myservicehours.org/tutorials/`), as click-to-load embeds so no third-party
  iframe loads until a visitor opts in.
- The FFC policy-page suite (privacy, cookies, terms, donation policy, vulnerability disclosure,
  security acknowledgements), each pointing at this site's own identity via
  `src/lib/site.config.ts`.

### Scope decision: dynamic / account-backed pages were dropped, not faked

The live sitemap and REST inventory (union: 29 URLs) included a large set of pages that exist
only to gate WordPress account features — sign-up, login, registration, group membership,
activity feeds, a live leaderboard of real people's names and volunteer hours, per-location
member rosters, and a PVSA-hours import tool. None of these can function on a static host, and
several (`/leaderboard/`, `/location/*`) render other people's personal data that would go stale
and misleading the moment it was frozen into a static page. These were **dropped, with their
nav/footer links removed** rather than shipped as broken or fake-functional pages:

`/sign-up/`, `/register/`, `/register-coordinator/`, `/login/`, `/login-2/`, `/activate/`,
`/profile/`, `/groups/`, `/members/`, `/activity/`, `/leaderboard/`, `/import-pvsa-hours/`,
`/location/*` (7 sub-pages), `/test/` (an admin scratch page carrying only an unrendered
shortcode).

Two more pages were dropped for a different reason — they carried no real content at all: the
unedited WordPress "Sample Page" placeholder, and an empty `/team/` page (this site's own team
page rendered no content on the live source, so no team roster is fabricated here either — see
`src/data/team.ts`). `/newsletter/`, `/jet-cincinnati/`, and `/jet-usa/` were also dropped: each
rendered only an unprocessed plugin shortcode or was empty, and none were linked from the live
site's own navigation.

The two **coordinator network links** in the live nav (`vtsworld.org/locations`,
`jetusa.org/locations`) are genuinely external services, not this site's own account system —
those are kept as external links on the Home page and in the footer, per the migration runbook's
"external service stays external" rule.

Full source-inspection notes and this scope decision are recorded on the tracking issue,
[FFC-EX-myservicehours.org#14](https://github.com/FreeForCharity/FFC-EX-myservicehours.org/issues/14).

### Footer standard: Level 1

No validated EIN or 501(c)(3) determination exists for this charity yet, and none is fabricated
here. The footer ships at **Level 1** (footer-standard-adoption-checklist): the GuideStar/Candid
endorsement block and the "US 501(c)(3) Non Profit" status line are omitted entirely — see
`siteConfig.ein` / `siteConfig.guidestar` in `src/lib/site.config.ts`, and the conditional
rendering in `src/components/footer/index.tsx`. This flips to Level 2 automatically once a
validated EIN is added. The footer's contact email/phone use Free For Charity's own operational
contact as the interim channel (FFC administers this deployment during Wave-1 migration); no
physical address or social-media links are shown, since none exist for this charity and showing
Free For Charity's own would misattribute them.

### Fully localized assets

Every same-domain asset from the live WordPress capture (images, the site logo) is served from
this repository. **No Google Fonts CSS reference ships either** — fonts are self-hosted via
`next/font/google` at build time, so there is no runtime request to `fonts.googleapis.com` for
the app itself. Zero third-party asset hosts remain in the built output; the only external
requests are the two click-to-load YouTube tutorial embeds (an allowed external service per the
migration runbook, not a page asset) and standard outbound links to other organizations' own
policy pages.

**Stripped** as part of conversion: WordPress REST/oEmbed/xmlrpc discovery links, the emoji
script, the WP default sidebar widgets (search/archives/categories/meta — none had real content),
and the unusable Contact Form 7 contact form (the live `/contact-us/` page was not linked from the
site's own navigation and carried no working destination once static).

**Analytics**: no GTM container is wired up yet — GA4/GTM provisioning is a separate, explicitly
gated step (see `src/components/google-tag-manager/index.tsx`). Shipping Free For Charity's own
template-default container here would have sent this site's traffic into FFC's own analytics
property.

## Deployment

Deployed to the **default GitHub Pages URL**
(https://freeforcharity.github.io/FFC-EX-myservicehours.org/) — no custom domain, no DNS changes.
Cutover (adding `public/CNAME`) is a separately gated step per the migration runbook.

- `CI - Build and Test` validates formatting, lint, unit tests, the static build, and Playwright
  E2E tests on every PR/push.
- `Deploy to GitHub Pages` runs after CI succeeds on `main`.
- `Lighthouse CI` and `FFC Drift Check` audit the deployed structure and FFC best-practice
  conventions respectively.

## Development

```bash
pnpm install
pnpm run dev        # http://localhost:3000
```

| Command                | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `pnpm run format`      | Format with Prettier                      |
| `pnpm run lint`        | ESLint                                    |
| `pnpm test`            | Jest unit tests                           |
| `pnpm run build`       | Static export (`out/`)                    |
| `pnpm run test:e2e`    | Playwright E2E tests                      |
| `pnpm run check:drift` | FFC footer-only best-practice conventions |

Run them in that order before committing (`TEMPLATE_CUSTOMIZATION.md` and the other
`TEMPLATE_*`/`*.md` docs in this repo are inherited from the upstream
[FFC Footer-Only Template](https://github.com/FreeForCharity/FFC-IN-Footer_Only_Template) and
describe the template's general customization surface, not this migration specifically).
