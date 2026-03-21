import React, { useState, useEffect } from 'react';

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

export default PaintContent;
