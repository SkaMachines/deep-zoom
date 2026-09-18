# 🏗️ Arquitetura DELTAFIT Deep Zoom

## Fluxo de Dados

```
┌─────────────────────────────────────────────────────────┐
│                    App.jsx (seu app)                    │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  DeepZoom.jsx (Principal)               │
│  ┌────────────────────────────────────────────────────┐ │
│  │  - Gerencia zoom/pan                              │ │
│  │  - Controla estado (selected, search, filter)     │ │
│  │  - Event listeners (wheel, mouse)                 │ │
│  │  - Renderiza canvas + sidebar                     │ │
│  └────────────────────────────────────────────────────┘ │
└──────────┬──────────────────────────────────┬───────────┘
           │                                  │
           ▼                                  ▼
    ┌─────────────────┐          ┌──────────────────────┐
    │  CANVAS AREA    │          │  SIDEBAR             │
    │  ┌───────────┐  │          │  ┌────────────────┐  │
    │  │ Background│  │          │  │ Search Input   │  │
    │  │  Image    │  │          │  └────────────────┘  │
    │  └─────┬─────┘  │          │  ┌────────────────┐  │
    │        │        │          │  │ Category Filters   │
    │        ▼        │          │  └────────────────┘  │
    │  ┌─────────────┐│          │  ┌────────────────┐  │
    │  │ HotspotLayer││          │  │ ProductCard    │  │
    │  │   (SVG)     ││          │  │ (Selected)     │  │
    │  └─────────────┘│          │  └────────────────┘  │
    │  ┌─────────────┐│          │  ┌────────────────┐  │
    │  │ Zoom Controls           │  │ Products List  │  │
    │  │ (+, -, Reset)│          │  │ (Filtrados)    │  │
    │  └─────────────┘│          │  └────────────────┘  │
    └─────────────────┘          │  ┌────────────────┐  │
                                 │  │ Stats          │  │
                                 │  └────────────────┘  │
                                 └──────────────────────┘
```

---

## Estrutura de Componentes

```
DeepZoom (Main)
│
├── Canvas
│   ├── Background Image (CSS transform)
│   ├── HotspotLayer (SVG)
│   │   └── Circles (interativos)
│   ├── Zoom Controls (buttons)
│   └── Info Display (zoom%, count)
│
└── Sidebar
    ├── Search Section
    ├── Category Filters
    ├── Product Card (se selecionado)
    ├── Products List
    └── Stats
```

---

## Fluxo de Estado

```
DeepZoom State
│
├── zoom (número: 1-4)
│   └─ afeta: transform da imagem
│
├── panX, panY (números)
│   └─ afeta: posição durante drag
│
├── selectedProductId (string ou null)
│   └─ afeta: ProductCard visível
│   └─ afeta: Hotspot destaque
│
├── searchQuery (string)
│   └─ afeta: Products List filtrada
│
├── categoryFilter (string)
│   └─ afeta: Products List filtrada
│
└── animating (boolean)
    └─ afeta: Hotspots pulse animation
```

---

## Fluxo de Interação

```
Usuário Clica em Hotspot
│
├─ HotspotLayer recebe click event
│   └─ Extrai product ID
│       └─ Chama onHotspotClick(productId)
│
├─ DeepZoom atualiza state.selectedProductId
│   └─ Re-render de HotspotLayer (destaque)
│   └─ Re-render de ProductCard (mostra dados)
│
└─ Sidebar atualiza
    └─ ProductCard mostra nome, marca, specs
    └─ Info atualiza
```

---

## Fluxo de Zoom

```
Usuário faz Ctrl+Scroll ou clica em (+/-)
│
├─ Event dispara handleZoom(direction)
│   └─ Calcula newZoom
│       └─ Valida: Math.max(MIN, Math.min(MAX, newZoom))
│
├─ setZoom(newZoom) atualiza state
│   └─ Recalcula imageTransform
│
└─ Imagem re-renderiza com novo transform
    └─ transform: translate(panX, panY) scale(zoom)
```

---

## Fluxo de Busca/Filtro

```
Usuário digita no search input
│
├─ handleChange(event) captura input
│   └─ setSearchQuery(value)
│
├─ DeepZoom filtra products
│   └─ product.name.includes(query)
│   └─ product.brand.includes(query)
│
└─ Products List re-renderiza
    └─ Mostra apenas items filtrados
```

---

## Camadas Visuais (CSS z-index)

```
z-index: 100    ┌─ Header
                │
z-index: 10     ├─ Zoom Controls
                ├─ Zoom Info
                └─ Animation Toggle
                │
z-index: default├─ SVG Hotspots
                ├─ Background Image
                │
z-index: 0      └─ Canvas Container
```

---

## Hierarquia de Imports

```
App.jsx
│
└─ DeepZoom.jsx
   │
   ├─ HotspotLayer.jsx
   │  └─ (renderiza SVG)
   │
   ├─ ProductCard.jsx
   │  └─ (renderiza card)
   │
   ├─ products.js (import)
   │  └─ getAllProducts()
   │
   └─ deep-zoom.css (import)
      └─ Todos os estilos
```

---

## Estrutura de Dados: Product

