import { useState } from 'react';
import './App.css';
import UnitDetail from './components/unit-detail';

const UNIT_ID = '1230942834234'

function App() {
  const [showDetail, setShowDetail] = useState(true)
  return (
    <div className="App">
      <button onClick={() => setShowDetail(true)}>show detail</button>
      {showDetail && <UnitDetail unitId={UNIT_ID} oncClose={() => setShowDetail(false)} />}
    </div>
  );
}

export default App;
