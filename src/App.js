import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import IndividualHome from './components/Individuals/IndividualHome';
import OnlineBooking from './components/Individuals/Booking/OnlineBooking';
import Telemedicine from './components/Individuals/Telemedicine/Telemedicine';
import Footer from './components/Footer';

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
        <Route path='/individual/telemedicine' element={<Telemedicine/>} exact/>
      </Routes>
      <div>
        <Footer/>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
