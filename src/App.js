import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import IndividualHome from './components/Individuals/IndividualHome';
import OnlineBooking from './components/Individuals/Booking/OnlineBooking';

function App() {
  return (
    <div>
     <BrowserRouter>
     <div>
      {/* navbar */}
     </div>
      <Routes>
        <Route path="/" element={<Home/>} exact/>
        <Route path='/individual' element={<IndividualHome/>} exact/>
        <Route path='/individual/online_booking' element={<OnlineBooking/>} exact/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
