/**
 * HotspotLayer Component
 * Camada SVG transparente com círculos interativos sobre a imagem
 */

import React, { useEffect, useRef } from 'react';

const HotspotLayer = ({
  products,
  selectedProductId,
  onHotspotClick,
  animating,
  zoom,
  panX,
  panY
}) => {
  const svgRef = useRef(null);

  /**
   * Atualizar SVG quando produtos mudam
   */
  useEffect(() => {
    if (!svgRef.current) return;

    // Limpar SVG anterior
    svgRef.current.innerHTML = '';

    // Criar grupo para hotspots
    const hotspotGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    products.forEach(product => {
      if (!product.hotspot) return;

      const { x, y, radius } = product.hotspot;

      // Grupo do hotspot
      const hotspotG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      hotspotG.setAttribute('class', 'hotspot-group');
      hotspotG.setAttribute('data-product-id', product.id);
      hotspotG.style.cursor = 'pointer';

      // Círculo do hotspot
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', `${x}%`);
      circle.setAttribute('cy', `${y}%`);
      circle.setAttribute('r', radius);
      circle.setAttribute('class', `hotspot-circle ${selectedProductId === product.id ? 'active' : ''} ${animating ? 'animate' : ''}`);
      circle.style.fill = 'none';
      circle.style.stroke = 'var(--hotspot-color, #00d4ff)';
      circle.style.strokeWidth = 2;
      circle.style.opacity = 0.7;

      // Label do hotspot (ID/Slot)
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', `${x}%`);
      label.setAttribute('y', `${y}%`);
      label.setAttribute('class', 'hotspot-label');
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('dy', '0.3em');
      label.textContent = product.hotspot.slot || product.id;
      label.style.fill = 'var(--hotspot-color, #00d4ff)';
      label.style.fontSize = '11px';
      label.style.fontWeight = 'bold';
      label.style.pointerEvents = 'none';

      // Evento de clique
      hotspotG.addEventListener('click', () => {
        onHotspotClick(product.id);
      });

      // Efeito de hover
      hotspotG.addEventListener('mouseenter', () => {
        circle.setAttribute('class', 
          `hotspot-circle ${selectedProductId === product.id ? 'active' : ''} hover ${animating ? 'animate' : ''}`
        );
      });

      hotspotG.addEventListener('mouseleave', () => {
        circle.setAttribute('class', 
          `hotspot-circle ${selectedProductId === product.id ? 'active' : ''} ${animating ? 'animate' : ''}`
        );
      });

      hotspotG.appendChild(circle);
      hotspotG.appendChild(label);
      hotspotGroup.appendChild(hotspotG);
    });

    svgRef.current.appendChild(hotspotGroup);
  }, [products, selectedProductId, animating, onHotspotClick]);

  /**
   * Adicionar CSS dinâmico para animações
   */
  useEffect(() => {
    if (!svgRef.current) return;

    // Verificar se o style já existe
    let style = document.getElementById('hotspot-styles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'hotspot-styles';
      style.textContent = `
        .hotspot-circle {
          transition: all 0.3s ease;
          filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));
        }

        .hotspot-circle:hover {
          filter: drop-shadow(0 0 16px rgba(0, 212, 255, 1));
        }

        .hotspot-circle.active {
          fill: rgba(0, 212, 255, 0.2);
          stroke-width: 3;
          opacity: 1;
        }

        .hotspot-circle.hover {
          stroke-width: 3;
          opacity: 1;
        }

        .hotspot-circle.animate {
          animation: hotspot-pulse 1.5s ease-in-out infinite;
        }

        @keyframes hotspot-pulse {
          0%, 100% {
            r: ${products[0]?.hotspot?.radius || 28}px;
            opacity: 0.7;
            filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));
          }
          50% {
            r: ${(products[0]?.hotspot?.radius || 28) + 10}px;
            opacity: 0.3;
            filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.3));
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, [products]);

  return (
    <svg
      ref={svgRef}
      className="hotspot-svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
    />
  );
};

export default HotspotLayer;
