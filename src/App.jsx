import React, { useState, useEffect } from 'react';
import { Monitor, FileText, FolderCode, Youtube, Mail, Github, Linkedin, Search, X, Minus, Square, Music, Paintbrush, Briefcase, Award, GraduationCap, Cpu, Database, Server, Code, HardDrive, Folder } from 'lucide-react';
import Draggable from 'react-draggable';
import './App.css';

const Window = ({ title, icon: Icon, children, onClose, active, onFocus, id, initialPos, isMaximized, isMinimized, onMaximize, onMinimize }) => {
  const nodeRef = React.useRef(null);
  
  if (isMinimized) return null;

  const maximizedStyle = {
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100% - 30px)',
    transform: 'translate(0px, 0px)',
    zIndex: active ? 100 : 10,
    position: 'absolute'
  };

  const normalStyle = {
    zIndex: active ? 100 : 10,
    width: 'min(600px, 100vw)', 
    height: 'min(450px, calc(100vh - 30px))', 
    position: 'absolute' 
  };

  return (
    <Draggable nodeRef={nodeRef} handle=".title-bar" bounds="parent" defaultPosition={initialPos} onMouseDown={() => onFocus(id)} disabled={isMaximized}>
      <div ref={nodeRef} className={`window ${active ? 'active' : ''}`} style={isMaximized ? maximizedStyle : normalStyle}>
        <div className="title-bar" onDoubleClick={() => onMaximize(id)}>
          <div style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
             {Icon && <Icon size={16} />}
          </div>
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <div className="title-bar-button" onClick={(e) => { e.stopPropagation(); onMinimize(id); }}><Minus size={12} /></div>
            <div className="title-bar-button" onClick={(e) => { e.stopPropagation(); onMaximize(id); }}><Square size={10} /></div>
            <div className="title-bar-button close" onClick={(e) => { e.stopPropagation(); onClose(id); }}><X size={14} /></div>
          </div>
        </div>
        <div className="window-content" style={{ display: 'block', height: 'calc(100% - 30px)', overflow: 'hidden' }}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

const DesktopIcon = ({ name, icon: Icon, onOpen, initialPos }) => {
  const nodeRef = React.useRef(null);
  const playHover = () => {
    const audio = new Audio('https://www.winhistory.de/more/winxp/mp3/click.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  return (
    <Draggable nodeRef={nodeRef} bounds="parent" defaultPosition={initialPos}>
      <div ref={nodeRef} className="desktop-icon" onDoubleClick={onOpen} onClick={onOpen} onMouseEnter={playHover} style={{ position: 'absolute' }}>
        <Icon size={32} />
        <span>{name}</span>
      </div>
    </Draggable>
  );
};

function App() {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [booting, setBooting] = useState(true);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [loggingOff, setLoggingOff] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const playSound = (type) => {
    const sounds = {
      startup: 'https://archive.org/download/win-xp-startup/WinXPStartup.mp3',
      shutdown: 'https://archive.org/download/win-xp-shutdown/WinXPShutdown.mp3',
      error: 'https://archive.org/download/win-xp-error/WinXPError.mp3'
    };
    const audio = new Audio(sounds[type]);
    audio.play().catch(e => console.log("Sound blocked by browser"));
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

  const openWindow = (id, title, Icon, content) => {
    if (!openWindows.find(w => w.id === id)) {
      const newWindow = { id, title, icon: Icon, content, isMaximized: false, isMinimized: false };
      setOpenWindows([...openWindows, newWindow]);
    } else {
      // Unminimize if it's minimized
      setOpenWindows(openWindows.map(w => w.id === id ? { ...w, isMinimized: false } : w));
    }
    setActiveWindow(id);
    setIsStartOpen(false);
  };

  const closeWindow = (id) => {
    const newWindows = openWindows.filter(w => w.id !== id);
    setOpenWindows(newWindows);
    if (activeWindow === id) {
      setActiveWindow(newWindows[newWindows.length - 1]?.id || null);
    }
  };

  const toggleMaximizeWindow = (id) => {
    setOpenWindows(openWindows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const toggleMinimizeWindow = (id) => {
    setOpenWindows(openWindows.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
  };

  if (loggingOff) {
    return (
      <div style={{ height: '100vh', background: 'linear-gradient(to right, #245edb, #3b8cf8, #245edb)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2002.svg/1024px-Windows_logo_-_2002.svg.png" width={80} alt="XP Logo" />
        <h3 style={{ color: 'white', fontFamily: 'sans-serif', marginTop: '20px', fontWeight: 'normal' }}>Logging off...</h3>
      </div>
    );
  }

  if (booting) {
    return (
      <div style={{ height: '100vh', background: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2002.svg/1024px-Windows_logo_-_2002.svg.png" width={100} alt="XP Logo" />
        <h2 style={{ color: 'white', fontFamily: 'sans-serif', marginTop: '20px' }}>Windows XP Professional</h2>
        <div style={{ width: '200px', height: '15px', border: '2px solid #555', marginTop: '30px', position: 'relative', overflow: 'hidden' }}>
          <div className="boot-bar" style={{ 
            height: '100%', 
            width: '40px', 
            background: 'linear-gradient(to right, #245edb, #3b8cf8, #245edb)', 
            position: 'absolute',
            animation: 'bootMove 1.5s infinite linear'
          }} />
        </div>
        <style>{`
          @keyframes bootMove {
            0% { left: -40px; }
            100% { left: 200px; }
          }
        `}</style>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', background: 'linear-gradient(to bottom, #5a7edc 0%, #4a67d6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', color: 'white' }}>
           <div style={{ textAlign: 'right', borderRight: '1px solid rgba(255,255,255,0.3)', paddingRight: '30px' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2002.svg/1024px-Windows_logo_-_2002.svg.png" width={60} alt="XP" />
              <h1 style={{ fontSize: '24px', margin: '10px 0 0 0', fontWeight: 'normal' }}>To begin, click your user name</h1>
           </div>
           <div 
             onClick={handleLogin}
             style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', padding: '10px', borderRadius: '5px', transition: 'background 0.2s' }}
             className="login-account"
           >
              <div style={{ width: '50px', height: '50px', border: '2px solid white', borderRadius: '4px', overflow: 'hidden' }}>
                 <img src="https://i.pravatar.cc/150?u=sachin" alt="User" width="100%" />
              </div>
              <div style={{ textAlign: 'left' }}>
                 <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Sachin Diwakar</div>
                 <div style={{ fontSize: '12px', opacity: 0.8 }}>1 message waiting</div>
              </div>
           </div>
        </div>
        <style>{`.login-account:hover { background: rgba(255,255,255,0.1); }`}</style>
      </div>
    );
  }

  return (
    <div className="xp-container" onClick={() => setIsStartOpen(false)}>
      <div className="desktop">
        <DesktopIcon name="My Computer" icon={HardDrive} onOpen={() => openWindow('mycomputer', 'My Computer', HardDrive, <MyComputerContent onOpenWindow={openWindow} />)} initialPos={{x:10, y:10}} />
        <DesktopIcon name="Social Media" icon={Github} onOpen={() => openWindow('social', 'Social Media', Github, <SocialMediaContent />)} initialPos={{x:10, y:100}} />
        <DesktopIcon name="My Profile" icon={Monitor} onOpen={() => openWindow('about', 'My Profile', Monitor, <AboutContent />)} initialPos={{x:10, y:190}} />
        <DesktopIcon name="My Projects" icon={FolderCode} onOpen={() => openWindow('projects', 'My Projects', FolderCode, <ProjectsContent />)} initialPos={{x:10, y:280}} />
        <DesktopIcon name="My Resume" icon={FileText} onOpen={() => openWindow('resume', 'My Resume', FileText, <ResumeContent />)} initialPos={{x:10, y:370}} />
        <DesktopIcon name="Contact Me" icon={Mail} onOpen={() => openWindow('contact', 'Contact Me', Mail, <ContactContent />)} initialPos={{x:10, y:460}} />
        
        <DesktopIcon name="Media Player" icon={Music} onOpen={() => openWindow('music', 'Media Player', Music, <MusicContent />)} initialPos={{x:100, y:10}} />
        <DesktopIcon name="Paint" icon={Paintbrush} onOpen={() => openWindow('paint', 'Untitled - Paint', Paintbrush, <PaintContent />)} initialPos={{x:100, y:100}} />
        <DesktopIcon name="Notepad" icon={FileText} onOpen={() => openWindow('notepad', 'Untitled - Notepad', FileText, <NotepadContent />)} initialPos={{x:100, y:190}} />
        <DesktopIcon name="YouTube" icon={Youtube} onOpen={() => openWindow('youtube', 'YouTube', Youtube, <YoutubeContent />)} initialPos={{x:100, y:280}} />
        
        {openWindows.map(w => (
          <Window 
            key={w.id} 
            {...w} 
            active={activeWindow === w.id} 
            onFocus={setActiveWindow} 
            onClose={closeWindow}
            onMaximize={toggleMaximizeWindow}
            onMinimize={toggleMinimizeWindow}
            initialPos={{ x: 50 + openWindows.indexOf(w) * 20, y: 50 + openWindows.indexOf(w) * 20 }}
          >
            {w.content}
          </Window>
        ))}
      </div>

      <StartMenu 
        isOpen={isStartOpen} 
        onClose={() => setIsStartOpen(false)} 
        onOpenWindow={openWindow} 
        onLogOff={handleLogOff} 
      />

      <div className="taskbar">
        <div className="start-button" onClick={(e) => { e.stopPropagation(); setIsStartOpen(!isStartOpen); }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/WinXP_Start_Button.png" height={20} alt="Start" />
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
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

const StartMenu = ({ isOpen, onClose, onOpenWindow, onLogOff }) => {
  const [search, setSearch] = useState('');
  if (!isOpen) return null;

  const items = [
    { id: 'about', title: 'About Me', icon: Monitor, sub: 'Browse About Me', content: <AboutContent /> },
    { id: 'projects', title: 'My Projects', icon: FolderCode, sub: 'View project files', content: <ProjectsContent /> },
    { id: 'resume', title: 'My Resume', icon: FileText, sub: 'View/Print Resume', content: <ResumeContent /> },
    { id: 'youtube', title: 'YouTube', icon: Youtube, sub: 'Watch video', content: <YoutubeContent /> },
  ];

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="start-menu" onMouseLeave={onClose} onClick={(e) => e.stopPropagation()}>
      <div className="start-menu-header">
        <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height:'48px', background:'white', borderRadius:'4px', border:'2px solid rgba(255,255,255,0.7)', fontSize: '28px' }}>👨‍💻</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 'bold', fontSize: '18px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Sachin Diwakar</span>
          <span style={{ fontSize: '12px', opacity: 0.9 }}>Computer Engineer</span>
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
            <div key={idx} className="start-item" onClick={() => onOpenWindow(item.id, item.title, item.icon, item.content)}>
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
           <div className="start-right-item" onClick={() => window.open('https://linkedin.com/in/sachindiwakar', '_blank')}><Linkedin size={16} /> My LinkedIn</div>
           <hr style={{ border: 'none', borderTop: '1px solid #7aa2e8', margin: '10px 0' }} />
           <div className="start-right-item">Control Panel</div>
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

const AboutContent = () => (
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: 'white' }}>
    <div className="window-sidebar" style={{ width: '200px', background: 'linear-gradient(to bottom, #7aa2e8, #3b8cf8)', color: 'white', padding: '20px', overflowY: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#3b8cf8' }}>👨‍💻</div>
        <h3 style={{ marginTop: '10px' }}>Sachin Diwakar</h3>
        <p style={{ fontSize: '12px', opacity: 0.9 }}>Full-Stack & Data Engineer</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: '5px', marginBottom: '10px' }}>Contact & Links</h4>
        <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14}/> Contact</div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Linkedin size={14}/> LinkedIn</div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Github size={14}/> GitHub</div>
        </div>
      </div>

      <div>
        <h4 style={{ borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: '5px', marginBottom: '10px' }}>Top Skills</h4>
        <ul style={{ fontSize: '12px', paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
           <li>Node.js, Express, FastAPI</li>
           <li>React, JS, HTML/CSS</li>
           <li>MongoDB, MySQL</li>
           <li>Data Engineering & ETL</li>
        </ul>
      </div>
    </div>
    
    <div style={{ flex: 1, padding: '30px', overflowY: 'auto', color: '#333' }}>
      <h1 style={{ fontSize: '28px', color: '#245edb', borderBottom: '2px solid #245edb', paddingBottom: '10px', marginBottom: '20px' }}>Professional Profile</h1>
      
      <p style={{ lineHeight: '1.6', fontSize: '14px', marginBottom: '20px' }}>
        I am a <strong>full-stack developer</strong> and <strong>data-focused engineer</strong> with a background in Electronics & Communication Engineering. I specialize in building robust backend systems, dynamic frontends, and automated data processing pipelines.
      </p>

      <h3 style={{ color: '#245edb', display: 'flex', alignItems: 'center', gap: '10px', margin: '25px 0 15px' }}><Briefcase size={20} /> Experience</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h4 style={{ margin: 0, fontSize: '16px' }}>Research Intern - IIT Delhi</h4>
          <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>📍 Delhi, India</span>
        </div>
        <ul style={{ fontSize: '13px', marginTop: '10px', paddingLeft: '20px', lineHeight: '1.5' }}>
          <li>Developed real-time data pipelines and sensor data acquisition systems.</li>
          <li>Integrated hardware and software using STM32 microcontrollers and embedded systems.</li>
        </ul>
      </div>

      <h3 style={{ color: '#245edb', display: 'flex', alignItems: 'center', gap: '10px', margin: '25px 0 15px' }}><Cpu size={20} /> Technical Arsenal</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '13px' }}>
        <div>
          <strong>Backend & APIs:</strong><br/>Node.js, Express, FastAPI, REST integrations
        </div>
        <div>
          <strong>Frontend:</strong><br/>React, HTML, CSS, JavaScript
        </div>
        <div>
          <strong>Data & DB:</strong><br/>MongoDB, MySQL, ETL Pipelines, Web Scraping (Python)
        </div>
        <div>
          <strong>Core CS:</strong><br/>DSA, OOP, DBMS, OS, Computer Networks, Gen AI Basics
        </div>
      </div>

      <h3 style={{ color: '#245edb', display: 'flex', alignItems: 'center', gap: '10px', margin: '25px 0 15px' }}><Award size={20} /> Leadership</h3>
      <p style={{ fontSize: '13px', lineHeight: '1.5' }}>
        <strong>President of Mental Health Club:</strong> Led a team to organize events and workshops promoting mental well-being, managing end-to-end event execution and cross-functional teams.
      </p>
    </div>
  </div>
);

const ProjectsContent = () => {
  const projects = [
    { name: "AI Code Generator", date: "2024-03-10", size: "React, Node, GenAI", icon: Code },
    { name: "Voice-Controlled Wheelchair", date: "2023-11-20", size: "Embedded C, IoT", icon: Cpu },
    { name: "Automated ETL Pipeline", date: "2024-01-15", size: "Python, SQL", icon: Database },
    { name: "Real-time Sensor API", date: "2023-08-05", size: "FastAPI, STM32", icon: Server },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <div className="explorer-toolbar">
         <div className="toolbar-btn"><span style={{ color: 'green' }}>←</span> Back</div>
         <div className="toolbar-btn">Search</div>
         <div className="toolbar-btn"><FolderCode size={14} /> Folders</div>
      </div>
      <div className="explorer-address" style={{ padding: '5px 10px', background: '#f0f0f0', borderBottom: '1px solid #ccc', fontSize: '12px' }}>
         <strong>Address:</strong> C:\Users\Sachin\My Projects
      </div>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <h2 style={{ color: '#245edb', margin: '0 0 15px 0', display: 'flex', alignItems: 'center', gap: '10px' }}><FolderCode size={24} /> Featured Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '15px' }}>
          {projects.map((p, i) => (
            <div key={i} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', display: 'flex', alignItems: 'flex-start', gap: '15px', cursor: 'pointer', transition: 'background 0.2s', background: 'white' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f5f8ff'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
              <div style={{ padding: '10px', background: '#eef4ff', borderRadius: '8px', color: '#245edb' }}>
                <p.icon size={24} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{p.name}</h4>
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px' }}>{p.date}</div>
                <div style={{ fontSize: '12px', background: '#eee', padding: '2px 6px', borderRadius: '10px', display: 'inline-block' }}>{p.size}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .explorer-toolbar { display: flex; padding: 5px; background: #ece9d8; border-bottom: 1px solid #ccc; gap: 10px; }
        .toolbar-btn { font-size: 11px; padding: 3px 8px; border: 1px solid transparent; cursor: pointer; display: flex; alignItems: center; gap: 5px; }
        .toolbar-btn:hover { border: 1px solid #999; background: #fff; }
      `}</style>
    </div>
  );
};

const ResumeContent = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <img src="https://via.placeholder.com/400x500" alt="Resume Preview" style={{ border: '1px solid #ccc', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }} />
    <div style={{ marginTop: '20px' }}>
       <button className="xp-button" onClick={() => window.print()}>Print Resume</button>
       <button className="xp-button" style={{ marginLeft: '10px' }}>Download PDF</button>
    </div>
    <style>{`
      .xp-button {
        padding: 5px 15px;
        background: #eee;
        border: 1px solid #999;
        box-shadow: 1px 1px 0 #fff inset;
        cursor: pointer;
      }
      .xp-button:active { background: #ddd; box-shadow: none; }
    `}</style>
  </div>
);

const YoutubeContent = () => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ height: '30px', background: '#ccc', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '10px' }}>
      <Search size={14} /> Address: http://youtube.com/my-portfolio
    </div>
    <div style={{ flex: 1, position: 'relative' }}>
      <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

const ContactContent = () => (
  <div style={{ padding: '30px', textAlign: 'center', background: 'white', height: '100%' }}>
    <h2>Get In Touch</h2>
    <p style={{ marginTop: '20px' }}>Feel free to send me an email!</p>
    <a href="mailto:hello@sachindiwakar.com" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', background: '#0033cc', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Send Email</a>
  </div>
);

const MusicContent = () => (
  <div style={{ padding: '30px', textAlign: 'center', background: 'black', color: 'white', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <h2 style={{ color: '#00f2fe' }}>Windows Media Player</h2>
    <div style={{ margin: '30px 0', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, #333, #111)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px #00f2fe' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'black', border: '2px solid #555' }}></div>
    </div>
    <audio controls style={{ width: '80%' }}>
      <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
    </audio>
  </div>
);

const NotepadContent = () => {
  const [text, setText] = useState('');
  
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <div style={{ borderBottom: '1px solid #ccc', padding: '2px 5px', backgroundColor: '#f0f0f0', display: 'flex', gap: '10px', fontSize: '12px' }}>
        <span style={{ cursor: 'pointer' }}>File</span>
        <span style={{ cursor: 'pointer' }}>Edit</span>
        <span style={{ cursor: 'pointer' }}>Format</span>
        <span style={{ cursor: 'pointer' }}>View</span>
        <span style={{ cursor: 'pointer' }}>Help</span>
      </div>
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, border: 'none', outline: 'none', resize: 'none', padding: '5px', fontFamily: 'Consolas, monospace', fontSize: '14px' }}
        spellCheck="false"
      />
    </div>
  );
};

const PaintContent = () => {
  const canvasRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.parentElement.clientWidth - 10;
      canvas.height = canvas.parentElement.clientHeight - 10;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
       const ctx = canvas.getContext('2d');
       ctx.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ece9d8' }}>
      <div style={{ height: '35px', display: 'flex', gap: '15px', alignItems: 'center', padding: '0 10px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <label>Color:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '30px', height: '20px', padding: '0', border: '1px solid #999' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <label>Brush:</label>
          <input type="range" min="1" max="30" value={brushSize} onChange={(e) => setBrushSize(e.target.value)} style={{ width: '80px' }} />
        </div>
        <button onClick={clearCanvas} style={{ padding: '2px 8px', cursor: 'pointer', border: '1px solid #999', background: '#e4eaf5', borderRadius: '3px' }}>Clear Canvas</button>
      </div>
      <div style={{ flex: 1, backgroundColor: '#808080', padding: '5px', overflow: 'hidden' }}>
        <canvas 
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          style={{ background: 'white', cursor: 'crosshair', boxShadow: '2px 2px 5px rgba(0,0,0,0.3)' }} 
        />
      </div>
    </div>
  );
};

const MyComputerContent = ({ onOpenWindow }) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <div className="explorer-toolbar" style={{ display: 'flex', padding: '5px', background: '#ece9d8', borderBottom: '1px solid #ccc', gap: '10px' }}>
         <div className="toolbar-btn" style={{ fontSize: '11px', padding: '3px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ color: 'green' }}>←</span> Back</div>
         <div className="toolbar-btn" style={{ fontSize: '11px', padding: '3px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><Search size={14} /> Search</div>
         <div className="toolbar-btn" style={{ fontSize: '11px', padding: '3px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><Folder size={14} /> Folders</div>
      </div>
      <div className="explorer-address" style={{ padding: '5px 10px', background: '#f0f0f0', borderBottom: '1px solid #ccc', fontSize: '12px' }}>
         <strong>Address:</strong> My Computer
      </div>
      
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '14px', borderBottom: '1px solid #87b2e8', paddingBottom: '5px', color: '#245edb', marginBottom: '15px' }}>Files Stored on This Computer</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
           <div className="list-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px' }} onDoubleClick={() => onOpenWindow('achievements', 'Achievements', Award, <AchievementsContent />)}>
              <Folder size={32} color="#fcd34d" />
              <div>
                 <strong>Achievements</strong>
              </div>
           </div>
           <div className="list-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px' }} onDoubleClick={() => onOpenWindow('social', 'Social Media', Github, <SocialMediaContent />)}>
              <Folder size={32} color="#fcd34d" />
              <div>
                 <strong>Social Media</strong>
              </div>
           </div>
        </div>

        <h3 style={{ fontSize: '14px', borderBottom: '1px solid #87b2e8', paddingBottom: '5px', color: '#245edb', marginBottom: '15px' }}>Hard Disk Drives</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
           <div className="list-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px' }}>
              <HardDrive size={32} color="#666" />
              <div>
                 <strong>Local Disk (C:)</strong>
                 <div style={{ fontSize: '11px', color: '#666' }}>NTFS</div>
              </div>
           </div>
           <div className="list-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px' }} onDoubleClick={() => onOpenWindow('projects', 'My Projects', FolderCode, <ProjectsContent />)}>
              <HardDrive size={32} color="#666" />
              <div>
                 <strong>Projects (D:)</strong>
                 <div style={{ fontSize: '11px', color: '#666' }}>FAT32</div>
              </div>
           </div>
        </div>
        
        <h3 style={{ fontSize: '14px', borderBottom: '1px solid #87b2e8', paddingBottom: '5px', color: '#245edb', marginBottom: '15px', marginTop: '30px' }}>Devices with Removable Storage</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
           <div className="list-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ccc', border: '2px solid #999' }}></div>
              <div>
                 <strong>CD Drive (E:)</strong>
              </div>
           </div>
        </div>

      </div>
      <style>{`
        .list-item:hover { background: #316ac5; border-radius: 3px; }
        .list-item:hover strong, .list-item:hover div { color: white !important; }
      `}</style>
    </div>
  );
};

const AchievementsContent = () => (
  <div style={{ padding: '30px', background: 'white', height: '100%', overflowY: 'auto' }}>
    <h1 style={{ color: '#245edb', borderBottom: '2px solid #245edb', paddingBottom: '10px' }}>My Achievements</h1>
    <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
      <li style={{ background: '#f5f8ff', padding: '15px', borderLeft: '4px solid #245edb', marginBottom: '15px' }}>
        <strong><Award size={16} /> President, Mental Health Club</strong>
        <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#444' }}>Led a team to organize massive events, workshops, and promote mental well-being on campus.</p>
      </li>
      <li style={{ background: '#f5f8ff', padding: '15px', borderLeft: '4px solid #245edb', marginBottom: '15px' }}>
        <strong><Award size={16} /> IIT Delhi Research Intern</strong>
        <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#444' }}>Successfully integrated STM32 microcontrollers with real-time data pipelines.</p>
      </li>
      <li style={{ background: '#f5f8ff', padding: '15px', borderLeft: '4px solid #245edb', marginBottom: '15px' }}>
        <strong><Award size={16} /> Data Engineering MVP</strong>
        <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#444' }}>Developed comprehensive ETL scripts outperforming baseline latency standards.</p>
      </li>
    </ul>
  </div>
);

const SocialMediaContent = () => (
    <div style={{ padding: '30px', background: 'white', height: '100%', overflowY: 'auto', textAlign: 'center' }}>
      <h2 style={{ color: '#245edb', marginBottom: '30px' }}>Connect With Me</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        <a href="https://github.com/Sachin-Diwakar" target="_blank" style={{ textDecoration: 'none', color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px', transition: 'transform 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <Github size={48} />
          <strong style={{ marginTop: '10px' }}>GitHub</strong>
        </a>
        <a href="https://linkedin.com/in/sachindiwakar" target="_blank" style={{ textDecoration: 'none', color: '#0077b5', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px', transition: 'transform 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <Linkedin size={48} />
          <strong style={{ marginTop: '10px' }}>LinkedIn</strong>
        </a>
        <a href="mailto:hello@sachindiwakar.com" style={{ textDecoration: 'none', color: '#ea4335', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px', transition: 'transform 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <Mail size={48} />
          <strong style={{ marginTop: '10px' }}>Email</strong>
        </a>
      </div>
    </div>
);

export default App;
