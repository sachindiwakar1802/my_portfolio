import React from 'react';
import Draggable from 'react-draggable';

const DesktopIcon = ({ name, icon: Icon, onOpen, initialPos }) => {
  const nodeRef = React.useRef(null);
  
  const playHover = () => {
    const audio = new Audio('https://www.winhistory.de/more/winxp/mp3/click.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  return (
    <Draggable nodeRef={nodeRef} bounds="parent" defaultPosition={initialPos}>
      <div ref={nodeRef} className="desktop-icon" data-name={name} onDoubleClick={onOpen} onClick={onOpen} onMouseEnter={playHover} style={{ position: 'absolute' }}>
        <Icon size={32} />
        <span>{name}</span>
      </div>
    </Draggable>
  );
};

export default DesktopIcon;
