# OPNsense docs (this site)

Docusaurus source for [comfortagwu89.github.io/TW4TECH-Documentation-Deliverables](https://comfortagwu89.github.io/TW4TECH-Documentation-Deliverables/). The platform is OPNsense, not a local Node API.

```bash
cd website
npm install
npm start
```

Build: `npm run build`.

GitHub Actions publishes `website/build` to `gh-pages`. If the live URL is 404, enable Pages: **Settings → Pages → Deploy from a branch → `gh-pages` / `/`**.
