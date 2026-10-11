# Content guide for NAMC-WI staff

Most numbers and lists on the site live in the files in the `content` folder and are edited at **/admin**. You do not need a developer for these.

## What you can edit
| Section in the editor | What it controls |
|---|---|
| Registration and prices | Early Bird and Standard prices and sale dates, Gala table and ticket prices, booth price, hotel rate, program ad rates |
| Sponsorship levels | Level names, prices, summaries and benefits |
| Speakers | The keynote (name, title, photo, bio) and the featured speakers |
| Logo scrolls | The upper scroll (top sponsors and partners) and the lower scroll (sponsors) |
| Program, FAQ and history | Program highlights, FAQ answers, the NAMC history timeline and numbers |

## Prices and dates update everywhere
Change a price or a sale date once and every page updates: the home page, Register, FAQ, page descriptions and search data. In text fields you can type these tokens and they are replaced automatically:

| Token | Shows |
|---|---|
| `{{tk.eb}}` `{{tk.std}}` | Early Bird and Standard prices |
| `{{tk.gt}}` `{{tk.gk}}` `{{tk.bo}}` | Gala table, Gala ticket, booth prices |
| `{{p.presenting}}` `{{p.platinum}}` `{{p.silver}}` `{{p.bronze}}` `{{p.copper}}` `{{p.gov}}` | Sponsor level prices |
| `{{ebStart}}` `{{ebEnd}}` `{{ebOpen}}` | Early Bird start, end, and opening date with year |
| `{{stdStart}}` `{{stdEnd}}` | Standard start and end |
| `{{tmin}}` `{{tmax}}` | Lowest and highest sponsor level price |
| `{{hotel}}` `{{adFrom}}` | Hotel rate and the lowest ad price |
| `{{k.name}}` `{{k.title}}` `{{k.org}}` `{{k.short}}` | Keynote name, title, organization and short organization |

## Rules
- Never change a **Code** on an existing ticket or sponsor level. The site uses it internally.
- Photos: upload in the editor. Use a square or portrait photo, about 800 px wide, saved as WebP or JPG.
- Changes go live about a minute after you press **Publish**.
- Page wording that is not in these lists (headlines, the Information page text and similar) still needs a developer.

## One-time setup (a developer does this once)
1. Put this folder in a GitHub repository and connect that repository to the Netlify site.
2. In `admin/config.yml`, replace `YOUR-GITHUB-USER/YOUR-REPO` with the real repository.
3. In Netlify, open Site configuration, then Access and security, then OAuth, and enable the GitHub provider. Netlify's instructions explain how to register the GitHub OAuth app.
4. Give each editor a free GitHub account and add them to the repository with write access.
5. Open `/admin`, sign in with GitHub, edit a price, publish, and check the site.
