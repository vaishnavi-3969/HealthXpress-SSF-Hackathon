import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div>
     <BrowserRouter>
     <div>
      {/* navbar */}
     </div>
      <Routes>
        <Route path="/" element={<Home/>} exact/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
