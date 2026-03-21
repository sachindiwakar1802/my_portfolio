import React, { useState } from 'react';
import { Search, Monitor, FolderCode, FileText, UserPlus, Youtube, Github, Linkedin, Instagram } from 'lucide-react';

const StartMenu = ({ isOpen, onClose, onOpenWindow, onLogOff, fuel, achievements, photos, journals, isAdmin, handleAdminToggle }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const items = [
    { id: 'about', title: 'About Me', icon: Monitor, sub: 'Browse About Me' },
    { id: 'projects', title: 'My Projects', icon: FolderCode, sub: 'View project files' },
    { id: 'resume', title: 'My Resume', icon: FileText, sub: 'View/Print Resume' },
    { id: 'mylife', title: 'My Life', icon: UserPlus, sub: 'Photos & Achievements' },
    { id: 'youtube', title: 'YouTube', icon: Youtube, sub: 'Watch video' },
  ];

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="start-menu" onMouseLeave={onClose} onClick={(e) => e.stopPropagation()}>
      <div className="start-menu-header" onClick={handleAdminToggle} style={{ cursor: 'pointer' }}>
        <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height:'48px', background:'white', borderRadius:'4px', border:'2px solid rgba(255,255,255,0.7)', fontSize: '28px' }}>{isAdmin ? '🛡️' : '👨‍💻'}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 'bold', fontSize: '18px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Kapil Diwakar {isAdmin && '(Admin)'}</span>
          <span style={{ fontSize: '12px', opacity: 0.9 }}>Software Engineer</span>
        </div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/WinXP_Start_Button.png" height={32} alt="Win" style={{ marginLeft: 'auto', filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))' }} />
      </div>
      <div className="start-menu-search">
         <Search size={14} style={{ marginLeft: '10px', color: '#666' }} />
         <input 
           type="text" 
           placeholder="Search programs..." 
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           autoFocus
         />
      </div>
      <div className="start-menu-body">
        <div className="start-menu-left">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="start-item" onClick={() => onOpenWindow(item.id)}>
              <item.icon size={24} color="var(--xp-blue)" />
              <div className="start-item-text">
                 <strong>{item.title}</strong>
                 <span>{item.sub}</span>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && <div style={{ padding: '20px', fontSize: '11px', color: '#666' }}>No results found.</div>}
        </div>
        <div className="start-menu-right">
           <div className="start-right-item" onClick={() => window.open('https://github.com/Sachin-Diwakar', '_blank')}><Github size={16} /> My GitHub</div>
           <div className="start-right-item" onClick={() => window.open('https://www.linkedin.com/in/sachin-diwakar-711204266/', '_blank')}><Linkedin size={16} /> My LinkedIn</div>
           <hr style={{ border: 'none', borderTop: '1px solid #7aa2e8', margin: '10px 0' }} />
           <div className="start-right-item" onClick={() => window.open('https://www.instagram.com/sachindiwakar1802/', '_blank')}><Instagram size={16} /> Instagram</div>
           <div className="start-right-item" onClick={() => { onOpenWindow('controlpanel'); onClose(); }}>⚙️ Control Panel</div>
           <div className="start-right-item">Run...</div>
        </div>
      </div>
      <div className="start-menu-footer">
        <div className="footer-button" onClick={onLogOff}>
           <div className="xp-icon logoff"></div> Log Off
        </div>
        <div className="footer-button" onClick={onLogOff}>
           <div className="xp-icon power"></div> Turn Off
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
