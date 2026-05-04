import { NavLink, Route, Routes } from 'react-router';
import AboutPage from './pages/About';
import SearchPage from './pages/Search';
import './styles/App.css';

export default function App() {
  return (
    <div className="App__container">
      <header className="App__header">
        <nav>
          <ul>
            <li><NavLink to="/">Search</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}
