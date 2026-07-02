# Arquitetura do Site — Eu Jatopê

## Stack
- **Framework:** Astro 6 (SSG — geração estática)
- **Estilo:** Tailwind CSS
- **UI interativa:** React (apenas no painel admin)
- **Hospedagem:** Vercel (HTML estático)

---

## Páginas e URLs

| URL | Arquivo | O que é |
|---|---|---|
| `/` | `src/pages/index.astro` | Home |
| `/blog` | `src/pages/blog/index.astro` | Listagem de posts |
| `/[slug]` | `src/pages/[slug].astro` | Post individual |
| `/contato` | `src/pages/contato.astro` | Contato |
| `/sobre` | `src/pages/sobre.astro` | Sobre |
| `/admin/*` | `src/pages/admin/*.astro` | CMS interno |

---

## Conteúdo

### Posts
- Arquivos `.md` em `src/content/blog/`
- Frontmatter com: título, descrição, autor, produtos, FAQs, tags, imagem, etc.
- Schema validado em `src/content.config.ts`

### Dados do site
Arquivos JSON em `src/data/` lidos via `readData()`:

| Arquivo | O que controla |
|---|---|
| `siteConfig.json` | Nome, URL, logo, autor, redes sociais |
| `authors.json` | Nome, bio, foto, cargo do autor |
| `menu.json` | Links do menu de navegação |
| `footer.json` | Links, redes sociais, disclaimer do footer |
| `home.json` | Textos e seções da home |
| `categories.json` | Categorias dos posts |
| `contato.json` | FAQs e dados da página de contato |
| `sobre.json` | Conteúdo da página sobre |

---

## Fluxo de dados

```
Post .md (frontmatter + markdown)
        ↓
[slug].astro — getStaticPaths + render
        ↓
ProductReviewCard, FAQ, Especialistas, RelatedPosts
        ↓
HTML estático
        ↓
Vercel (deploy)
```

---

## Componentes principais

| Componente | Função |
|---|---|
| `BaseLayout.astro` | Wrapper de todas as páginas — meta tags, schema JSON-LD, navbar, footer |
| `PostCard.astro` | Card de post na listagem e home |
| `ProductReviewCard.astro` | Card completo de produto afiliado com prós, contras, botões e rating |
| `RelatedPosts.astro` | Artigos relacionados no final do post |
| `Hero.astro` | Banner principal da home |
| `TableOfContents.astro` | Índice lateral do post |
| `AffiliateDisclosure.astro` | Aviso de links patrocinados |

---

## Schema JSON-LD (SEO)

Gerado em `BaseLayout.astro` como um único bloco `@graph`:

- `Article` — título, descrição, autor, publisher, datas
- `BreadcrumbList` — navegação estruturada
- `WebSite` — com SearchAction
- `Organization` — dados do site
- `SiteNavigationElement` — menu
- `Person` — autor do post
- `FAQPage` — perguntas frequentes
- `ContactPage` / `AboutPage` — páginas especiais

---

## CMS Admin

- Acessível em `/admin`
- Interface React que lê e escreve diretamente nos arquivos `.md` e `.json`
- Não usa banco de dados — tudo baseado em arquivos
- Funcionalidades: criar/editar posts, gerenciar autores, configurar site, redirects, SEO, etc.
