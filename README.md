# Which Roll?

Static rebuild of [whichroll.co.nz](https://www.whichroll.co.nz/) — an online survey of Māori perspectives on choosing the Māori or General electoral roll.

Built with [Astro](https://astro.build) for deployment on GitHub Pages.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

1. Push this repo to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

For a project site at `username.github.io/repo-name/`, set `BASE_PATH=/repo-name/` in the workflow (or locally when building).

For the custom domain `www.whichroll.co.nz`, configure DNS to point at GitHub Pages and keep `public/CNAME` as-is.

## Pages

- `/` — Home
- `/about-us/` — About the survey, team, and FAQ
- `/resources/` — Videos, articles, and official links
- `/publications/` — Research outputs
- `/results/` — Survey results and knowledge quiz
