import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./pages/Layout";
import EvacuationPage from "./components/EvacuationModel";
import VolunteerPanel from "./components/SeperatePannel/VolunteerPanel";
import CreateRequestPanel from "./components/SeperatePannel/Pannel";
import Services from "./pages/Services";

import ProtectedRoute from "./utils/ProtectedRoute";
import Analytics from "./components/Analytics";
import MapBox from "./components/MapBox";
import MedicalHelpVolunteer from "./Volunteer/Medicalhelp";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Auth";
import Login from "./pages/Login";
import Us from "./pages/Us";

import JoinVolunteer from "./pages/JoinVolunteer";
import AdminVolunteerRequests from "./pages/AdminVolunteerRequests";
import FloodNews from "./components/NewsScaping";

// ✅ Added SOS components
import SOSPage from "./components/SOSPage";
import SOSPanel from "./components/SOSPanel.jsx";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (No Header/Sidebar) */}
        <Route path="/auth" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (With Header + Sidebar from Layout) */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Home />} /> {/* Updated to use index prop for the default route */}
          <Route path="analytics" element={<Analytics />} />
          <Route path="services" element={<Services />} />
          <Route path="evacuation" element={<EvacuationPage />} />
          <Route path="map" element={<MapBox />} />
          <Route path="volunteer" element={<VolunteerPanel />} />
          <Route path="sos" element={<SOSPage />} />
          <Route path="sos-panel" element={<SOSPanel />} />
          <Route path="user_request" element={<CreateRequestPanel />} />
          <Route path="medical-help" element={<MedicalHelpVolunteer />} />
          <Route path="join-volunteer" element={<JoinVolunteer />} />
          <Route path="admin/volunteer-requests" element={<AdminVolunteerRequests />} />
          <Route path="about" element={<About />} />
          <Route path="news" element={<FloodNews />} />
          <Route path="Us" element={<Us/>}/>
        </Route>
      </Routes>
    </Router>
  );
}