import React, { useState, useEffect, useCallback } from 'react';
import { Monitor, FileText, FolderCode, Youtube, Mail, Github, HardDrive, UserPlus, Music, Paintbrush, MessageCircle } from 'lucide-react';
import profileImg from './assets/profile.png';
import './App.css';

// Components
import Window from './components/Window';
import DesktopIcon from './components/DesktopIcon';
import StartMenu from './components/StartMenu';

// Sections
import AboutContent from './components/sections/AboutContent';
import ProjectsContent from './components/sections/ProjectsContent';
import ResumeContent from './components/sections/ResumeContent';
import VaultContent from './components/sections/VaultContent';
import YoutubeContent from './components/sections/YoutubeContent';
import ContactContent from './components/sections/ContactContent';
import MusicContent from './components/sections/MusicContent';
import NotepadContent from './components/sections/NotepadContent';
import PaintContent from './components/sections/PaintContent';
import MyComputerContent from './components/sections/MyComputerContent';
import AchievementsContent from './components/sections/AchievementsContent';
import PhotosContent from './components/sections/PhotosContent';
import PersonalContent from './components/sections/PersonalContent';
import SocialMediaContent from './components/sections/SocialMediaContent';
import AdminPanelContent from './components/sections/AdminPanelContent';

import { API_URL } from './config';

