import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="logo">Moses Markels</Link>
      <nav>
        <ul>
          <li><Link to="/">Work</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/about#contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
