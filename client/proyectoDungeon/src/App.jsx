import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './screens/HomeScreen';
import Login from './screens/Login';
import Signup from './screens/SingUp';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <Router>
     <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </Router>
  );
}

export default App;