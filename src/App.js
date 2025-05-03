import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const kategoriListesi = [
  { ad: 'Çukur', simge: '⚠️' },
  { ad: 'Yaya Geçidi Eksik', simge: '🚸' },
  { ad: 'Sokak Lambası Yok', simge: '💡' },
  { ad: 'Tabela Eksik', simge: '🚫' },
  { ad: 'Kavşak Sorunu', simge: '🔄' },
  { ad: 'Çöp Birikmesi', simge: '🗑️' },
];

function HaritaEtkinlikleri({ onAddMarker }) {
  useMapEvents({
    click(e) {
      onAddMarker(e.latlng);
    },
  });
  return null;
}

function App() {
  const [markers, setMarkers] = useState([]);
  const [kategori, setKategori] = useState(kategoriListesi[0].ad);

  const addMarker = (latlng) => {
    const secilen = kategoriListesi.find(k => k.ad === kategori);
    setMarkers([...markers, { ...latlng, kategori: secilen.ad, simge: secilen.simge }]);
  };

  return (
    <div className="App">
      <h2>Bel Bildir</h2>
      <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
        {kategoriListesi.map((k, i) => (
          <option key={i} value={k.ad}>{k.ad}</option>
        ))}
      </select>
      <MapContainer center={[41.0082, 28.9784]} zoom={13} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HaritaEtkinlikleri onAddMarker={addMarker} />
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]} icon={L.divIcon({ className: 'custom-icon', html: m.simge })}>
            <Popup>{m.kategori}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;