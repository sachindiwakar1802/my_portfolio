import React from 'react';
import { HardDrive, Folder, Search, Award, Image as ImageIcon, FolderCode } from 'lucide-react';

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
           <div className="list-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px' }} onDoubleClick={() => onOpenWindow('achievements')}>
              <Folder size={32} color="#fcd34d" />
              <div>
                 <strong>Achievements</strong>
              </div>
           </div>
           <div className="list-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px' }} onDoubleClick={() => onOpenWindow('photos')}>
              <Folder size={32} color="#fcd34d" />
              <div>
                 <strong>My Photos</strong>
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
           <div className="list-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px' }} onDoubleClick={() => onOpenWindow('projects')}>
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

export default MyComputerContent;
