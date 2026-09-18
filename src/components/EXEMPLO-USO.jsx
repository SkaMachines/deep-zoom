/**
 * EXEMPLO DE USO - Deep Zoom DELTAFIT
 * 
 * Este arquivo mostra 3 maneiras de usar o componente
 * Escolha a que faz mais sentido para seu projeto
 */

// ============================================
// OPÇÃO 1: PÁGINA DEDICADA COM ROTA
// ============================================

// src/pages/VendingPage.jsx

import React from 'react';
import DeepZoom from '../components/DeepZoom';

export default function VendingPage() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DeepZoom machineImage="/images/deltafit.jpeg" />
    </div>
  );
}

// Em seu App.jsx:
// <Route path="/vending" element={<VendingPage />} />

// ============================================
// OPÇÃO 2: MODAL/POPUP
// ============================================

import React, { useState } from 'react';
import DeepZoom from '../components/DeepZoom';

export default function VendingModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn-open-vending"
      >
        🔍 Explorar Máquina
      </button>

      {isOpen && (
        <div 
          className="modal-overlay"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              width: '90vw',
              height: '90vh',
              backgroundColor: '#050810'
            }}
          >
            <DeepZoom machineImage="/images/deltafit.jpeg" />
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          position: relative;
          max-width: 1400px;
          max-height: 90vh;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 50px rgba(0, 212, 255, 0.3);
        }

        .btn-open-vending {
          padding: 12px 24px;
          font-size: 16px;
          background: #00d4ff;
          color: #000;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-open-vending:hover {
          background: #00f0ff;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }
      `}</style>
    </>
  );
}

// ============================================
// OPÇÃO 3: MÚLTIPLAS MÁQUINAS
// ============================================

import React, { useState } from 'react';
import DeepZoom from '../components/DeepZoom';

const MACHINES = {
  deltafit: {
    id: 'deltafit',
    name: 'DELTAFIT - Bebidas e Snacks',
    image: '/images/deltafit.jpeg'
  },
  vending_b: {
    id: 'vending-b',
    name: 'Vending B - Café',
    image: '/images/vending-b.jpeg'
  },
  vending_c: {
    id: 'vending-c',
    name: 'Vending C - Premium',
    image: '/images/vending-c.jpeg'
  }
};

export default function MultiVendingApp() {
  const [selectedMachine, setSelectedMachine] = useState('deltafit');

  return (
    <div className="multi-vending-container">
      <div className="machine-selector">
        <h2>Selecione uma Máquina</h2>
        <div className="machine-grid">
          {Object.values(MACHINES).map(machine => (
            <button
              key={machine.id}
              className={`machine-btn ${selectedMachine === machine.id ? 'active' : ''}`}
              onClick={() => setSelectedMachine(machine.id)}
            >
              {machine.name}
            </button>
          ))}
        </div>
      </div>

      <div className="deep-zoom-wrapper">
        <DeepZoom 
          machineImage={MACHINES[selectedMachine].image}
        />
      </div>

      <style>{`
        .multi-vending-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #050810;
        }

        .machine-selector {
          padding: 20px;
          background: linear-gradient(135deg, #1a1f3a 0%, #0a0e27 100%);
          border-bottom: 2px solid #00d4ff;
        }

        .machine-selector h2 {
          color: #00d4ff;
          margin-bottom: 12px;
          font-size: 18px;
        }

        .machine-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
        }

        .machine-btn {
          padding: 12px 16px;
          background: rgba(0, 212, 255, 0.1);
          border: 2px solid #00d4ff;
          color: #00d4ff;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .machine-btn:hover {
          background: rgba(0, 212, 255, 0.2);
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
        }

        .machine-btn.active {
          background: rgba(0, 212, 255, 0.3);
          border-color: #00aa00;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }

        .deep-zoom-wrapper {
          flex: 1;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

// ============================================
// OPÇÃO 4: INTEGRAÇÃO COM DASHBOARD
// ============================================

import React from 'react';
import DeepZoom from '../components/DeepZoom';

export default function VendingDashboard() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h1>Vendpago</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/machines">Máquinas</a>
          <a href="/reports">Relatórios</a>
          <a href="/settings">Configurações</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Máquina DELTAFIT</h2>
          <div className="header-actions">
            <button className="btn-secondary">📊 Relatório</button>
            <button className="btn-secondary">🔄 Recarregar</button>
            <button className="btn-secondary">⚙️ Configurar</button>
          </div>
        </header>

        <div className="dashboard-content">
          <DeepZoom machineImage="/images/deltafit.jpeg" />
        </div>
      </main>

      <style>{`
        .dashboard-layout {
          display: flex;
          height: 100vh;
          background: #050810;
        }

        .dashboard-sidebar {
          width: 240px;
          background: #0a0e27;
          border-right: 2px solid #00d4ff;
          padding: 20px;
          overflow-y: auto;
        }

        .dashboard-sidebar h1 {
          color: #00d4ff;
          margin-bottom: 30px;
          font-size: 20px;
        }

        .dashboard-sidebar nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .dashboard-sidebar a {
          color: #aaa;
          text-decoration: none;
          padding: 10px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .dashboard-sidebar a:hover {
          background: rgba(0, 212, 255, 0.1);
          color: #00d4ff;
        }

        .dashboard-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .dashboard-header {
          background: linear-gradient(135deg, #1a1f3a 0%, #0a0e27 100%);
          border-bottom: 2px solid #00d4ff;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-header h2 {
          color: #00d4ff;
          font-size: 18px;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .btn-secondary {
          padding: 8px 12px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid #00d4ff;
          color: #00d4ff;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: rgba(0, 212, 255, 0.2);
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
        }

        .dashboard-content {
          flex: 1;
          overflow: hidden;
          padding: 15px;
        }
      `}</style>
    </div>
  );
}

