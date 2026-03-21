import React from 'react';
import { UserPlus, Folder, Image as ImageIcon, Award } from 'lucide-react';
import PhotosContent from './PhotosContent';
import AchievementsContent from './AchievementsContent';
import PersonalContent from './PersonalContent';

const VaultContent = ({ achievements, setAchievements, photos, setPhotos, journals, setJournals, isAdmin, onOpenWindow }) => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <div className="explorer-address" style={{ padding: '5px 10px', background: '#f0f0f0', borderBottom: '1px solid #ccc', fontSize: '12px' }}>
         <strong>Address:</strong> C:\Users\Kapil\My Life
      </div>
      
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <h2 style={{ color: '#245edb', marginBottom: '20px', borderBottom: '1px solid #87b2e8', paddingBottom: '10px' }}>My Life & Journey</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '30px' }}>
           <div className="list-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '15px', textAlign: 'center' }} 
             onDoubleClick={() => onOpenWindow('photos')}>
              <Folder size={64} color="#fcd34d" />
              <strong>My Photos</strong>
           </div>
           <div className="list-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '15px', textAlign: 'center' }} 
             onDoubleClick={() => onOpenWindow('achievements')}>
              <Folder size={64} color="#fcd34d" />
              <strong>My Achievements</strong>
           </div>
           <div className="list-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '15px', textAlign: 'center' }} 
             onDoubleClick={() => onOpenWindow('journal')}>
              <Folder size={64} color="#fcd34d" />
              <strong>Journal</strong>
           </div>
        </div>
      </div>
      <style>{`
        .list-item:hover { background: #316ac5; border-radius: 5px; color: white !important; }
        .list-item:hover strong { color: white !important; }
      `}</style>
    </div>
  );
};

export default VaultContent;
