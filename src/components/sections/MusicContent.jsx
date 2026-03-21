import React from 'react';

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

export default MusicContent;
