# SOS Falcon — Site Institucional

Site institucional da **SOS Falcon Soluções Ambientais**, especializada em controle
biológico de pombos e aves urbanas por meio de falcoaria técnica. Construído em
React + Vite, como aplicação 100% estática (sem backend), pronta para hospedagem
no GitHub Pages.

## Sumário

1. [Instalação](#1-instalação)
2. [Rodando localmente](#2-rodando-localmente)
3. [Build de produção](#3-build-de-produção)
4. [Publicando no GitHub Pages](#4-publicando-no-github-pages)
5. [Onde alterar os textos](#5-onde-alterar-os-textos)
6. [Onde alterar as imagens](#6-onde-alterar-as-imagens)
7. [Como usar o painel de edição (/admin)](#7-como-usar-o-painel-de-edição-admin)
8. [Limitações do sistema de edição](#8-limitações-do-sistema-de-edição)

---

## 1. Instalação

Pré-requisitos: [Node.js](https://nodejs.org) 18 ou superior.

```bash
npm install
```

## 2. Rodando localmente

```bash
npm run dev
```

Abre o site em `http://localhost:5173` (ou outra porta, se a 5173 estiver ocupada),
com atualização automática ao salvar arquivos.

## 3. Build de produção

```bash
npm run build
```

Gera os arquivos finais na pasta `dist/`. Para conferir o resultado do build
localmente antes de publicar:

```bash
npm run preview
```

## 4. Publicando no GitHub Pages

O projeto já inclui o pacote `gh-pages` configurado. Após criar o repositório no
GitHub e configurar o remote (`git remote add origin ...`):

```bash
npm run deploy
```

Esse comando builda o projeto e publica o conteúdo de `dist/` na branch
`gh-pages` do repositório. Depois, em **Settings → Pages** do repositório no
GitHub, selecione a branch `gh-pages` como fonte (se não for selecionada
automaticamente).

Detalhes técnicos já resolvidos para você:

- `vite.config.js` usa `base: './'` (caminhos relativos), então o site funciona
  em qualquer subpasta (`usuario.github.io/nome-do-repo/`) sem precisar ajustar
  nada manualmente.
- A navegação usa **roteamento por hash** (`#/admin`) em vez de React Router com
  rotas de caminho (`/admin`). Isso evita o problema clássico de "404 ao dar
  refresh" que o GitHub Pages tem com Single Page Applications baseadas em rotas
  de caminho — não há necessidade de configuração adicional de servidor.
- `public/404.html` redireciona qualquer URL não encontrada de volta para a
  home, como camada extra de segurança.
- `public/sitemap.xml`, a linha `Sitemap:` em `public/robots.txt`, e as tags
  `canonical` / `og:url` / dados estruturados (JSON-LD) em `index.html` têm a
  URL do site (`https://f7884902.github.io/sos-falcon/`) fixada nesses
  arquivos. Se um dia vocês configurarem um domínio próprio, atualize essa URL
  em todos eles.

## 5. Onde alterar os textos

Todo o conteúdo textual do site fica centralizado em:

```
src/data/siteContent.js
```

Esse arquivo é um objeto JavaScript comum, organizado por seção (`hero`,
`about`, `services`, `process`, `gallery`, `cta`, `contact`, `footer` etc.).
Basta editar os textos entre aspas e salvar — não é necessário mexer em nenhum
componente React.

## 6. Onde alterar as imagens

As imagens ficam em:

```
public/images/
```

Elas são referenciadas em `src/data/siteContent.js` por caminho, por exemplo:

```js
hero: {
  image: 'images/hero.jpg',
}
```

> O caminho é relativo (sem `/` na frente) de propósito: como o site pode ser
> publicado em um subcaminho (ex.: `usuario.github.io/nome-do-repo/`), um
> caminho começando com `/` apontaria para a raiz do domínio e quebraria as
> imagens em produção.

Para trocar uma imagem:

1. Coloque o arquivo definitivo (JPG, PNG ou WebP) dentro de `public/images/`.
2. Atualize o caminho correspondente em `siteContent.js` (pode manter o nome
   `hero.jpg`, por exemplo, ou usar um novo nome de arquivo).

As imagens atuais já são as fotografias reais fornecidas para o projeto
(gavião-de-Harris em campo, galpões, linha de produção e trabalho em altura),
redimensionadas e comprimidas para um tamanho adequado à web. O único
placeholder que ainda existe é `public/images/placeholder.svg`, usado como
imagem padrão apenas quando uma nova foto é adicionada à galeria pelo painel
`/admin` (seção 7) antes de o arquivo definitivo ser enviado.

> Por que `public/images/` e não `src/assets/images/`? Arquivos dentro de
> `public/` são copiados exatamente como estão para a pasta `dist/` durante o
> build, preservando o caminho. Como o conteúdo do site é definido como texto
> simples (strings) em `siteContent.js`, e não como `import` de imagem, esse é
> o único local que garante que o caminho funcione tanto em desenvolvimento
> quanto após o build de produção.

## 7. Como usar o painel de edição (/admin)

Acesse `http://localhost:5173/#/admin` (em produção,
`https://seu-dominio/#/admin`).

A senha é definida pela variável de ambiente `VITE_ADMIN_PASSWORD`, em um
arquivo `.env` na raiz do projeto (não versionado no Git). Para configurar:

```bash
cp .env.example .env
```

E edite o valor de `VITE_ADMIN_PASSWORD` no `.env`. Se nenhum `.env` existir,
o site usa a senha padrão `sosfalcon2024` como fallback.

> **Atenção:** como o site é 100% estático (sem backend), o valor de
> `VITE_ADMIN_PASSWORD` fica **embutido no JavaScript público** no momento do
> build (`npm run build` / `npm run deploy`) — não é um segredo real, apenas
> evita deixar a senha escrita diretamente no código-fonte versionado. Além
> disso, como o `gh-pages` publica o resultado do build feito na sua própria
> máquina, **quem rodar `npm run deploy` precisa ter o `.env` com a senha
> desejada presente localmente antes de rodar o comando** — não existe um
> "servidor" remoto que leia esse arquivo depois.

O painel permite editar, com preview imediato no próprio navegador:

- Informações gerais e contato (telefone, WhatsApp, e-mail, Instagram, endereço)
- Textos e imagem do Hero
- Textos e imagens da seção Sobre
- Título, descrição e imagem de cada serviço
- Imagens e legendas da galeria (adicionar/remover)
- Texto e imagem da seção de conversão (CTA)

Botões disponíveis:

- **Salvar neste navegador** — grava as alterações no `localStorage` deste
  navegador.
- **Exportar conteúdo (JSON)** — baixa um arquivo `site-content.json` com todo
  o conteúdo atual (incluindo suas edições), para você usar como base ao
  atualizar `src/data/siteContent.js`.
- **Restaurar padrão** — apaga as edições locais e volta ao conteúdo definido
  em `siteContent.js`.

## 8. Limitações do sistema de edição

Este é um site **estático**, hospedado no GitHub Pages, sem servidor e sem
banco de dados. Isso significa que:

- **O botão "Salvar neste navegador" não publica nada.** Ele grava as
  alterações apenas no `localStorage` do navegador/dispositivo de quem está
  editando. Ninguém mais vê essas mudanças, e elas não aparecem no site
  publicado no GitHub Pages.
- **A única forma de publicar uma alteração de verdade** é: editar
  `src/data/siteContent.js` (manualmente ou usando o JSON exportado do painel
  como referência) e rodar `npm run deploy` novamente.
- **Trocar uma imagem pelo painel** gera apenas uma pré-visualização local
  (guardada como imagem embutida no `localStorage`). Para a imagem valer para
  todo mundo, é necessário salvar o arquivo definitivo em `public/images/` e
  apontar o caminho correto no conteúdo publicado.
- **A senha do painel não é segurança real.** Ela é apenas uma barreira de
  interface, visível a qualquer pessoa com acesso ao código-fonte. Não a use
  para proteger informação sensível. Uma autenticação de verdade exigiria um
  backend ou serviço de terceiros (ex.: um provedor de autenticação), o que
  está fora do escopo de um site 100% estático no GitHub Pages.

## Estrutura do projeto

```
src/
├── components/        Header, Hero, About, Services, Process, Gallery,
│                       CTA, Footer, WhatsAppButton
├── data/
│   └── siteContent.js  ← conteúdo editável do site
├── hooks/
│   ├── useContent.js    mescla siteContent.js com edições salvas no navegador
│   └── useScrollReveal.js  animação de entrada ao rolar a página
├── pages/
│   ├── Home/            composição das seções da home
│   └── Admin/            painel de edição (/#/admin)
├── styles/
│   ├── tokens.css       cores, tipografia e espaçamentos (design tokens)
│   └── global.css       reset e estilos globais
├── utils/
│   └── whatsapp.js       geração de links wa.me
├── App.jsx               roteamento por hash (home vs. admin)
└── main.jsx
public/
├── images/              imagens do site (placeholders — ver seção 6)
├── favicon.svg
├── og-cover.svg
├── robots.txt
└── 404.html
```
