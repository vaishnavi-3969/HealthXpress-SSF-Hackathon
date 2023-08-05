import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import IndividualHome from './components/Individuals/IndividualHome';
import OnlineBooking from './components/Individuals/Booking/OnlineBooking';
import Telemedicine from './components/Individuals/Telemedicine/Telemedicine';
import Footer from './components/Footer';
import CrowdFunding from './components/Individuals/Crowdfunding/CrowdFunding';
import PharmacyCatalog from './components/Individuals/Online_Pharmacy/PharmacyCatalog';
import NotificationsAndReminders from './components/Individuals/Notifications/NotificationsAndRemainderse';
import UserProfile from './components/Individuals/User_Profile/UserProfile';
import FeedbackAndReviews from './components/Individuals/Feedback/FeedbackAndReviews';
import HealthInformationPortal from './components/Individuals/Health_Info_Portal/HealthInformationPortal';
import RemoteHealthMonitoring from './components/Individuals/Remote_Health_Monitoring/RemoteHealthMonitoring';
import MentalHealthSupport from './components/Individuals/Mental_Health/MentalHealthSupport';
import FitnessWellnessCommunity from './components/Individuals/Fitness_Wellness_Community/FitnessWellnessCommunity';
import HealthEducationPlatform from './components/Individuals/Education/HealthEducationPlatform';
import EmergencySupport from './components/Individuals/Emergency/EmergencySupport';
import LanguageAccessibility from './components/Individuals/Accessibility/LanguageAccessibilty';
import HospitalHome from './components/Hospitals/HospitalHome';
import PharmacyHome from './components/Pharmacies/PharmacyHome';

function App() {
  return (
    <div>
     <BrowserRouter>
     <div>
      {/* navbar */}
     </div>
      <Routes>
        <Route path="/" element={<Home/>} exact/>
        {/* For Individual Users */}
        <Route path='/individual' element={<IndividualHome/>} exact/>
        <Route path='/individual/online_booking' element={<OnlineBooking/>} exact/>
        <Route path='/individual/telemedicine' element={<Telemedicine/>} exact/>
        <Route path='/individual/crowdfunding' element={<CrowdFunding/>} exact/>
        <Route path='/individual/online_pharmacy' element={<PharmacyCatalog/>} exact/>
        <Route path='/individual/notification_and_remainders' element={<NotificationsAndReminders/>} exact/>
        <Route path='/individual/profile_and_settings' element={<UserProfile/>} exact/>
        <Route path='/profile' element={<UserProfile/>} exact/>
        <Route path='/individual/feedback_and_reviews' element={<FeedbackAndReviews/>} exact/>
        <Route path='/individual/heath_information_portal' element={<HealthInformationPortal/>} exact/>
        <Route path='/individual/remote_health_monitoring' element={<RemoteHealthMonitoring/>} exact/>
        <Route path='/individual/mental_health_support' element={<MentalHealthSupport/>} exact/>
        <Route path='/individual/fitness_and_wellness_community' element={<FitnessWellnessCommunity/>} exact/>
        <Route path='/individual/health_education_and_awareness' element={<HealthEducationPlatform/>} exact/>
        <Route path='/individual/emergency_support' element={<EmergencySupport/>} exact/>
        <Route path='/individual/language_and_accessibility_support' element={<LanguageAccessibility/>} exact/>
        {/* For Hospitals */}
        <Route path="/hospital" element={<HospitalHome/>} exact/>
        {/* For Pharmacies */} 
        <Route path='/pharmacy' element={<PharmacyHome/>} exact/>
      </Routes>
      <div>
        <Footer/>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
