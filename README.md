# 🚀 Rick and Morty Characterverse

Uma aplicação moderna em Next.js que explora o universo de Rick and Morty, apresentando personagens, episódios e localizações da série através de uma interface elegante e responsiva.

## 📸 Preview

Navegue por personagens icônicos, descubra episódios e explore as dimensões do multiverso Rick and Morty!

## 🛠️ Tecnologias

- **[Next.js 14](https://nextjs.org/)** - Framework React com App Router e Server Components
- **[Material-UI (MUI) 6](https://mui.com/)** - Biblioteca de componentes UI com design system completo
- **[Recoil](https://recoiljs.org/)** - Gerenciamento de estado global
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições à API
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática e segurança de tipos
- **[Emotion](https://emotion.sh/)** - CSS-in-JS para estilização

## 📋 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** versão 18.x ou superior
- **npm**, **yarn**, **pnpm** ou **bun** (gerenciador de pacotes)

Verifique sua versão do Node:
```bash
node --version
```

## ⚙️ Configuração de Ambiente

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd poc-nextjs-react-mui
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
touch .env.local
```

Adicione a seguinte variável:

```env
API_URL=https://rickandmortyapi.com/api
```

#### 📝 Variáveis de Ambiente Disponíveis

| Variável | Descrição | Exemplo | Obrigatório |
|----------|-----------|---------|-------------|
| `API_URL` | URL base da API Rick and Morty | `https://rickandmortyapi.com/api` | ✅ Sim |

> **⚠️ Importante:** Sem a variável `API_URL` configurada, a aplicação não conseguirá buscar dados da API.

### 3. Instale as dependências

```bash
npm install
```

Ou com outros gerenciadores:

```bash
# Yarn
yarn install

# PNPM
pnpm install

# Bun
bun install
```

## 🏃 Executando o Projeto

### Modo Desenvolvimento

Execute o servidor de desenvolvimento com hot-reload:

```bash
npm run dev
```

A aplicação estará disponível em **[http://localhost:3000](http://localhost:3000)**

Outros gerenciadores:
```bash
yarn dev    # Yarn
pnpm dev    # PNPM
bun dev     # Bun
```

### Modo Produção

#### 1. Primeiro, crie o build de produção:

```bash
npm run build
```

Este comando irá:
- ✅ Compilar TypeScript para JavaScript
- ✅ Otimizar componentes React
- ✅ Gerar páginas estáticas (SSG) quando possível
- ✅ Minificar código CSS e JavaScript
- ✅ Criar o diretório `.next/` com arquivos otimizados

#### 2. Execute o servidor de produção:

```bash
npm start
```

A aplicação rodará em modo otimizado na porta **3000**.

## 🏗️ Build do Projeto

### Build de Produção

```bash
npm run build
```

**Output esperado:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (X/X)
✓ Finalizing page optimization
```

### Análise do Build

Para analisar o tamanho do bundle:

```bash
npm run build
```

Verifique o output no terminal para informações sobre:
- Tamanho dos arquivos JavaScript
- Páginas renderizadas (SSR/SSG/ISR)
- Rotas estáticas geradas

## 📁 Estrutura do Projeto

```
poc-nextjs-react-mui/
├── app/
│   ├── (pages)/              # Páginas da aplicação (route groups)
│   │   ├── characters/       # 👤 Página de personagens
│   │   ├── episodes/         # 📺 Página de episódios
│   │   └── locations/        # 🌍 Página de localizações
│   │
│   ├── api/                  # API Routes (Next.js Backend)
│   │   ├── character/        # Endpoints de personagens
│   │   │   ├── route.ts      # GET /api/character (lista)
│   │   │   └── [id]/         # GET /api/character/:id (detalhe)
│   │   ├── episode/          # Endpoints de episódios
│   │   │   ├── route.ts      # GET /api/episode (lista)
│   │   │   └── [id]/         # GET /api/episode/:id (detalhe)
│   │   └── location/         # Endpoints de localizações
│   │       ├── route.ts      # GET /api/location (lista)
│   │       └── [id]/         # GET /api/location/:id (detalhe)
│   │
│   ├── components/           # Componentes React
│   │   ├── characters/       # Componentes de personagens
│   │   │   ├── CardCharacter.tsx
│   │   │   ├── CharacterInfos.tsx
│   │   │   ├── CharacterList.tsx
│   │   │   └── CharacterModal.tsx
│   │   ├── episodes/         # Componentes de episódios
│   │   │   ├── EpisodesInfos.tsx
│   │   │   └── EpisodesList.tsx
│   │   ├── home/             # Componentes da home
│   │   │   └── Carrossel.tsx
│   │   ├── layout/           # Componentes de layout
│   │   │   ├── NavBar.tsx
│   │   │   └── ThemeRegistry.tsx
│   │   └── locations/        # Componentes de localizações
│   │       ├── LocationInfo.tsx
│   │       └── LocationList.tsx
│   │
│   ├── lib/                  # Utilitários e configurações
│   │   ├── axios.ts          # Configuração do Axios
│   │   └── utils.ts          # Funções auxiliares
│   │
│   ├── providers/            # Context Providers
│   │   └── recoil.tsx        # Provider do Recoil
│   │
│   ├── stage/                # Recoil Atoms (Estado Global)
│   │   └── atomcharacter.ts  # Estado de personagem selecionado
│   │
│   ├── types/                # Definições TypeScript
│   │   ├── character.ts      # Tipos de Character
│   │   ├── episodes.ts       # Tipos de Episode
│   │   └── location.ts       # Tipos de Location
│   │
│   ├── globals.css           # Estilos globais
│   ├── layout.tsx            # Layout raiz
│   └── page.tsx              # Página inicial
│
├── public/                   # Arquivos estáticos
│   └── icons/
│
├── types/
│   └── css.d.ts              # Definições de tipos CSS
│
├── .env.local                # Variáveis de ambiente (não versionado)
├── next.config.js            # Configuração do Next.js
├── tsconfig.json             # Configuração do TypeScript
├── eslint.config.mjs         # Configuração do ESLint
└── package.json              # Dependências e scripts
```

## 🎯 Funcionalidades

### 👤 Personagens
- ✅ Galeria de personagens com imagens
- ✅ Filtros e busca
- ✅ Modal com informações detalhadas
- ✅ Lista de episódios por personagem
- ✅ Status (Alive, Dead, Unknown)
- ✅ Origem e localização atual

### 📺 Episódios
- ✅ Lista completa de episódios
- ✅ Informações de data de lançamento
- ✅ Código do episódio (S01E01)
- ✅ Personagens por episódio

### 🌍 Localizações
- ✅ Exploração de dimensões e locais
- ✅ Tipo e dimensão de cada local
- ✅ Residentes de cada localização

### 🎨 Interface
- ✅ Design responsivo (mobile-first)
- ✅ Tema dark integrado (Material-UI)
- ✅ Animações suaves
- ✅ Loading states elegantes
- ✅ Error handling robusto

## 🔗 API Routes

A aplicação possui rotas internas que funcionam como proxy para a Rick and Morty API:

### Characters

```http
GET /api/character
```
Lista personagens com paginação e filtros

```http
GET /api/character/1
GET /api/character/1,2,3
```
Obtém personagem(ns) específico(s) por ID

### Episodes

```http
GET /api/episode
POST /api/episode
```
Lista episódios ou busca múltiplos episódios (POST para evitar limite de URL)

```http
GET /api/episode/1
GET /api/episode/1,2,3
```
Obtém episódio(s) específico(s)

### Locations

```http
GET /api/location
```
Lista localizações com paginação

```http
GET /api/location/1
GET /api/location/1,2,3
```
Obtém localização(ões) específica(s)

## 🧪 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| **Desenvolvimento** | `npm run dev` | Inicia servidor de desenvolvimento com hot-reload |
| **Build** | `npm run build` | Cria build otimizado para produção |
| **Produção** | `npm start` | Executa servidor de produção (requer build) |


## 📚 Recursos e Documentação

- [Next.js Documentation](https://nextjs.org/docs) - Documentação completa do Next.js
- [Material-UI Documentation](https://mui.com/) - Guia de componentes MUI
- [Recoil Documentation](https://recoiljs.org/) - Gerenciamento de estado
- [Rick and Morty API](https://rickandmortyapi.com/documentation) - Documentação da API

Este projeto é um POC (Proof of Concept) para fins de aprendizado.