```
Product {
  id: string                    // Único identificador
  name: string                  // Nome display
  brand: string                 // Marca
  category: string              // Categoria
  volume: string                // Tamanho/volume
  description: string           // Descrição breve
  benefits: string[]            // Array de benefícios
  specifications: {             // Objeto de specs
    [key: string]: value
  }
  image: string                 // URL da imagem
  gallery: string[]             // Array de URLs
  available: boolean            // Disponibilidade
  hotspot: {                    // Posição na máquina
    x: number (0-100)          // Posição horizontal %
    y: number (0-100)          // Posição vertical %
    radius: number             // Raio do círculo (px)
    shelf: number              // Número da prateleira
    slot: string               // ID do slot
  }
}
```

---

## Fluxo CSS: Tema Customizável

```
deep-zoom.css
│
├─ :root {
│   --primary-color: #00d4ff
│   --secondary-color: #00aa00
│   --dark-bg: #0a0e27
│   └─ ... 10+ variáveis
│}
│
├─ Components usam var(--primary-color)
│   ├─ Header
│   ├─ Buttons
│   ├─ Hotspots
│   ├─ Text
│   └─ Borders
│
└─ Para customizar:
    └─ Alterar :root vars
        └─ TODO o app muda de cor
```

---

## Responsividade

```
Desktop (>1200px)
│
├─ Layout: Row
├─ Canvas: 70% width
├─ Sidebar: 30% width
│
Mobile (<1024px)
│
├─ Layout: Column
├─ Canvas: 100% (top)
├─ Sidebar: 100% (bottom, limited height)
│
Small Phone (<480px)
│
├─ Canvas: Full height
├─ Sidebar: Minimizado/Modal
├─ Controls: Redimensionados
│
└─ Scrollbar customizado em tudo
```

---

## Performance Optimizations

```
✅ Implementado
│
├─ CSS transform3d (GPU acceleration)
├─ will-change: transform
├─ transform: translateZ(0)
├─ SVG viewBox (escalável)
├─ Event delegation
├─ Memoized functions
└─ useRef para refs não-render

🎯 Possível adicionar depois
│
├─ React.memo para ProductCard
├─ useMemo para filtrados
├─ useCallback para handlers
├─ Lazy load imagens
└─ Code splitting
```

---

## Integrações Planejadas

```
Atual (MVP)
│
├─ React components
├─ Static products.js
├─ Local storage (futuramente)
│
Curto Prazo
│
├─ API REST (carregar produtos)
├─ VendPago (preços)
├─ Analytics (tracking)
│
Longo Prazo
│
├─ Admin panel
├─ Multi-máquinas
├─ Temas do usuário
├─ Multi-idioma
└─ Mobile app
```

---

## Segurança

```
✅ Já seguro
│
├─ Sem XSS (React escapa)
├─ Sem SQL injection (não usa DB)
├─ Inputs validados
│
⚠️ Considerar para API
│
├─ CORS policy
├─ Rate limiting
├─ Input sanitization
└─ HTTPS only
```

---

## Escalabilidade

```
Produto (1-12)
│
├─ Current: products.js local
├─ Level 2: API REST
└─ Level 3: GraphQL

Máquinas (1-100)
│
├─ Current: 1 (DELTAFIT)
├─ Level 2: machines.js array
└─ Level 3: Dynamic loading

Usuários
│
├─ Current: Nenhum
├─ Level 2: Analytics
└─ Level 3: Accounts + Favoritos
```

---

## Deployment

```
Build
│
├─ npm run build
├─ Minificação automática
└─ Tree-shaking

Output
│
├─ dist/
│   ├─ index.html
│   ├─ assets/
│   │   ├─ main-[hash].js (~30kb)
│   │   ├─ style-[hash].css (~15kb)
│   │   └─ deltafit.jpg (~500kb)
│   └─ ...
│
Deploy
│
├─ GitHub Pages
├─ Netlify
├─ Vercel
└─ Seu servidor
```

---

## Timeline Típica

```
Dia 1: Integração
├─ Copiar arquivos (10 min)
├─ Ajustar imports (10 min)
└─ Testar localmente (20 min)
  TOTAL: 40 min

Dia 2-3: Refinamento
├─ Validar responsividade (30 min)
├─ Integração com VendPago (1-2h)
├─ Testes em staging (1h)
└─ Deploy em produção (30 min)
  TOTAL: 4-5h

Semana 2: Features
├─ Admin panel (4-6h)
├─ Múltiplas máquinas (2-3h)
└─ Analytics (2-3h)
  TOTAL: 10-12h
```

---

## Checklist de Qualidade

```
✅ Código
├─ Sem console.logs
├─ Sem TODOs
├─ Sem hardcodes
└─ Comentários úteis

✅ Performance
├─ Sem re-renders desnecessários
├─ Imagem otimizada
└─ CSS minificado

✅ Acessibilidade
├─ Alt text em imagens
├─ Keyboard navigation
└─ Contrast ratio ok

✅ Responsividade
├─ Mobile ok
├─ Tablet ok
└─ Desktop ok

✅ Documentação
├─ README completo
├─ Inline comments
└─ Exemplos funcionando
```

---

**Fim da Documentação** 📚

Arquitetura clara, código limpo, pronto para escalar! 🚀
