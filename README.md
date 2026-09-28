# Yes, I Can Fix That — Website

Website for **Yes, I Can Fix That**, a family and veteran-owned handyman business serving Ogden Valley and northern and western Weber County, Utah. Phone: (801) 917-4442.

It's a plain static site (HTML, CSS and a little JavaScript), so no build step is needed. GitHub Pages can host it for free.

## What's in here

| File or folder | What it is |
|---|---|
| `index.html` | Home page (hero, specialties, before & after highlights, service area, how it works) |
| `services.html` | Services, grouped by category |
| `work.html` | "Our Work" before & after gallery with filters |
| `404.html` | Shown when someone visits a page that doesn't exist |
| `site.css` | All the styling, colors and layout for every page |
| `site.js` | Gallery filters, photo viewer, and the footer year |
| `logo.png` | Horizontal logo used in the header |
| `badge.png` | Round badge logo (used when the site is shared) |
| `job-01.jpg` … `job-35.jpg` | Before & after photos |
| `favicon.png`, `apple-touch-icon.png` | Browser tab and phone home-screen icons |
| `.nojekyll`, `robots.txt` | Small files GitHub Pages and search engines use. Leave them in place. |

## Turn on the website (one time)

1. Upload every file in this folder to the main page of the repo. There are no subfolders, so everything goes in one place.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main**, folder **/ (root)**, then **Save**.
4. After a minute or two the page shows your live address.

## Before going live

- **Jobber link:** search all three pages for `YOUR_JOBBER_LINK` and replace it with your Jobber Client Hub request link. It appears in the menu button and every "Request an Estimate" button.
- **Custom domain (optional):** if you own a domain, add it under Settings → Pages → Custom domain.

## Adding a before & after photo

1. Upload the photo to the repo with the next number, for example `job-36.jpg`.
2. In `work.html`, copy any existing `<figure class="job" ...>` block, then change the photo file name, the caption, and `data-cat` to one of: `doors`, `walls`, `floors`, `carpentry`, `installs`, `fixes`, `outdoor`.
