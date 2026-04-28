import { NavLink, Route, Routes } from 'react-router';
import About from './pages/About';
import Home from './pages/Home';
import './styles/App.css';

export default function App() {
  return (
    <div className="App__container">
      <header>
        <nav className="App__nav">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/About">About</NavLink></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}
