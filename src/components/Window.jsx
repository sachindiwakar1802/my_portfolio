import React from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Square } from 'lucide-react';

const Window = ({ title, icon: Icon, children, onClose, active, onFocus, id, initialPos, isMaximized, isMinimized, onMaximize, onMinimize }) => {
  const nodeRef = React.useRef(null);
  
  if (isMinimized) return null;

  const maximizedStyle = {
    top: 0,
    left: 0,
    width: '100vw',
    height: 'calc(100vh - 30px)',
    transform: 'none',
    zIndex: active ? 100 : 10,
    position: 'absolute',
    borderRadius: 0
  };

  const normalStyle = {
    zIndex: active ? 100 : 10,
    width: `min(${id === 'mylife' || id === 'achievements' ? '800px' : '600px'}, 100vw)`, 
    height: `min(${id === 'mylife' || id === 'achievements' ? '600px' : '450px'}, calc(100vh - 30px))`, 
    position: 'absolute' 
  };

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".title-bar" 
      cancel=".title-bar-controls" 
      bounds="parent" 
      defaultPosition={initialPos} 
      onMouseDown={() => onFocus(id)} 
      disabled={isMaximized}
    >
      <div ref={nodeRef} className={`window ${active ? 'active' : ''} ${isMaximized ? 'maximized' : ''}`} style={isMaximized ? maximizedStyle : normalStyle}>
        <div className="title-bar" onDoubleClick={() => onMaximize(id)}>
          <div style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
             {Icon && <Icon size={16} />}
          </div>
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <div className="title-bar-button" 
                 onMouseDown={(e) => e.stopPropagation()} 
                 onClick={(e) => { e.stopPropagation(); onMinimize(id); }}>
              <Minus size={12} />
            </div>
            <div className="title-bar-button" 
                 onMouseDown={(e) => e.stopPropagation()} 
                 onClick={(e) => { e.stopPropagation(); onMaximize(id); }}>
              <Square size={10} />
            </div>
            <div className="title-bar-button close" 
                 onMouseDown={(e) => e.stopPropagation()} 
                 onClick={(e) => { e.stopPropagation(); onClose(id); }}>
              <X size={14} />
            </div>
          </div>
        </div>
        <div className="window-content" style={{ display: 'block', height: 'calc(100% - 30px)', overflow: 'hidden' }}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