function App() {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [booting, setBooting] = useState(true);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [loggingOff, setLoggingOff] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fuel, setFuel] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [journals, setJournals] = useState([]);
  const [projects, setProjects] = useState([]);

  // Fetch Initial Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achRes, photoRes, journalRes, projRes] = await Promise.all([
          fetch(`${API_URL}/achievements`),
          fetch(`${API_URL}/photos`),
          fetch(`${API_URL}/journals`),
          fetch(`${API_URL}/projects`)
        ]);
        setAchievements(await achRes.json());
        setPhotos(await photoRes.json());
        setJournals(await journalRes.json());
        setProjects(await projRes.json());
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Admin Login Logic
  const handleAdminLogin = async (password) => {
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAdmin(true);
        localStorage.setItem('admin_token', data.token);
        return true;
      }
    } catch (err) {
      console.error("Login error:", err);
    }
    return false;
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.removeItem('admin_token');
      return;
    }
    const pass = prompt("Enter Admin Password:");
    if (pass) {
      handleAdminLogin(pass).then(success => {
        if (!success) alert("Invalid Password");
      });
    }
  };

  // Fuel & Booting Logic
  useEffect(() => {
    const updateFuel = () => {
      const windows = document.querySelectorAll('.window-content');
      let totalScroll = 0;
      let totalHeight = 0;
      windows.forEach(win => {
        totalScroll += win.scrollTop;
        if (win.scrollHeight > win.clientHeight) {
          totalHeight += (win.scrollHeight - win.clientHeight);
        }
      });
      if (totalHeight > 0) {
        const percentage = (totalScroll / totalHeight) * 100;
        setFuel(prev => Math.min(Math.max(prev, percentage), 100));
      }
    };

    const observer = new MutationObserver(() => {
      const windows = document.querySelectorAll('.window-content');
      windows.forEach(win => {
        win.removeEventListener('scroll', updateFuel);
        win.addEventListener('scroll', updateFuel);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    const timer = setTimeout(() => setBooting(false), 3000);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const playSound = (type) => {
    const sounds = {
      startup: 'https://archive.org/download/win-xp-startup/WinXPStartup.mp3',
      shutdown: 'https://archive.org/download/win-xp-shutdown/WinXPShutdown.mp3'
    };
    new Audio(sounds[type]).play().catch(() => { });
  };

  const handleLogOff = () => {
    playSound('shutdown');
    setLoggingOff(true);
    setTimeout(() => {
      setLoggingOff(false);
      setBooting(true);
      setIsLoggedIn(false);
      setOpenWindows([]);
    }, 3000);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    playSound('startup');
  };

  // Window Orchestration
  const getWindowContent = (id) => {
    switch (id) {
      case 'about': return <AboutContent />;
      case 'projects': return <ProjectsContent onBack={() => openWindow('mycomputer')} isAdmin={isAdmin} projects={projects} setProjects={setProjects} />;
      case 'resume': return <ResumeContent fuel={fuel} />;
      case 'social': return <SocialMediaContent />;
      case 'contact': return <ContactContent />;
      case 'music': return <MusicContent />;
      case 'paint': return <PaintContent />;
      case 'notepad': return <NotepadContent />;
      case 'youtube': return <YoutubeContent />;
      case 'mycomputer': return <MyComputerContent onOpenWindow={openWindow} />;
      case 'mylife': return <VaultContent achievements={achievements} setAchievements={setAchievements} photos={photos} setPhotos={setPhotos} journals={journals} setJournals={setJournals} isAdmin={isAdmin} onOpenWindow={openWindow} />;
      case 'achievements': return <AchievementsContent achievements={achievements} setAchievements={setAchievements} isAdmin={isAdmin} onBack={() => openWindow('mylife')} />;
      case 'photos': return <PhotosContent photos={photos} setPhotos={setPhotos} isAdmin={isAdmin} onBack={() => openWindow('mylife')} />;
      case 'journal': return <PersonalContent journals={journals} setJournals={setJournals} isAdmin={isAdmin} onBack={() => openWindow('mylife')} />;
      case 'controlpanel': return <AdminPanelContent projects={projects} setProjects={setProjects} achievements={achievements} setAchievements={setAchievements} photos={photos} setPhotos={setPhotos} journals={journals} setJournals={setJournals} isAdmin={isAdmin} />;
      default: return <div>Content not found</div>;
    }
  };

  const openWindow = (id) => {
    const windowDefs = {
      about: { title: 'My Profile', icon: Monitor },
      projects: { title: 'My Projects', icon: FolderCode },
      resume: { title: 'My Resume', icon: FileText },
      social: { title: 'Social Media', icon: Github },
      contact: { title: 'Contact Me', icon: Mail },
      music: { title: 'Media Player', icon: Music },
      paint: { title: 'Untitled - Paint', icon: Paintbrush },
      notepad: { title: 'Untitled - Notepad', icon: FileText },
      youtube: { title: 'YouTube', icon: Youtube },
      mycomputer: { title: 'My Computer', icon: HardDrive },
      mylife: { title: 'My Life', icon: UserPlus, width: 800, height: 600 },
      achievements: { title: 'My Achievements', icon: UserPlus, width: 800, height: 600 },
      photos: { title: 'My Photos', icon: UserPlus, width: 800, height: 600 },
      journal: { title: 'Personal Journal', icon: UserPlus, width: 800, height: 600 },
      controlpanel: { title: 'Control Panel', icon: HardDrive, width: 850, height: 600 },
    };

    const def = windowDefs[id] || { title: id, icon: Monitor };

    setOpenWindows(prev => {
      const existing = prev.find(w => w.id === id);
      if (existing) {
        return prev.map(w => w.id === id ? { ...w, isMinimized: false } : w);
      }
      const xOffset = prev.length * 20;
      const yOffset = prev.length * 20;
      const width = def.width || 600;
      const height = def.height || 450;

      return [...prev, {
        id,
        title: def.title,
        icon: def.icon,
        isMaximized: false,
        isMinimized: false,
        x: Math.max(0, (window.innerWidth - width) / 2 + xOffset),
        y: Math.max(0, (window.innerHeight - height) / 2 + yOffset)
      }];
    });
    setActiveWindow(id);
    setIsStartOpen(false);
  };

  const closeWindow = (id) => {
    setOpenWindows(prev => {
      const next = prev.filter(w => w.id !== id);
      if (activeWindow === id) setActiveWindow(next[next.length - 1]?.id || null);
      return next;
    });
  };

  const toggleMaximizeWindow = (id) => {
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const toggleMinimizeWindow = (id) => {
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
  };

  if (loggingOff) {
    return (
      <div className="logoff-screen">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2002.svg/1024px-Windows_logo_-_2002.svg.png" width={80} alt="XP Logo" />
        <h3>Logging off...</h3>
      </div>
    );
  }

  if (booting) {
    return (
      <div className="boot-screen">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2002.svg/1024px-Windows_logo_-_2002.svg.png" width={100} alt="XP Logo" />
        <h2>Windows XP Professional</h2>
        <div className="boot-loader">
          <div className="boot-bar" />
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <div className="login-container">
          <div className="login-brand">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2002.svg/1024px-Windows_logo_-_2002.svg.png" width={60} alt="XP" />
            <h1>To begin, click your user name</h1>
          </div>
          <div onClick={handleLogin} className="login-account">
            <div className="login-avatar">
              <img src={profileImg} alt="User" width="100%" />
            </div>
            <div className="login-info">
              <div className="login-name">Kapil Diwakar</div>
              <div className="login-status">1 message waiting</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="xp-container" onClick={() => setIsStartOpen(false)}>
      <div className="desktop">
        <DesktopIcon name="My Computer" icon={HardDrive} onOpen={() => openWindow('mycomputer')} initialPos={{ x: 10, y: 10 }} />
        <DesktopIcon name="Social Media" icon={Github} onOpen={() => openWindow('social')} initialPos={{ x: 10, y: 100 }} />
        <DesktopIcon name="My Profile" icon={Monitor} onOpen={() => openWindow('about')} initialPos={{ x: 10, y: 190 }} />
        <DesktopIcon name="My Projects" icon={FolderCode} onOpen={() => openWindow('projects')} initialPos={{ x: 10, y: 280 }} />
        <DesktopIcon name="My Resume" icon={FileText} onOpen={() => openWindow('resume')} initialPos={{ x: 10, y: 370 }} />
        <DesktopIcon name="Contact Me" icon={Mail} onOpen={() => openWindow('contact')} initialPos={{ x: 10, y: 460 }} />
        <DesktopIcon name="My Life" icon={UserPlus} onOpen={() => openWindow('mylife')} initialPos={{ x: 10, y: 550 }} />

        <DesktopIcon name="Media Player" icon={Music} onOpen={() => openWindow('music')} initialPos={{ x: 100, y: 10 }} />
        <DesktopIcon name="Paint" icon={Paintbrush} onOpen={() => openWindow('paint')} initialPos={{ x: 100, y: 100 }} />
        <DesktopIcon name="Notepad" icon={FileText} onOpen={() => openWindow('notepad')} initialPos={{ x: 100, y: 190 }} />
        <DesktopIcon name="YouTube" icon={Youtube} onOpen={() => openWindow('youtube')} initialPos={{ x: 100, y: 280 }} />
        <DesktopIcon name="Control Panel" icon={HardDrive} onOpen={() => openWindow('controlpanel')} initialPos={{ x: 100, y: 370 }} />

        <div className="desktop-name-overlay">Kapil Diwakar</div>

        {openWindows.map(w => (
          <Window
            key={w.id}
            {...w}
            active={activeWindow === w.id}
            onFocus={setActiveWindow}
            onClose={closeWindow}
            onMaximize={toggleMaximizeWindow}
            onMinimize={toggleMinimizeWindow}
            initialPos={{ x: w.x, y: w.y }}
          >
            {getWindowContent(w.id)}
          </Window>
        ))}
      </div>

      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenWindow={openWindow}
        onLogOff={handleLogOff}
        fuel={fuel}
        isAdmin={isAdmin}
        handleAdminToggle={handleAdminToggle}
      />

      <div className="taskbar">
        <div className="start-button" onClick={(e) => { e.stopPropagation(); setIsStartOpen(!isStartOpen); }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/WinXP_Start_Button.png" height={20} alt="" />
          start
        </div>
        <div className="taskbar-items">
          {openWindows.map(w => (
            <div
              key={w.id}
              className={`taskbar-item ${activeWindow === w.id && !w.isMinimized ? 'active' : ''}`}
              onClick={() => {
                if (w.isMinimized) {
                  toggleMinimizeWindow(w.id);
                  setActiveWindow(w.id);
                } else if (activeWindow === w.id) {
                  toggleMinimizeWindow(w.id);
                } else {
                  setActiveWindow(w.id);
                }
              }}
            >
              <w.icon size={14} />
              <span>{w.title}</span>
            </div>
          ))}
        </div>
        <div className="tray">
          <div className="fuel-gauge">
            <div className="fuel-track">
              <div className="fuel-bar" style={{ width: `${fuel}%`, background: fuel > 20 ? '#228B22' : '#d32f2f' }} />
            </div>
            <span>{Math.round(fuel)}%</span>
          </div>
          <div className="tray-icon" title="I'm Available for Work!">
            <MessageCircle size={14} />
          </div>
          <div className="clock">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
