import React from 'react';
import { Search } from 'lucide-react';

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
  
export default YoutubeContent;
