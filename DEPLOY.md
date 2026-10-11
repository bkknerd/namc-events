# Deploying to Netlify

1. Put this folder in a GitHub repository (the contents of `namc-site` at the repo root) and connect it to a new Netlify site.
   No build command; publish directory ".". (Manual drag-and-drop also works, but the content editor needs Git.)
2. Forms: Site configuration > Forms. After the first deploy you should see five forms: sponsor, exhibitor, contact, sponsor-guests, notify.
   Add a form notification email (timothy@namcwi.org) for each form.
3. Domain: Domain management > add your domain. The files currently assume https://2027.namcwi.org
   To change it, find and replace that string in every .html file, sitemap.xml, robots.txt and admin/config.yml.
4. Content editor (/admin): follow CONTENT-GUIDE.md "One-time setup". In short: set the repo name in admin/config.yml,
   enable the GitHub provider under Site configuration > Access & security > OAuth, add editors to the repo.
5. After deploy: submit a test through each form, open /admin and change a price, check the share preview, and test on a phone.
