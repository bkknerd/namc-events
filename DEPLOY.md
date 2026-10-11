# Deploying to Netlify

1. Put the contents of this folder at the root of the GitHub repo bkknerd/namc-events (branch main), connected to the Netlify site.
   Leave the build command EMPTY in Netlify (netlify.toml sets a harmless one); publish directory ".".
2. Forms: Site configuration > Forms. After the first deploy you should see five forms: sponsor, exhibitor, contact, sponsor-guests, notify.
   Add a form notification email (timothy@namcwi.org) for each form.
3. Domain: the files assume https://2027.namcwi.org for share tags and the sitemap, and https://namc-events.netlify.app for the editor link.
   To change either, find and replace it in every .html file, sitemap.xml, robots.txt and admin/config.yml.
4. Content editor (/admin): follow CONTENT-GUIDE.md "One-time setup": create the GitHub OAuth app (callback https://api.netlify.com/auth/done)
   and install it under Project configuration > Security > OAuth in Netlify. Add editors to the repo with write access.
5. After deploy: submit a test through each form, open /admin and change a price, check the share preview, and test on a phone.
