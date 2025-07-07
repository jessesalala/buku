import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaUser, 
  FaBookOpen, 
  FaListAlt,
  FaCalculator 
} from 'react-icons/fa';
import './Navbar.css'; // Make sure to create this CSS file
import TranslatedText from './TranslatedText';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        <FaHome className="nav-icon" />
        <span className="nav-text">Home</span>
      </NavLink>
      
      <NavLink 
        to="/workbook"
        className={({ isActive }) => 
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        <FaBookOpen className="nav-icon" />
        <span className="nav-text">Workbook</span>
      </NavLink>
      
      <NavLink 
        to="/todo"
        className={({ isActive }) => 
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        <FaListAlt className="nav-icon" />
        <span className="nav-text">To-Do</span>
      </NavLink>
      
      <NavLink 
        to="/calculator"
        className={({ isActive }) => 
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        <FaCalculator className="nav-icon" />
        <span className="nav-text">Calculator</span>
      </NavLink>
      
     <NavLink 
  to="/settings"
  className={({ isActive }) => 
    isActive ? 'nav-link active' : 'nav-link'
  }
>
  <FaUser className="nav-icon" /> {/* Replaced FaCog with FaUser */}
  <span className="nav-text">Profile</span>
</NavLink>
    </nav>
  );
}