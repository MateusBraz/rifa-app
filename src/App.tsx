import React from 'react';
import Home from './pages/Home';
import { CotasProvider } from "./hooks/cotas";

const App: React.FC = function () {

  return (
    <div className="App">
      <CotasProvider>
        <Home />
      </CotasProvider>
    </div>
  );
}

export default App;
