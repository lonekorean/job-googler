import { Link, Route, Routes } from 'react-router';
import About from './pages/About';
import Home from './pages/Home';
import './styles/App.css';

export default function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </main>
    </>
  );
}
