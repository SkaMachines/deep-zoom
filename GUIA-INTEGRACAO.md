# 🚀 Guia de Integração - DELTAFIT Deep Zoom

## 📋 Resumo do que foi criado

Você tem **5 arquivos prontos** para integrar:

```
1. products.js          → Dados dos 12 produtos
2. DeepZoom.jsx         → Componente principal
3. HotspotLayer.jsx     → Camada SVG com hotspots
4. ProductCard.jsx      → Card de produto
5. deep-zoom.css        → Estilos completos
```

---

## 🔧 Passo 1: Copiar Arquivos para seu Projeto

### Estrutura esperada:

```
seu-projeto/
├── src/
│   ├── components/
│   │   ├── DeepZoom.jsx          ← Novo
│   │   ├── HotspotLayer.jsx       ← Novo
│   │   ├── ProductCard.jsx        ← Novo
│   │   └── ... (seus componentes)
│   │
│   ├── data/
│   │   └── products.js            ← Novo
│   │
│   ├── styles/
│   │   └── deep-zoom.css          ← Novo
│   │
│   └── App.jsx (ou seu componente raiz)
│
├── public/
│   └── images/
│       └── deltafit.jpeg          ← Copie sua imagem aqui
│
└── package.json
```

### Comandos:

```bash
# Copie os componentes
cp DeepZoom.jsx src/components/
cp HotspotLayer.jsx src/components/
cp ProductCard.jsx src/components/

# Copie os dados
cp products.js src/data/

# Copie os estilos
cp deep-zoom.css src/styles/

# Copie a imagem da máquina
mkdir -p public/images
cp DELTAFIT.jpeg public/images/deltafit.jpeg
```

---

## 📄 Passo 2: Usar o Componente no seu App

### Opção A: Rota separada (recomendado)

**src/App.jsx:**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DeepZoom from './components/DeepZoom';
import Home from './pages/Home'; // sua página home

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deep-zoom" element={<DeepZoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Opção B: Componente embutido

```jsx
import DeepZoom from './components/DeepZoom';

function App() {
  return (
    <div>
      <Header />
      <DeepZoom />
      <Footer />
    </div>
  );
}

export default App;
```

### Opção C: Page/Modal

```jsx
import { useState } from 'react';
import DeepZoom from './components/DeepZoom';

function App() {
  const [showDeepZoom, setShowDeepZoom] = useState(false);

  return (
    <div>
      <button onClick={() => setShowDeepZoom(true)}>
        Abrir Deep Zoom
      </button>

      {showDeepZoom && (
        <div className="modal-overlay" onClick={() => setShowDeepZoom(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <DeepZoom />
            <button onClick={() => setShowDeepZoom(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
```

---

## ✅ Passo 3: Verificar Tudo

### Teste local:

```bash
npm install
npm run dev
```

### Checklist:

- [ ] Imagem da máquina carrega
- [ ] Hotspots aparecem como círculos
- [ ] Clique em um hotspot → produto selecionado
- [ ] Zoom (+/-/reset) funciona
- [ ] Busca por nome funciona
- [ ] Filtro por categoria funciona
- [ ] Sidebar responsivo em mobile
- [ ] Sem erros no console

---

## 🎨 Customização Fácil

### Trocar cores do tema:

**Abra `deep-zoom.css` e altere:**

```css
:root {
  --primary-color: #00d4ff;       /* ← Cor principal (cyan) */
  --secondary-color: #00aa00;     /* ← Cor secundária (verde) */
  --dark-bg: #0a0e27;             /* ← Fundo escuro */
  --border-color: var(--primary-color);
}
```

**Exemplos:**

```css
/* Vermelho Industrial */
--primary-color: #ff0000;
--secondary-color: #cc0000;

/* Violeta Futurista */
--primary-color: #aa00ff;
--secondary-color: #6600cc;

/* Laranja Quente */
--primary-color: #ff6600;
--secondary-color: #ff9900;
```

### Mudar imagem da máquina:

**Opção 1: Via prop**

```jsx
<DeepZoom machineImage="/images/sua-imagem.jpg" />
```

**Opção 2: Editar arquivo**

No `DeepZoom.jsx`, altere:

```jsx
const DeepZoom = ({ machineImage = '/images/deltafit.jpeg' }) => {
  // Trocar para:
  const DeepZoom = ({ machineImage = '/images/sua-maquina.jpg' }) => {
```

