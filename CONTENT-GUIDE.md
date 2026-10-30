# Content guide for NAMC-WI staff

Open **/admin** on the website, sign in with GitHub, and use the **How to edit** button (bottom right) for a quick refresher.

## What you can edit
| Section in the editor | What it controls |
|---|---|
| Home page | The text and photos on the home page: top banner, the three Attend / Sponsor / Exhibit cards, Why Milwaukee, the numbers, Why partner, the quote, the forum banner |
| Registration and prices | Early Bird and Standard prices and sale dates, Gala table and ticket prices, booth price, hotel rate, program ad rates, payment page address |
| Sponsorship levels | Level names, prices, summaries and benefits |
| Speakers | The keynote (name, title, photo, bio) and the featured speakers |
| Partners and sponsor tower | Partners under "Built on", sponsor logos, and which tower floors are open |
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
- Every other piece of page wording is under **Page text (every page)** (see below).

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

## Page text (every page)

Every heading, paragraph, button, form label and message on the site is in **Page text (every page)** in the editor, grouped by page. The top bar, menu, footer, phone bar and the search descriptions are under **Site-wide**.

- Change the words and click **Publish**. The site updates in about a minute.
- Leave a box empty to go back to the original text.
- Codes in curly brackets, like `{{tk.eb}}`, fill in live prices and dates. Keep them if you want the number to stay current.
- A few boxes contain simple tags such as `<br>` (line break), `<b>` (bold) or links. Keep them, or remove them on purpose.

## Coming soon page

**Coming soon page > Coming soon switch and text** controls a full-screen holding page.

- Tick **Show the coming soon page to visitors** and publish: about a minute later every page shows the coming soon page. Untick and publish to bring the full site back.
- The editor (/admin) keeps working while it is on.
- To check the full site while it is on, open `/?preview=` followed by the **Preview key**, for example `https://namc-events.netlify.app/?preview=namc-preview-7q4k`. A gold bar shows you are previewing. Open `/?preview=off` to leave.
- You can see the coming soon page any time at `/coming-soon`, even when it is off.
- Sign-ups from its form arrive in Netlify under Forms > notify, marked "Coming soon".

## Form inbox

Every form sent through the site (Notify me sign-ups, sponsorships, exhibitors, sponsor guests and contact messages) is listed at **/submissions/**, for example https://2027.namcwi.org/submissions/. Enter the team password to open it. You can switch between forms, search, open a row to see every field and attachment, and download any form as a CSV for Excel or Google Sheets. Submissions still arrive by email as well.

One-time setup (Netlify): create a personal access token (User settings > Applications > Personal access tokens), then add two environment variables under Site configuration > Environment variables: NETLIFY_API_TOKEN (the token) and SUBMISSIONS_PASSWORD (the password the team will use). Redeploy the site once afterwards.
