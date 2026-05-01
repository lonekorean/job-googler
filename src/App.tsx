import { NavLink, Route, Routes } from 'react-router';
import AboutPage from './pages/About';
import SearchPage from './pages/Search';
import './styles/App.css';

export default function App() {
  return (
    <div className="App__container">
      <header>
        <nav className="App__nav">
          <ul>
            <li><NavLink to="/">Search</NavLink></li>
            <li><NavLink to="/About">About</NavLink></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/About" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}
