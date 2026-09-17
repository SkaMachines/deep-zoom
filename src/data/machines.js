export const machines = {
  SCS01: {
    id: "SCS01",
    name: "Academia Central",
    location: "",
    image: "/img/machines/scs01.webp",
    slots: {
      "01": {
        productId: ""
      },
      "02": {
        productId: ""
      },
      "03": {
        productId: ""
      }
    }
  },

  MAUA01: {
    id: "MAUA01",
    name: "",
    location: "",
    image: "/root/DELTAFIT.jpeg",
    slots: {}
  },

  PMFC01: {
    id: "PMFC01",
    name: "Clube Primeiro de Maio",
    location: "Santo André",
    image: "/img/machines/pmfc01.webp",
    slots: {}
  }
};

NÃO coloque preço aqui.

Cada posição deve apenas apontar para um productId.

Exemplo:

"52": {
  productId: "MONSTER-ULTRA-473ML"
}

Se uma posição estiver vazia:

"53": {
  productId: null
}
