import DeepZoom from './src/components/DeepZoom';
import './src/styles/deep-zoom.css';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      {/* O path agora está correto: /public/images/DELTAFIT.jpeg */}
      <DeepZoom machineImage="/images/DELTAFIT.jpeg" />
    </div>
  );
}
