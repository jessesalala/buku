import React, { useState } from 'react';
import { 
  FiUsers, 
  FiActivity, 
  FiAward, 
  FiBarChart2,
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import './CoachDashboard.css';

const CoachDashboard = () => {
  const [participants] = useState([
    { id: 1, name: "Asha Juma", progress: 65, lastActive: "Saa 2 zilizopita", completedModules: 5 },
    { id: 2, name: "Jamal Kombo", progress: 42, lastActive: "Jana", completedModules: 3 },
    { id: 3, name: "Neema Ally", progress: 90, lastActive: "Dakika 5 zilizopita", completedModules: 8 },
  ]);

  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showDetails, setShowDetails] = useState(false);

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate stats
  const activeParticipants = participants.filter(p => 
    p.lastActive.includes('Dakika') || p.lastActive.includes('Saa')
  ).length;

  const averageProgress = participants.length > 0 
    ? Math.round(participants.reduce((sum, p) => sum + p.progress, 0) / participants.length)
    : 0;

  const completedCount = participants.filter(p => p.progress >= 100).length;

  return (
    <div className="coach-dashboard">
      <header className="dashboard-header">
        <h1><FiUsers /> Ufuatiliaji wa Maendeleo</h1>
        <p>Angalia maendeleo ya wanafunzi wako</p>
      </header>

      {/* Stats Cards - Grid Layout */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FiUsers />
          </div>
          <div className="stat-content">
            <h3>Washiriki</h3>
            <p>{participants.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiActivity />
          </div>
          <div className="stat-content">
            <h3>Wanahudhuria</h3>
            <p>{activeParticipants}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiBarChart2 />
          </div>
          <div className="stat-content">
            <h3>Wastani wa Maendeleo</h3>
            <p>{averageProgress}%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiAward />
          </div>
          <div className="stat-content">
            <h3>Wamekamilisha</h3>
            <p>{completedCount}</p>
          </div>
        </div>
      </div>

      {/* Participants List */}
      <div className="participants-section">
        <div className="section-header" onClick={() => setShowDetails(!showDetails)}>
          <h2>Orodha ya Washiriki</h2>
          {isMobileView && (showDetails ? <FiChevronUp /> : <FiChevronDown />)}
        </div>

        {(showDetails || !isMobileView) && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Jina</th>
                  <th>Maendeleo</th>
                  {!isMobileView && <th>Muda wa Mwisho</th>}
                  <th>Vitendo</th>
                </tr>
              </thead>
              <tbody>
                {participants.map(participant => (
                  <tr key={participant.id}>
                    <td>{participant.name}</td>
                    <td>
                      <div className="progress-container">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${participant.progress}%` }}
                        >
                          <span>{participant.progress}%</span>
                        </div>
                      </div>
                    </td>
                    {!isMobileView && <td>{participant.lastActive}</td>}
                    <td>
                      <button 
                        className="message-btn"
                        onClick={() => setSelectedParticipant(selectedParticipant?.id === participant.id ? null : participant)}
                      >
                        <FiMessageSquare />
                        {!isMobileView && <span>Tuma Ujumbe</span>}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Participant Details - Appears on selection */}
      {selectedParticipant && (
        <div className="participant-details">
          <h2>Taarifa za {selectedParticipant.name}</h2>
          <div className="details-grid">
            <div className="detail-card">
              <h3>Taarifa za Msingi</h3>
              <p><strong>Maendeleo:</strong> {selectedParticipant.progress}%</p>
              <p><strong>Muda wa Mwisho:</strong> {selectedParticipant.lastActive}</p>
              <p><strong>Moduli Zilizokamilika:</strong> {selectedParticipant.completedModules}/10</p>
            </div>

            <div className="detail-card">
              <h3>Maendeleo ya Moduli</h3>
              <div className="modules-progress">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`module-dot ${i < selectedParticipant.completedModules ? 'completed' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachDashboard;