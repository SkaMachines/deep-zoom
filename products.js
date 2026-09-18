/**
 * SKA Deeper Zoom - Catálogo DELTAFIT
 * Produtos confirmados visualmente da máquina de vendas
 * 
 * IMPORTANTE:
 * - Sem preços (será integrado via VendPago)
 * - Apenas dados comprovados visualmente
 * - Deixar "" ou [] se informação não confirmada
 */

export const products = {
  // LINHA 1: Snacks/Lanches
  "ALGES-SNACK": {
    id: "ALGES-SNACK",
    name: "Alges",
    brand: "Alges",
    category: "Lanches",
    volume: "",
    description: "Snack crocante",
    benefits: [],
    specifications: {},
    image: "",
    gallery: [],
    available: true,
    hotspot: {
      x: 15,
      y: 12,
      radius: 28,
      shelf: 1,
      slot: "01"
    }
  },

  "ALGES-SNACK-2": {
    id: "ALGES-SNACK-2",
    name: "Alges",
    brand: "Alges",
    category: "Lanches",
    volume: "",
    description: "Snack crocante",
    benefits: [],
    specifications: {},
    image: "",
    gallery: [],
    available: true,
    hotspot: {
      x: 25,
      y: 12,
      radius: 28,
      shelf: 1,
      slot: "02"
    }
  },

  "FANDANGOS": {
    id: "FANDANGOS",
    name: "Fandangos",
    brand: "Fandangos",
    category: "Lanches",
    volume: "",
    description: "Snack salgado crocante",
    benefits: [],
    specifications: {},
    image: "",
    gallery: [],
    available: true,
    hotspot: {
      x: 55,
      y: 12,
      radius: 28,
      shelf: 1,
      slot: "04-05"
    }
  },

  "RUFFLES": {
    id: "RUFFLES",
    name: "Ruffles",
    brand: "Ruffles",
    category: "Lanches",
    volume: "",
    description: "Batata crocante ondulada",
    benefits: [],
    specifications: {},
    image: "",
    gallery: [],
    available: true,
    hotspot: {
      x: 20,
      y: 27,
      radius: 28,
      shelf: 2,
      slot: "11"
    }
  },

  // LINHA 3: Chocolates e Biscoitos
  "KITKAT": {
    id: "KITKAT",
    name: "KitKat",
    brand: "KitKat",
    category: "Chocolates",
    volume: "",
    description: "Barra de chocolate com biscoito",
    benefits: [],
    specifications: {},
    image: "",
    gallery: [],
    available: true,
    hotspot: {
      x: 67,
      y: 42,
      radius: 28,
      shelf: 3,
      slot: "25"
    }
  },

  // LINHA 4: Bebidas em Garrafa
  "AGUA-GARRAFA": {
    id: "AGUA-GARRAFA",
    name: "Água",
    brand: "",
    category: "Bebidas",
    volume: "",
    description: "Água mineral",
    benefits: [],
    specifications: {},
    image: "",
    gallery: [],
    available: true,
    hotspot: {
      x: 18,
      y: 57,
      radius: 28,
      shelf: 4,
      slot: "31-36"
    }
  },

  "GUARANA": {
    id: "GUARANA",
    name: "Guaraná",
    brand: "",
    category: "Bebidas",
    volume: "",
    description: "Refrigerante de Guaraná",
    benefits: [],
    specifications: {},
    image: "",
    gallery: [],
    available: true,
    hotspot: {
      x: 44,
      y: 57,
      radius: 28,
      shelf: 4,
      slot: "34"
    }
  },

  // LINHA 5-6: Bebidas em Lata
  "VITORAZZO-VERDE": {
    id: "VITORAZZO-VERDE",
    name: "Vitorazzo Verde",
    brand: "Vitorazzo",
    category: "Bebidas",
    volume: "",
    description: "Bebida de suco",
    benefits: [],
    specifications: {},
    image: "",
    gallery: [],
    available: true,
    hotspot: {
      x: 57,
      y: 70,
      radius: 28,
      shelf: 5,
      slot: "44"
    }
  },

  "VITORAZZO-LARANJA": {
    id: "VITORAZZO-LARANJA",
    name: "Vitorazzo Laranja",
    brand: "Vitorazzo",
    category: "Bebidas",
    volume: "",
    description: "Bebida de suco",
    benefits: [],
    specifications: {},
    image: "",
    gallery: [],
    available: true,
    hotspot: {
      x: 70,
      y: 70,
      radius: 28,
      shelf: 5,
      slot: "45"
    }
  },

  "VITORAZZO-ROXO": {
    id: "VITORAZZO-ROXO",
    name: "Vitorazzo Roxo",
    brand: "Vitorazzo",
    category: "Bebidas",
    volume: "",
    description: "Bebida de suco",
    benefits: [],
    specifications: {},
    image: "",
    gallery: [],
    available: true,
    hotspot: {
      x: 83,
      y: 70,
      radius: 28,
      shelf: 5,
      slot: "46"
    }
  },

  "BEBIDA-427": {
    id: "BEBIDA-427",
    name: "427",
    brand: "427",
    category: "Bebidas",
    volume: "",
    description: "Bebida energética",
    benefits: [],
    specifications: {},
    image: "",
    gallery: [],
    available: true,
    hotspot: {
      x: 70,
      y: 83,
      radius: 28,
      shelf: 6,
      slot: "55"
    }
  },

  "ENERGIA-GENERICA": {
    id: "ENERGIA-GENERICA",
    name: "Bebida Energética",
    brand: "",
    category: "Bebidas",
    volume: "",
    description: "Bebida energética",
    benefits: [],
    specifications: {},
    image: "",
    gallery: [],
    available: true,
    hotspot: {
      x: 35,
      y: 83,
      radius: 28,
      shelf: 6,
      slot: "51-54"
    }
  }
};

/**
 * Funções auxiliares para acessar produtos
 */

export const getProduct = (productId) => {
  return products[productId] || null;
};

export const getAllProducts = () => {
  return Object.values(products);
};

export const getProductsByCategory = (category) => {
  return Object.values(products).filter(p => p.category === category);
};

export const getCategories = () => {
  return [...new Set(Object.values(products).map(p => p.category))];
};

export const getProductsByShelf = (shelf) => {
  return Object.values(products).filter(p => p.hotspot && p.hotspot.shelf === shelf);
};

export const searchProducts = (query) => {
  const q = query.toLowerCase();
  return Object.values(products).filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
};

/**
 * Estatísticas do catálogo
 */

export const stats = {
  totalProducts: Object.keys(products).length,
  totalCategories: getCategories().length,
  categories: getCategories(),
  availableCount: Object.values(products).filter(p => p.available).length
};
