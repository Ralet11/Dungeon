import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './screens/HomeScreen';
import Login from './screens/Login';
import Signup from './screens/SingUp';
import HomeScreen from './screens/HomeScreen';
import Map1 from './screens/Map1';
import MapMain from './screens/MapMain';
import CharacterCreator from './screens/CharacterCreation';
import CharacterProfile from './screens/CharacterProfile';
import FreeWorld from './screens/Freeworld';

function App() {
  return (
    <Router>
     <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mapMain" element={<MapMain />} />
          <Route path="/CharacterCreation" element={<CharacterCreator />} />
          <Route path="/characterProfile" element={<CharacterProfile />} />
          <Route path="/freeWorld" element={<FreeWorld />} />
        </Routes>
    </Router>
  );
}

export default App;