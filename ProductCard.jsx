/**
 * ProductCard Component
 * Exibe informações do produto selecionado
 */

import React from 'react';

const ProductCard = ({ product }) => {
  if (!product) {
    return (
      <div className="product-card empty">
        <div className="empty-message">Nenhum produto selecionado</div>
      </div>
    );
  }

  return (
    <div className="product-card active">
      {/* Imagem do Produto */}
      {product.image && (
        <div className="product-image-wrapper">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
          />
        </div>
      )}

      {/* Informações Básicas */}
      <div className="product-header">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-brand">{product.brand}</p>
        <span className="product-category">{product.category}</span>
      </div>

      {/* Descrição */}
      {product.description && (
        <div className="product-description">
          {product.description}
        </div>
      )}

      {/* Volume */}
      {product.volume && (
        <div className="product-volume">
          <span className="label">Volume:</span>
          <span className="value">{product.volume}</span>
        </div>
      )}

      {/* Benefícios */}
      {product.benefits && product.benefits.length > 0 && (
        <div className="product-benefits">
          <h4>Benefícios</h4>
          <ul>
            {product.benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Especificações */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div className="product-specs">
          <h4>Especificações</h4>
          <table className="specs-table">
            <tbody>
              {Object.entries(product.specifications).map(([key, value]) => (
                <tr key={key}>
                  <td className="spec-key">{key}:</td>
                  <td className="spec-value">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Hotspot Info */}
      {product.hotspot && (
        <div className="product-hotspot-info">
          <div className="hotspot-detail">
            <span className="label">Prateleira:</span>
            <span className="value">{product.hotspot.shelf}</span>
          </div>
          <div className="hotspot-detail">
            <span className="label">Slot:</span>
            <span className="value">{product.hotspot.slot}</span>
          </div>
          <div className="hotspot-detail">
            <span className="label">Posição:</span>
            <span className="value">{product.hotspot.x}% × {product.hotspot.y}%</span>
          </div>
        </div>
      )}

      {/* Status de Disponibilidade */}
      <div className={`product-status ${product.available ? 'available' : 'unavailable'}`}>
        {product.available ? '✅ Disponível' : '❌ Indisponível'}
      </div>

      {/* Galeria de Imagens */}
      {product.gallery && product.gallery.length > 0 && (
        <div className="product-gallery">
          <h4>Galeria</h4>
          <div className="gallery-grid">
            {product.gallery.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`${product.name} ${idx + 1}`}
                className="gallery-image"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
