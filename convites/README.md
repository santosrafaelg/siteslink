# Convites interativos

Cada convite tem uma pasta própria para manter o conteúdo e a identidade visual independentes dos demais:

```text
convites/
├── README.md
└── thaina-guilherme/
    ├── index.html
    ├── styles.css
    └── script.js
```

Para criar outro, adicione `convites/<nome-dos-noivos>/` com esses três arquivos e uma regra em `_redirects` que associe o subdomínio à pasta. Depois, configure o subdomínio no DNS e no Netlify. O convite atual está disponível localmente em `/convites/thaina-guilherme/`.
