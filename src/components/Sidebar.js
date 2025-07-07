import TranslatedText from './TranslatedText';
import LanguageSwitcher from './LanguageSwitcher';

export default function Sidebar() {
  return (
    <aside className="desktop-nav">
      <h2>NGUVU YA BUKU</h2>
      <Link to="/"><FaHome /> Dashboard</Link>
      <Link to="/family"><FaUsers /> Familia</Link>
    </aside>
  );
}