// ============================================
// OPÇÃO 5: COM DADOS DINÂMICOS DA API
// ============================================

import React, { useEffect, useState } from 'react';
import DeepZoom from '../components/DeepZoom';

export default function VendingWithAPI() {
  const [machineData, setMachineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simular fetch de API
    const fetchMachine = async () => {
      try {
        // Substituir por sua API real
        // const res = await fetch('/api/machines/deltafit');
        // const data = await res.json();
        
        // Para este exemplo, usando dados estáticos
        const data = {
          id: 'deltafit',
          name: 'DELTAFIT',
          image: '/images/deltafit.jpeg',
          location: 'São Paulo, SP',
          status: 'online',
          lastUpdate: new Date().toLocaleString()
        };

        setMachineData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMachine();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando máquina...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>❌ Erro ao carregar: {error}</p>
      </div>
    );
  }

  return (
    <div className="vending-with-api">
      <div className="machine-info">
        <h2>{machineData.name}</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Localização:</span>
            <span className="value">{machineData.location}</span>
          </div>
          <div className="info-item">
            <span className="label">Status:</span>
            <span className="status online">● {machineData.status}</span>
          </div>
          <div className="info-item">
            <span className="label">Atualizado:</span>
            <span className="value">{machineData.lastUpdate}</span>
          </div>
        </div>
      </div>

      <div className="vending-viewer">
        <DeepZoom machineImage={machineData.image} />
      </div>

      <style>{`
        .vending-with-api {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #050810;
        }

        .machine-info {
          background: linear-gradient(135deg, #1a1f3a 0%, #0a0e27 100%);
          border-bottom: 2px solid #00d4ff;
          padding: 15px 20px;
        }

        .machine-info h2 {
          color: #00d4ff;
          margin-bottom: 12px;
          font-size: 20px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .info-item .label {
          color: #00d4ff;
          font-weight: 600;
        }

        .info-item .value,
        .info-item .status {
          color: #aaa;
        }

        .status.online {
          color: #00aa00;
        }

        .vending-viewer {
          flex: 1;
          overflow: hidden;
          padding: 15px;
        }

        .loading-container,
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          color: #00d4ff;
          font-size: 16px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0, 212, 255, 0.3);
          border-top-color: #00d4ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ============================================
// QUAL USAR?
// ============================================

/*
Use OPÇÃO 1 se:
  - Quer uma página separada dedicada
  - Integração simples

Use OPÇÃO 2 se:
  - Quer abrir em modal/popup
  - Tem um dashboard

Use OPÇÃO 3 se:
  - Tem múltiplas máquinas
  - Quer selector de máquinas

Use OPÇÃO 4 se:
  - Tem um dashboard completo
  - Quer integrar com sidebar/header

Use OPÇÃO 5 se:
  - Quer carregar dados da API
  - Quer mostrar status/localização
*/