---

## 🔌 Integração com Backend

### Carregar produtos dinamicamente:

**Crie um hook customizado:**

```jsx
// src/hooks/useProducts.js

import { useEffect, useState } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/machines/deltafit/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
};
```

**Use no componente:**

```jsx
import { useProducts } from '../hooks/useProducts';

const DeepZoom = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    // ... seu código
  );
};
```

---

## 📡 Integração com VendPago (Preços)

### Adicionar preços na hora:

**Modificar `ProductCard.jsx`:**

```jsx
import { useEffect, useState } from 'react';

const ProductCard = ({ product }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    // Buscar preço da API VendPago
    fetch(`/api/vendpago/prices/${product.id}`)
      .then(res => res.json())
      .then(data => setPrice(data.price));
  }, [product.id]);

  return (
    <div className="product-card active">
      <h3>{product.name}</h3>
      <p>{product.brand}</p>
      
      {/* Adicionar preço */}
      {price && (
        <div className="product-price">
          <span className="price-label">Preço:</span>
          <span className="price-value">R$ {price.toFixed(2)}</span>
        </div>
      )}

      {/* ... resto do componente */}
    </div>
  );
};
```

**CSS para o preço:**

```css
.product-price {
  font-size: 14px;
  font-weight: 600;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 212, 255, 0.3);
  color: var(--secondary-color);
  display: flex;
  justify-content: space-between;
}

.price-label {
  color: var(--primary-color);
}

.price-value {
  font-size: 16px;
  font-weight: 700;
}
```

---

## 🎯 Adicionar Mais Máquinas

### Estrutura escalável:

**Criar arquivo novo: `src/data/machines.js`**

```jsx
export const machines = {
  deltafit: {
    id: 'deltafit',
    name: 'DELTAFIT',
    image: '/images/deltafit.jpeg',
    products: []  // Array de produtos
  },
  
  outra_maquina: {
    id: 'outra-maquina',
    name: 'Outra Máquina',
    image: '/images/outra-maquina.jpeg',
    products: []
  }
};
```

**Usar no componente:**

```jsx
import { machines } from '../data/machines';

const DeepZoom = ({ machineId = 'deltafit' }) => {
  const machine = machines[machineId];

  return (
    <DeepZoom 
      machineImage={machine.image}
      products={machine.products}
    />
  );
};
```

---

## ❌ Troubleshooting

### Problema: Imagem não carrega

**Solução:**

```jsx
// Verificar path absoluto
console.log('Image:', '/images/deltafit.jpeg');

// Ou use import direto
import machineImg from '../assets/deltafit.jpeg';
<img src={machineImg} />
```

### Problema: Hotspots não aparecem

**Verificar:**

- [ ] SVG tem `viewBox="0 0 100 100"`
- [ ] Hotspots têm propriedade `hotspot` com `x` e `y` (0-100)
- [ ] CSS não está oculto (`display: none`)

### Problema: Zoom lento

**Otimizar:**

```jsx
// Adicione will-change no CSS
.deep-zoom-background {
  will-change: transform;
  transform: translateZ(0); /* GPU acceleration */
}
```

### Problema: Sidebar muito grande

**Ajustar:**

```css
:root {
  --sidebar-width: 300px; /* Reduzir de 340px */
}
```

---

## 📦 Deploy

### Netlify:

```bash
npm run build
# Seu site estará pronto em dist/
```

### GitHub Pages:

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Adicionar ao package.json:
"homepage": "https://seu-usuario.github.io/seu-repo",
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# Deploy
npm run deploy
```

### Vercel:

```bash
vercel
# Siga as instruções
```

---

## 🎓 Próximos Passos (Futuros)

- [ ] Admin panel para editar produtos
- [ ] Integração com sistema de preços
- [ ] Multi-idioma
- [ ] Temas customizáveis
- [ ] Histórico de visualizações
- [ ] Compartilhamento de produtos
- [ ] QR Code para compra rápida

---

## 📞 Suporte

Se algo não funcionar:

1. Verifique os paths dos imports
2. Confirme que `products.js` está em `src/data/`
3. Confirme que `deep-zoom.css` está importado
4. Verifique o console do navegador (F12)

---

**Tudo pronto! 🚀 Comece a integrar agora!**

Qualquer dúvida, é só chamar! 👋
