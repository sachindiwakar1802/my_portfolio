import React, { useState } from 'react';

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

export default NotepadContent;
