import React, { useState } from 'react';
import { Plus, Trash2, Upload, Award, Image as ImageIcon, BookOpen, FolderCode, X, Check, Camera } from 'lucide-react';
import { API_URL } from '../../config';

// Read from frontend .env (set VITE_CLOUDINARY_CLOUD_NAME in your .env file)
const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME    || 'demo';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';
const ASSET_FOLDER  = 'my_portfolio'; // matches your Cloudinary asset folder

const TABS = [
  { id: 'photos',       label: '📷  Photos',         icon: ImageIcon },
  { id: 'journals',     label: '📝  Journal / Blog',  icon: BookOpen },
  { id: 'achievements', label: '🏆  Achievements',    icon: Award },
  { id: 'projects',     label: '💻  Projects',        icon: FolderCode },
];

/* ─── Cloudinary widget opener ─── */
function cloudinaryPick(onSuccess) {
  if (!window.cloudinary) {
    alert('Cloudinary widget is loading — wait 2 seconds and try again.');
    return;
  }
  window.cloudinary.createUploadWidget(
    {
      cloudName:    CLOUD_NAME,
      uploadPreset: UPLOAD_PRESET,
      folder:       ASSET_FOLDER,     // uploads go to my_portfolio/
      sources:      ['local', 'url', 'camera'],
      multiple:     false,
      cropping:     false,
      resourceType: 'image',
      // matches your preset: overwrite=false, unique_filename=false
      overwrite:       false,
      uniqueFilename:  false,
      useFilename:     false,
      displayName:     true,
    },
    (error, result) => {
      if (!error && result?.event === 'success') {
        onSuccess(result.info.secure_url);
      }
    }
  ).open();
}

