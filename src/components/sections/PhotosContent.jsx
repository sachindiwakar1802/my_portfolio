import React, { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { API_URL } from '../../config';

const PhotosContent = ({ photos, setPhotos, isAdmin, onBack }) => {
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleCloudinaryUpload = () => {
    if (!window.cloudinary) { alert("Cloudinary not loaded"); return; }
    const myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'demo', 
      uploadPreset: 'ml_default',
      cropping: true,
      multiple: false,
    }, (error, result) => { 
      if (!error && result && result.event === "success") { 
        setNewUrl(result.info.secure_url);
      }
    });
    myWidget.open();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newUrl) return;
    
    const res = await fetch(`${API_URL}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: newUrl, caption: newCaption })
    });
    const saved = await res.json();
    setPhotos([saved, ...photos]);
    setNewUrl('');
    setNewCaption('');
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photo?")) return;
    await fetch(`${API_URL}/photos/${id}`, { method: 'DELETE' });
    setPhotos(photos.filter(p => p._id !== id));
  };

  return (
    <div style={{ height: '100%', background: 'white', display: 'flex', flexDirection: 'column' }}>
      <div className="explorer-toolbar" style={{ display: 'flex', padding: '5px', background: '#ece9d8', borderBottom: '1px solid #ccc', gap: '10px' }}>
         <div className="toolbar-btn" style={{ fontSize: '11px', padding: '3px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={onBack}>
            <span style={{ color: 'green', fontWeight: 'bold' }}>←</span> Back
         </div>
      </div>
       {isAdmin && (
         <div style={{ padding: '10px', background: '#ece9d8', borderBottom: '1px solid #999', display: 'flex', gap: '10px' }}>
            <button className="xp-button" onClick={() => setShowForm(!showForm)}><Plus size={14} /> Add Photo</button>
         </div>
       )}
       
       <div style={{ overflowY: 'auto', flex: 1 }} className="window-content">
          <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#245edb', borderBottom: '2px solid #245edb', paddingBottom: '10px', margin: '0 0 20px 0' }}>Photo Gallery</h1>
            
            {showForm && isAdmin && (
              <form onSubmit={handleAdd} className="achievement-form" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input placeholder="Image URL" value={newUrl} onChange={e => setNewUrl(e.target.value)} required style={{ flex: 1 }} />
                  <button type="button" className="xp-button" onClick={handleCloudinaryUpload} style={{ background: '#245edb', color: 'white' }}>Upload Cloudinary</button>
                </div>
                <input placeholder="Caption" value={newCaption} onChange={e => setNewCaption(e.target.value)} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="xp-button" style={{ background: '#388e3c', color: 'white' }}>Save to DB</button>
                  <button type="button" className="xp-button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {photos.map(p => (
                <div key={p._id} style={{ border: '1px solid #ddd', padding: '10px', background: '#f9f9f9', borderRadius: '5px', position: 'relative' }}>
                  <img src={p.url} alt={p.caption} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '3px' }} onError={(e) => e.target.src = "https://via.placeholder.com/200x150?text=Photo"} />
                  <div style={{ marginTop: '8px', fontSize: '12px', textAlign: 'center', color: '#333' }}>{p.caption}</div>
                  {isAdmin && (
                    <div onClick={() => handleDelete(p._id)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(255,255,255,0.8)', borderRadius: '50%', padding: '5px', cursor: 'pointer', color: '#d32f2f' }}>
                      <Trash2 size={12} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {photos.length === 0 && <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>No photos found.</p>}
          </div>
       </div>
    </div>
  );
};

export default PhotosContent;
