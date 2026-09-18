/**
 * DeepZoom Component
 * Deep zoom interativo com hotspots SVG sobre imagem de fundo
 */

import React, { useState, useRef, useEffect } from 'react';
import { getAllProducts } from '../data/products';
import HotspotLayer from './HotspotLayer';
import ProductCard from './ProductCard';
import './deep-zoom.css';

const DeepZoom = ({ machineImage = '/images/deltafit.jpeg' }) => {
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [animating, setAnimating] = useState(false);

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 4;

  const products = getAllProducts();
  const categories = ['all', ...new Set(products.map(p => p.category))];

  /**
   * Filtrar produtos por busca e categoria
   */
  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  /**
   * Gerenciar zoom
   */
  const handleZoom = (direction) => {
    const factor = direction === 'in' ? 1.2 : 0.8;
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * factor));
    
    if (newZoom !== zoom) {
      setZoom(newZoom);
    }
  };

  /**
   * Resetar zoom e pan
   */
  const handleResetZoom = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  /**
   * Zoom com scroll do mouse
   */
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const direction = e.deltaY < 0 ? 'in' : 'out';
      handleZoom(direction);
    }
  };

  /**
   * Drag para pan
   */
  const handleMouseDown = (e) => {
    if (zoom > 1) {
      isDragging.current = true;
      dragStart.current = { x: e.clientX - panX, y: e.clientY - panY };
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging.current && zoom > 1) {
      const newPanX = e.clientX - dragStart.current.x;
      const newPanY = e.clientY - dragStart.current.y;
      
      // Limitar pan aos limites da imagem
      const container = containerRef.current;
      if (container) {
        const maxPanX = (zoom - 1) * container.offsetWidth / 2;
        const maxPanY = (zoom - 1) * container.offsetHeight / 2;
        
        setPanX(Math.max(-maxPanX, Math.min(maxPanX, newPanX)));
        setPanY(Math.max(-maxPanY, Math.min(maxPanY, newPanY)));
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  /**
   * Selecionar produto pelo hotspot
   */
  const handleHotspotClick = (productId) => {
    setSelectedProductId(productId);
  };

  /**
   * Animar hotspots (pulse)
   */
  const toggleAnimation = () => {
    setAnimating(!animating);
  };

  /**
   * Efeito: adicionar/remover listeners
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [zoom, panX, panY]);

  /**
   * Calcular transform da imagem
   */
  const imageTransform = `translate(${panX}px, ${panY}px) scale(${zoom})`;

  return (
    <div className="deep-zoom-container">
      <header className="deep-zoom-header">
        <h1>🔍 DELTAFIT - Deep Zoom</h1>
        <div className="header-stats">
          <span className="badge">{products.length} produtos</span>
          <span className="badge">Zoom: {Math.round(zoom * 100)}%</span>
        </div>
      </header>

      <div className="deep-zoom-main">
        {/* Canvas: Imagem + Hotspots */}
        <div 
          className="deep-zoom-canvas"
          ref={containerRef}
          style={{ cursor: zoom > 1 ? 'grab' : 'crosshair' }}
        >
          {/* Background Image */}
          <div
            className="deep-zoom-background"
            ref={imageRef}
            style={{ transform: imageTransform }}
          >
            <img 
              src={machineImage} 
              alt="DELTAFIT Vending Machine"
              draggable={false}
            />
          </div>

          {/* SVG Hotspots Layer */}
          <HotspotLayer
            products={products}
            selectedProductId={selectedProductId}
            onHotspotClick={handleHotspotClick}
            animating={animating}
            zoom={zoom}
            panX={panX}
            panY={panY}
          />

          {/* Zoom Controls */}
          <div className="deep-zoom-controls">
            <button
              className="zoom-btn"
              onClick={() => handleZoom('in')}
              title="Ampliar (Ctrl + Scroll)"
              disabled={zoom >= MAX_ZOOM}
            >
              +
            </button>
            <button
              className="zoom-btn"
              onClick={() => handleZoom('out')}
              title="Reduzir (Ctrl + Scroll)"
              disabled={zoom <= MIN_ZOOM}
            >
              −
            </button>
            <button
              className="zoom-btn reset"
              onClick={handleResetZoom}
              title="Resetar zoom"
            >
              ⟲
            </button>
          </div>

          {/* Zoom Info */}
          <div className="zoom-info">
            <div className="zoom-level">{Math.round(zoom * 100)}%</div>
            <div className="hotspots-count">{products.length} pontos</div>
          </div>

          {/* Animation Toggle */}
          <button
            className={`animate-btn ${animating ? 'active' : ''}`}
            onClick={toggleAnimation}
            title="Animar hotspots"
          >
            {animating ? '⏸' : '▶'}
          </button>
        </div>

        {/* Sidebar: Produtos e Filtros */}
        <aside className="deep-zoom-sidebar">
          {/* Busca */}
          <div className="sidebar-section">
            <h2>🔎 Buscar</h2>
            <input
              type="text"
              className="search-input"
              placeholder="Nome, marca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filtro por Categoria */}
          <div className="sidebar-section">
            <h2>🏷️ Categorias</h2>
            <div className="category-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${categoryFilter === cat ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat === 'all' ? 'Todos' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Produto Selecionado */}
          {selectedProductId && (
            <div className="sidebar-section">
              <h2>📦 Selecionado</h2>
              <ProductCard 
                product={products.find(p => p.id === selectedProductId)}
              />
            </div>
          )}

          {/* Lista de Produtos Filtrados */}
          <div className="sidebar-section products-list">
            <h2>📋 Produtos ({filteredProducts.length})</h2>
            <div className="products-scroll">
              {filteredProducts.length === 0 ? (
                <div className="empty-state">Nenhum produto encontrado</div>
              ) : (
                filteredProducts.map(product => (
                  <button
                    key={product.id}
                    className={`product-item ${selectedProductId === product.id ? 'active' : ''}`}
                    onClick={() => setSelectedProductId(product.id)}
                  >
                    <div className="product-name">{product.name}</div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-category">{product.category}</div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Estatísticas */}
          <div className="sidebar-section stats">
            <h2>📊 Stats</h2>
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-value">{products.length}</div>
                <div className="stat-label">Total</div>
              </div>
              <div className="stat">
                <div className="stat-value">{categories.length - 1}</div>
                <div className="stat-label">Categorias</div>
              </div>
              <div className="stat">
                <div className="stat-value">{products.filter(p => p.available).length}</div>
                <div className="stat-label">Disponíveis</div>
              </div>
              <div className="stat">
                <div className="stat-value">{filteredProducts.length}</div>
                <div className="stat-label">Filtrados</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DeepZoom;
