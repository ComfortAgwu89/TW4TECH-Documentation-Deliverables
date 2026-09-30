# In the margin

Comfort Agwu’s lab booklet for OPNsense. The official handbook stays the book. These chapters are the margin: image, sign-in, the GUI rooms, then a few HTTP calls.

After GitHub Pages is on: [comfortagwu89.github.io/TW4TECH-Documentation-Deliverables](https://comfortagwu89.github.io/TW4TECH-Documentation-Deliverables/)

- Handbook: [docs.opnsense.org](https://docs.opnsense.org/)
- Download: [opnsense.org/download](https://opnsense.org/download/)
- Source: [github.com/opnsense/core](https://github.com/opnsense/core)
- API how-to: [Use the API](https://docs.opnsense.org/development/how-tos/api.html)

## Layout

```text
├── README.md
├── .github/workflows/deploy-docs.yml
└── opnsense-documentation/
    ├── docs/                 seven chapters
    ├── blog/                 journal
    ├── static/openapi.yaml
    └── src/pages/index.js    cover and contents
```

`audit/` is an older review of the official README. It is not one of the chapters.

## Local preview

```bash
cd opnsense-documentation
npm install
npm start
```

`npm run build` fails if a chapter link points nowhere.

OPNsense is a trademark of Deciso B.V.
