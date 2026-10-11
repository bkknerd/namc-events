# Content guide for NAMC-WI staff

Open **/admin** on the website, sign in with GitHub, and use the **How to edit** button (bottom right) for a quick refresher.

## What you can edit
| Section in the editor | What it controls |
|---|---|
| Home page | The text and photos on the home page: top banner, the three Attend / Sponsor / Exhibit cards, Why Milwaukee, the numbers, Why partner, the quote, the forum banner |
| Registration and prices | Early Bird and Standard prices and sale dates, Gala table and ticket prices, booth price, hotel rate, program ad rates |
| Sponsorship levels | Level names, prices, summaries and benefits |
| Speakers | The keynote (name, title, photo, bio) and the featured speakers |
| Logo scrolls | The upper scroll (top sponsors and partners) and the lower scroll (sponsors), including their titles |
| Program, FAQ and history | Program highlights, FAQ answers, the NAMC history timeline and numbers |

The panel on the right while you edit is a live preview. It is simplified, so photos and spacing look a little different on the real site.

## Prices and dates update everywhere
Change a price or a sale date once and every page updates: the home page, Register, FAQ, page descriptions and search data. In text boxes you can type these codes and they are replaced automatically:

| Code | Shows |
|---|---|
| `{{tk.eb}}` `{{tk.std}}` | Early Bird and Standard prices |
| `{{tk.gt}}` `{{tk.gk}}` `{{tk.bo}}` | Gala table, Gala ticket, booth prices |
| `{{p.presenting}}` `{{p.platinum}}` `{{p.silver}}` `{{p.bronze}}` `{{p.copper}}` `{{p.gov}}` | Sponsor level prices |
| `{{ebStart}}` `{{ebEnd}}` `{{ebOpen}}` | Early Bird start, end, and opening date with year |
| `{{stdStart}}` `{{stdEnd}}` | Standard start and end |
| `{{tmin}}` `{{tmax}}` | Lowest and highest sponsor level price |
| `{{hotel}}` `{{adFrom}}` | Hotel rate and the lowest ad price |
| `{{k.name}}` `{{k.title}}` `{{k.org}}` `{{k.short}}` | Keynote name, title, company and short company |

## Rules
- Never change a **Code** on an existing ticket or sponsor level. The site uses it internally.
- Photos: upload in the editor. Use a square or portrait photo, about 800 px wide, saved as WebP or JPG.
- Every photo has a description for screen readers. Update it when you change the photo.
- Changes go live about a minute after you press **Publish**.
- Page wording that is not in these lists (the Information page text, form wording and similar) still needs a developer.

## One-time setup (a developer does this once)
1. Put this folder in the GitHub repository `bkknerd/namc-events` (branch `main`) and connect it to the Netlify site.
2. Register a GitHub OAuth app: GitHub, then Settings, Developer settings, OAuth Apps, New OAuth App.
   - Homepage URL: your Netlify site address, for example `https://namc-events.netlify.app`
   - Authorization callback URL (called Redirect URI on the new form): `https://api.netlify.com/auth/done`
   - Copy the Client ID and generate a Client Secret.
3. In Netlify: Project configuration, then Security, then OAuth, then Install provider. Choose GitHub, paste the Client ID and Secret, and install.
4. Give each editor a free GitHub account and add them to the repository with write access.
5. Open `/admin`, sign in with GitHub, change a price, publish, and check the site.

## If sign-in fails
| What you see | Likely cause and fix |
|---|---|
| Login window opens, then closes with no login | The OAuth provider is not installed in Netlify, or the redirect address on the GitHub app is wrong. Redo steps 2 and 3. |
| "Failed to load config" or repository not found | `repo` in `admin/config.yml` is wrong, or the file is not committed. It should read `bkknerd/namc-events`. |
| Login works but you cannot save | The GitHub account needs write access to the repository (Settings, Collaborators). |
| Nothing happens when you press the login button | A browser pop-up blocker. Allow pop-ups for the site. |
| Login fails on a custom domain | Use the Netlify address, or make sure the custom domain is attached to this same Netlify site. |
