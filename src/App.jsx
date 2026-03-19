import React, { useState, useEffect } from 'react';
import { Monitor, FileText, FolderCode, Youtube, Mail, Github, Linkedin, Search, X, Minus, Square, Music, Paintbrush } from 'lucide-react';
import Draggable from 'react-draggable';
import './App.css';

const Window = ({ title, icon: Icon, children, onClose, active, onFocus, id, initialPos }) => {
  const nodeRef = React.useRef(null);
  return (
    <Draggable nodeRef={nodeRef} handle=".title-bar" bounds="parent" defaultPosition={initialPos} onMouseDown={() => onFocus(id)}>
      <div ref={nodeRef} className={`window ${active ? 'active' : ''}`} style={{ zIndex: active ? 100 : 10, width: '600px', height: '450px', position: 'absolute' }}>
        <div className="title-bar">
          <div style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
             {Icon && <Icon size={16} />}
          </div>
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <div className="title-bar-button"><Minus size={12} /></div>
            <div className="title-bar-button"><Square size={10} /></div>
            <div className="title-bar-button close" onClick={(e) => { e.stopPropagation(); onClose(id); }}><X size={14} /></div>
          </div>
        </div>
        <div className="window-content">
          {children}
        </div>
      </div>
    </Draggable>
  );
};

const DesktopIcon = ({ name, icon: Icon, onOpen }) => {
  const playHover = () => {
    const audio = new Audio('https://www.winhistory.de/more/winxp/mp3/click.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  return (
    <div className="desktop-icon" onDoubleClick={onOpen} onClick={onOpen} onMouseEnter={playHover}>
      <Icon size={32} />
      <span>{name}</span>
    </div>
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
      const newWindow = { id, title, icon: Icon, content };
      setOpenWindows([...openWindows, newWindow]);
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
        <DesktopIcon name="My Profile" icon={Monitor} onOpen={() => openWindow('about', 'My Profile', Monitor, <AboutContent />)} />
        <DesktopIcon name="My Projects" icon={FolderCode} onOpen={() => openWindow('projects', 'My Projects', FolderCode, <ProjectsContent />)} />
        <DesktopIcon name="My Resume" icon={FileText} onOpen={() => openWindow('resume', 'My Resume', FileText, <ResumeContent />)} />
        <DesktopIcon name="Contact Me" icon={Mail} onOpen={() => openWindow('contact', 'Contact Me', Mail, <ContactContent />)} />
        <DesktopIcon name="Media Player" icon={Music} onOpen={() => openWindow('music', 'Media Player', Music, <MusicContent />)} />
        <DesktopIcon name="Paint" icon={Paintbrush} onOpen={() => openWindow('paint', 'Untitled - Paint', Paintbrush, <PaintContent />)} />
        <DesktopIcon name="Notepad" icon={FileText} onOpen={() => openWindow('notepad', 'Untitled - Notepad', FileText, <NotepadContent />)} />
        <DesktopIcon name="YouTube" icon={Youtube} onOpen={() => openWindow('youtube', 'YouTube', Youtube, <YoutubeContent />)} />
        
        {openWindows.map(w => (
          <Window 
            key={w.id} 
            {...w} 
            active={activeWindow === w.id} 
            onFocus={setActiveWindow} 
            onClose={closeWindow}
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
              className={`taskbar-item ${activeWindow === w.id ? 'active' : ''}`}
              onClick={() => setActiveWindow(w.id)}
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
        <div className="user-avatar">SD</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 'bold' }}>Sachin Diwakar</span>
          <span style={{ fontSize: '10px', opacity: 0.8 }}>Professional</span>
        </div>
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
  <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
    <div className="window-sidebar">
      <div className="sidebar-section">
        <div className="sidebar-header blue">Social Links</div>
        <div className="sidebar-body">
          <ul className="sidebar-list">
             <li><img src="https://img.icons8.com/color/48/instagram-new.png" width={16} alt=""/> Instagram</li>
             <li><img src="https://img.icons8.com/ios-filled/50/github.png" width={16} alt=""/> GitHub</li>
             <li><img src="https://img.icons8.com/color/48/linkedin.png" width={16} alt=""/> LinkedIn</li>
          </ul>
        </div>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-header blue">Skills</div>
        <div className="sidebar-body">
          <ul className="sidebar-list">
             <li><span style={{ color: 'orange' }}>★</span> UI Design</li>
             <li><span style={{ color: 'blue' }}>★</span> React Development</li>
             <li><span style={{ color: 'purple' }}>★</span> AI Integration</li>
          </ul>
        </div>
      </div>
    </div>
    <div style={{ flex: 1, padding: '30px', overflowY: 'auto', background: 'white' }}>
      <h1 style={{ fontSize: '32px', margin: '0 0 20px 0', color: '#333' }}>About Me</h1>
      <p style={{ lineHeight: '1.6', fontSize: '14px', color: '#444' }}>
        I me Sachin Diwakar, a specialized engineer focused on high-performance automation and scalable AI workflows.
        <br/><br/>
        My journey started with a passion for digital craftsmanship, building systems that don't just work—they excel.
        <br/><br/>
        From architecting neural platforms to engineering real-time analytics, I focus on precision and reliability.
      </p>
    </div>
  </div>
);

const ProjectsContent = () => {
  const projects = [
    { name: "Global-AI-Assistant", date: "2023-11-12", size: "2.4 MB" },
    { name: "Finance-Tracker-API", date: "2024-01-05", size: "1.8 MB" },
    { name: "Portfolio-3D-V1", date: "2024-02-20", size: "5.1 MB" },
    { name: "Enterprise-Auth-System", date: "2023-09-15", size: "900 KB" },
    { name: "Scalable-Data-Pipeline", date: "2024-03-01", size: "12.2 MB" },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="explorer-toolbar">
         <div className="toolbar-btn"><span style={{ color: 'green' }}>←</span> Back</div>
         <div className="toolbar-btn">Forward <span style={{ color: '#999' }}>→</span></div>
         <div className="toolbar-btn"><Monitor size={14} /> View</div>
      </div>
      <div className="explorer-address">
         Address: C:\Documents and Settings\Sachin\My Projects
      </div>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <table className="explorer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date Modified</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={i}>
                <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FolderCode size={16} color="#fcd34d" /> {p.name}
                </td>
                <td>{p.date}</td>
                <td>{p.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        .explorer-toolbar { display: flex; padding: 5px; background: var(--xp-bg-gray); border-bottom: 1px solid #ccc; gap: 10px; }
        .toolbar-btn { font-size: 11px; padding: 3px 8px; border: 1px solid transparent; cursor: pointer; display: flex; alignItems: center; gap: 5px; }
        .toolbar-btn:hover { border: 1px solid #999; background: #fff; }
        .explorer-address { padding: 4px 10px; background: white; border-bottom: 1px solid #ccc; font-size: 11px; color: #666; }
        .explorer-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .explorer-table th { text-align: left; padding: 5px 10px; background: #eee; border: 1px solid #ccc; font-weight: normal; }
        .explorer-table td { padding: 5px 10px; border-bottom: 1px solid #f0f0f0; }
        .explorer-table tr:hover { background: #316ac5; color: white; }
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

export default App;