/* ─── Reusable photo upload row ─── */
const PhotoPicker = ({ value, onChange, label = 'Photo' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input
        placeholder={`Paste ${label} URL, or click Upload →`}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ flex: 1, padding: '8px 10px', border: '1px solid #bbb', borderRadius: 5, fontSize: 13 }}
      />
      <button
        type="button"
        onClick={() => cloudinaryPick(onChange)}
        style={{ padding: '8px 14px', background: '#388e3c', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, whiteSpace: 'nowrap' }}
      >
        <Camera size={15} /> Upload Photo
      </button>
    </div>
    {value ? (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img src={value} alt="preview"
          style={{ width: 140, height: 100, objectFit: 'cover', borderRadius: 8, border: '2px solid #245edb' }}
          onError={e => e.target.style.display = 'none'}
        />
        <button type="button" onClick={() => onChange('')}
          style={{ position: 'absolute', top: -6, right: -6, background: '#d32f2f', border: 'none', borderRadius: '50%', width: 20, height: 20, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
          <X size={11} />
        </button>
        <div style={{ fontSize: 11, color: '#388e3c', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Check size={11} /> Photo ready to save
        </div>
      </div>
    ) : (
      <div style={{ width: 140, height: 100, border: '2px dashed #bbb', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 12, gap: 5, cursor: 'pointer' }}
        onClick={() => cloudinaryPick(onChange)}>
        <Camera size={28} />
        <span>Click to upload</span>
      </div>
    )}
  </div>
);

/* ══════════════ PHOTOS TAB ══════════════ */
const PhotosTab = ({ photos, setPhotos }) => {
  const [url, setUrl]         = useState('');
  const [caption, setCaption] = useState('');
  const [saving, setSaving]   = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!url) { alert('Please upload or paste a photo first.'); return; }
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/photos`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, caption })
      });
      const saved = await res.json();
      setPhotos([saved, ...photos]);
      setUrl('');
      setCaption('');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo?')) return;
    await fetch(`${API_URL}/photos/${id}`, { method: 'DELETE' });
    setPhotos(photos.filter(p => p._id !== id));
  };

  return (
    <div>
      {/* ── always-visible add form ── */}
      <div style={{ background: '#f0f6ff', border: '2px solid #245edb', borderRadius: 10, padding: 20, marginBottom: 24 }}>
        <h3 style={{ margin: '0 0 16px', color: '#245edb', display: 'flex', alignItems: 'center', gap: 8 }}><Camera size={18} /> Add New Photo</h3>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PhotoPicker value={url} onChange={setUrl} label="Photo" />
          <input
            placeholder="Caption (optional)"
            value={caption}
            onChange={e => setCaption(e.target.value)}
            style={{ padding: '8px 10px', border: '1px solid #bbb', borderRadius: 5, fontSize: 13 }}
          />
          <button type="submit" disabled={saving || !url}
            style={{ padding: '9px 20px', background: saving ? '#888' : '#245edb', color: 'white', border: 'none', borderRadius: 5, cursor: saving ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 7, alignSelf: 'flex-start' }}>
            <Check size={16} /> {saving ? 'Saving…' : 'Save Photo'}
          </button>
        </form>
      </div>

      {/* ── gallery ── */}
      <h4 style={{ color: '#333', margin: '0 0 12px' }}>Your Gallery ({photos.length} photos)</h4>
      {photos.length === 0
        ? <p style={{ color: '#aaa', textAlign: 'center', padding: '30px 0', fontStyle: 'italic' }}>No photos yet — upload your first one above!</p>
        : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
            {photos.map((p, i) => (
              <div key={p._id || i} style={{ position: 'relative', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.07)' }}>
                <img src={p.url} alt={p.caption || 'Photo'}
                  style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }}
                  onError={e => { e.target.src = 'https://via.placeholder.com/160x120?text=Photo'; }}
                />
                {p.caption && <div style={{ padding: '6px 8px', fontSize: 11, color: '#555', background: 'white' }}>{p.caption}</div>}
                <button onClick={() => handleDelete(p._id)}
                  style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(211,47,47,0.9)', border: 'none', borderRadius: 5, color: 'white', cursor: 'pointer', padding: '3px 7px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Trash2 size={11} /> Del
                </button>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
};

/* ══════════════ JOURNALS TAB ══════════════ */
const JournalsTab = ({ journals, setJournals }) => {
  const [title,   setTitle]   = useState('');
  const [content, setContent] = useState('');
  const [image,   setImage]   = useState('');
  const [saving,  setSaving]  = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !content) { alert('Title and content are required.'); return; }
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/journals`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, image })
      });
      const saved = await res.json();
      setJournals([saved, ...journals]);
      setTitle(''); setContent(''); setImage('');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    await fetch(`${API_URL}/journals/${id}`, { method: 'DELETE' });
    setJournals(journals.filter(j => j._id !== id));
  };

  return (
    <div>
      {/* ── always-visible write form ── */}
      <div style={{ background: '#f0f6ff', border: '2px solid #245edb', borderRadius: 10, padding: 20, marginBottom: 24 }}>
        <h3 style={{ margin: '0 0 16px', color: '#245edb', display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={18} /> Write New Journal Entry
        </h3>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            required
            placeholder="Title *  (e.g. My Coding Journey)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ padding: '9px 12px', border: '1px solid #bbb', borderRadius: 5, fontSize: 14, fontWeight: 'bold' }}
          />
          <textarea
            required
            placeholder="Write your thoughts here… (what did you learn, feel, or accomplish?)"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            style={{ padding: '9px 12px', border: '1px solid #bbb', borderRadius: 5, fontSize: 13, lineHeight: 1.6, resize: 'vertical', fontFamily: 'inherit' }}
          />
          <div>
            <div style={{ fontSize: 12, fontWeight: 'bold', color: '#245edb', marginBottom: 6 }}>
              📷 Attach a Photo (optional)
            </div>
            <PhotoPicker value={image} onChange={setImage} label="Cover photo" />
          </div>
          <button type="submit" disabled={saving}
            style={{ padding: '10px 24px', background: saving ? '#888' : '#245edb', color: 'white', border: 'none', borderRadius: 6, cursor: saving ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }}>
            <Check size={16} /> {saving ? 'Publishing…' : 'Publish Journal Entry'}
          </button>
        </form>
      </div>

      {/* ── entries list ── */}
      <h4 style={{ color: '#333', margin: '0 0 12px' }}>Past Entries ({journals.length})</h4>
      {journals.length === 0
        ? <p style={{ color: '#aaa', textAlign: 'center', padding: '30px 0', fontStyle: 'italic' }}>No entries yet — write your first one above!</p>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {journals.map((j, i) => (
              <div key={j._id || i} style={{ display: 'flex', gap: 14, padding: 14, border: '1px solid #e2e8f0', borderRadius: 8, background: '#fafafa', alignItems: 'flex-start' }}>
                {j.image
                  ? <img src={j.image} alt={j.title} style={{ width: 90, height: 70, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd', flexShrink: 0 }} onError={e => e.target.style.display = 'none'} />
                  : <div style={{ width: 90, height: 70, background: '#eef4ff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><BookOpen size={24} color="#245edb" /></div>
                }
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <strong style={{ fontSize: 14, color: '#222' }}>{j.title}</strong>
                    <button onClick={() => handleDelete(j._id)}
                      style={{ background: '#d32f2f', color: 'white', border: 'none', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                      <Trash2 size={11} /> Delete
                    </button>
                  </div>
                  <div style={{ fontSize: 11, color: '#999', margin: '3px 0 6px' }}>{j.date}</div>
                  <div style={{ fontSize: 12, color: '#666', whiteSpace: 'pre-wrap', lineHeight: 1.5, maxHeight: 60, overflow: 'hidden' }}>{j.content}</div>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
};

/* ══════════════ ACHIEVEMENTS TAB ══════════════ */
const AchievementsTab = ({ achievements, setAchievements }) => {
  const [title, setTitle]   = useState('');
  const [desc,  setDesc]    = useState('');
  const [image, setImage]   = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/achievements`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description: desc, image })
      });
      const saved = await res.json();
      setAchievements([saved, ...achievements]);
      setTitle(''); setDesc(''); setImage('');
    } finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!window.confirm('Delete?')) return;
    await fetch(`${API_URL}/achievements/${id}`, { method: 'DELETE' });
    setAchievements(achievements.filter(a => a._id !== id));
  };

  return (
    <div>
      <div style={{ background: '#f0f6ff', border: '2px solid #245edb', borderRadius: 10, padding: 20, marginBottom: 24 }}>
        <h3 style={{ margin: '0 0 16px', color: '#245edb' }}>🏆 Add Achievement</h3>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input required placeholder="Achievement title *" value={title} onChange={e => setTitle(e.target.value)}
            style={{ padding: '8px 10px', border: '1px solid #bbb', borderRadius: 5, fontSize: 13 }} />
          <textarea placeholder="Describe what you achieved…" rows={3} value={desc} onChange={e => setDesc(e.target.value)}
            style={{ padding: '8px 10px', border: '1px solid #bbb', borderRadius: 5, fontSize: 13, resize: 'vertical', fontFamily: 'inherit' }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 'bold', color: '#245edb', marginBottom: 6 }}>📷 Achievement Photo (optional)</div>
            <PhotoPicker value={image} onChange={setImage} label="Achievement photo" />
          </div>
          <button type="submit" disabled={saving}
            style={{ padding: '9px 20px', background: '#245edb', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer', fontSize: 14, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 7, alignSelf: 'flex-start' }}>
            <Check size={15} /> {saving ? 'Saving…' : 'Save Achievement'}
          </button>
        </form>
      </div>

      {achievements.length === 0
        ? <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', fontStyle: 'italic' }}>No achievements yet.</p>
        : achievements.map((a, i) => (
          <div key={a._id || i} style={{ display: 'flex', gap: 14, padding: 12, border: '1px solid #e2e8f0', borderRadius: 8, background: '#fafafa', marginBottom: 10, alignItems: 'center' }}>
            {a.image
              ? <img src={a.image} alt={a.title} style={{ width: 70, height: 60, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd' }} onError={e => e.target.style.display='none'} />
              : <div style={{ width: 70, height: 60, background: '#eef4ff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Award size={24} color="#245edb" /></div>
            }
            <div style={{ flex: 1 }}>
              <strong>{a.title}</strong>
              <div style={{ fontSize: 12, color: '#666', marginTop: 3 }}>{a.description}</div>
            </div>
            <button onClick={() => del(a._id)} style={{ background: '#d32f2f', color: 'white', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: 12 }}><Trash2 size={13} /></button>
          </div>
        ))
      }
    </div>
  );
};

/* ══════════════ PROJECTS TAB ══════════════ */
const ProjectsTab = ({ projects, setProjects }) => {
  const [form, setForm]   = useState({ name: '', size: '', icon: 'Code', description: '', url: '' });
  const [saving, setSave] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSave(true);
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, date: new Date().toLocaleDateString() })
      });
      const saved = await res.json();
      setProjects([saved, ...projects]);
      setForm({ name: '', size: '', icon: 'Code', description: '', url: '' });
    } finally { setSave(false); }
  };

  const del = async (id) => {
    if (id?.startsWith('d') || !window.confirm('Delete?')) return;
    await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
    setProjects(projects.filter(p => p._id !== id));
  };

  return (
    <div>
      <div style={{ background: '#f0f6ff', border: '2px solid #245edb', borderRadius: 10, padding: 20, marginBottom: 24 }}>
        <h3 style={{ margin: '0 0 16px', color: '#245edb' }}>💻 Add Project</h3>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input required placeholder="Project name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            style={{ padding: '8px 10px', border: '1px solid #bbb', borderRadius: 5, fontSize: 13 }} />
          <input placeholder="Technologies (e.g. React, Node, Python)" value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}
            style={{ padding: '8px 10px', border: '1px solid #bbb', borderRadius: 5, fontSize: 13 }} />
          <input placeholder="GitHub / Live URL (optional)" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })}
            style={{ padding: '8px 10px', border: '1px solid #bbb', borderRadius: 5, fontSize: 13 }} />
          <textarea placeholder="Short description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            style={{ padding: '8px 10px', border: '1px solid #bbb', borderRadius: 5, fontSize: 13, fontFamily: 'inherit', resize: 'vertical' }} />
          <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}
            style={{ padding: '8px 10px', border: '1px solid #bbb', borderRadius: 5, fontSize: 13 }}>
            <option value="Code">💻 Code</option>
            <option value="Cpu">🔌 Hardware / IoT</option>
            <option value="Database">🗄️ Database</option>
            <option value="Server">🖥️ Server / API</option>
          </select>
          <button type="submit" disabled={saving}
            style={{ padding: '9px 20px', background: '#245edb', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer', fontSize: 14, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 7, alignSelf: 'flex-start' }}>
            <Check size={15} /> {saving ? 'Saving…' : 'Save Project'}
          </button>
        </form>
      </div>

      {projects.length === 0
        ? <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', fontStyle: 'italic' }}>No projects yet.</p>
        : projects.map((p, i) => (
          <div key={p._id || i} style={{ display: 'flex', gap: 14, padding: 12, border: '1px solid #e2e8f0', borderRadius: 8, background: '#fafafa', marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <strong>{p.name}</strong>
              {p.size && <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>Stack: {p.size}</div>}
              {p.description && <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{p.description}</div>}
              {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: '#245edb' }}>{p.url}</a>}
            </div>
            {!p._id?.startsWith('d') && (
              <button onClick={() => del(p._id)} style={{ background: '#d32f2f', color: 'white', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontSize: 12, height: 'fit-content' }}><Trash2 size={13} /></button>
            )}
          </div>
        ))
      }
    </div>
  );
};

/* ══════════════ ROOT ══════════════ */
const AdminPanelContent = ({ projects, setProjects, achievements, setAchievements, photos, setPhotos, journals, setJournals, isAdmin }) => {
  const [activeTab, setActiveTab] = useState('photos');

  if (!isAdmin) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#ece9d8', gap: 16, textAlign: 'center', padding: 30 }}>
        <div style={{ fontSize: 60 }}>🔒</div>
        <h2 style={{ margin: 0 }}>Admin Access Required</h2>
        <p style={{ color: '#555', maxWidth: 320, fontSize: 14 }}>Click the <strong>user photo</strong> in the Start Menu and enter your admin password to unlock this panel.</p>
        <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: 8, padding: '12px 20px', fontSize: 13 }}>
          Default password: <code style={{ background: '#222', color: '#0f0', padding: '2px 8px', borderRadius: 4 }}>admin123</code>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontSize: 13, fontFamily: 'Tahoma, Segoe UI, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#245edb,#1a3fa0)', color: 'white', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <span style={{ fontSize: 30 }}>🛡️</span>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: 17 }}>Control Panel</div>
          <div style={{ fontSize: 11, opacity: 0.8 }}>Upload photos, write journals, manage achievements & projects</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.7, textAlign: 'right', lineHeight: 1.6 }}>
          Cloudinary: <strong>{CLOUD_NAME}</strong><br />Admin mode ✓
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', background: '#dde8f8', borderBottom: '1px solid #aaa', flexShrink: 0, overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ padding: '10px 18px', border: 'none', borderBottom: activeTab === t.id ? '3px solid #245edb' : '3px solid transparent', background: activeTab === t.id ? 'white' : 'transparent', color: activeTab === t.id ? '#245edb' : '#555', fontWeight: activeTab === t.id ? 'bold' : 'normal', cursor: 'pointer', fontSize: 13, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: 'white' }}>
        {activeTab === 'photos'       && <PhotosTab       photos={photos}             setPhotos={setPhotos} />}
        {activeTab === 'journals'     && <JournalsTab     journals={journals}         setJournals={setJournals} />}
        {activeTab === 'achievements' && <AchievementsTab achievements={achievements} setAchievements={setAchievements} />}
        {activeTab === 'projects'     && <ProjectsTab     projects={projects}         setProjects={setProjects} />}
      </div>
    </div>
  );
};

export default AdminPanelContent;
