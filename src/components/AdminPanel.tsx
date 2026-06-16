import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Eye, EyeOff, Loader } from 'lucide-react';
import { supabase, type PortfolioItem } from '../lib/supabase';

const ADMIN_PASSWORD = 'portfolio2024';

type FormData = Omit<PortfolioItem, 'id' | 'created_at' | 'updated_at'> & { id?: string };

const empty = (): FormData => ({
  title: '', company: '', role: '', timeline: '', platform: '',
  category: 'product', overview: '', problem: '', solution: '',
  features: [], metrics: [], technologies: '', learnings: '',
  image: '', tags: [], description: '', sort_order: 0, published: true,
});

interface Props { onClose: () => void }

export default function AdminPanel({ onClose }: Props) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState('');

  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<FormData>(empty());
  const [editing, setEditing] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('portfolio_items').select('*').order('sort_order', { ascending: true });
    if (data) setItems(data as PortfolioItem[]);
    setLoading(false);
  };

  useEffect(() => { if (authed) load(); }, [authed]);

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwErr(''); }
    else setPwErr('Incorrect password.');
  };

  const openNew = () => { setForm(empty()); setEditing(false); setModal(true); };
  const openEdit = (item: PortfolioItem) => { setForm({ ...item }); setEditing(true); setModal(true); };
  const close = () => { setModal(false); setForm(empty()); };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const payload = {
      title: form.title, company: form.company, role: form.role,
      timeline: form.timeline, platform: form.platform, category: form.category,
      overview: form.overview, problem: form.problem, solution: form.solution,
      features: form.features, metrics: form.metrics,
      technologies: form.technologies, learnings: form.learnings,
      image: form.image,
      tags: typeof form.tags === 'string' ? (form.tags as string).split(',').map(t => t.trim()).filter(Boolean) : form.tags,
      description: form.description, sort_order: Number(form.sort_order) || 0,
      published: form.published, updated_at: new Date().toISOString(),
    };
    if (editing && form.id) {
      await supabase.from('portfolio_items').update(payload).eq('id', form.id);
    } else {
      await supabase.from('portfolio_items').insert(payload);
    }
    await load();
    setSaving(false);
    close();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    setDeleting(id);
    await supabase.from('portfolio_items').delete().eq('id', id);
    await load();
    setDeleting(null);
  };

  const toggle = async (item: PortfolioItem) => {
    await supabase.from('portfolio_items').update({ published: !item.published, updated_at: new Date().toISOString() }).eq('id', item.id);
    await load();
  };

  const set = (k: keyof FormData, v: unknown) => setForm(prev => ({ ...prev, [k]: v }));

  if (!authed) {
    return (
      <div className="admin">
        <div className="pw-gate">
          <div className="pw-box">
            <h2>Admin Access</h2>
            <p>Enter password to manage portfolio.</p>
            <div className="field">
              <label>Password<span>*</span></label>
              <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} autoFocus />
              {pwErr && <p className="pw-error">{pwErr}</p>}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={login}>Unlock</button>
              <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <h1 className="admin-title">Portfolio Manager</h1>
        <div className="admin-actions">
          <button className="btn btn-primary" onClick={openNew}><Plus size={14} /> Add Project</button>
          <button className="btn btn-ghost" onClick={onClose}><X size={14} /> Close</button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <Loader size={20} className="spinner" style={{ color: 'var(--grey-400)' }} />
        </div>
      ) : items.length === 0 ? (
        <div className="admin-empty">
          <p style={{ marginBottom: 16 }}>No projects yet.</p>
          <button className="btn btn-primary" onClick={openNew}><Plus size={14} /> Add Project</button>
        </div>
      ) : (
        <div className="admin-list">
          {items.map(item => (
            <div key={item.id} className="admin-row">
              {item.image ? <img src={item.image} alt="" className="admin-thumb" /> : <div className="admin-thumb" />}
              <div className="admin-row-info">
                <h4>{item.title}</h4>
                <p>{item.company} · {item.category}</p>
              </div>
              <span className={`admin-badge ${item.published ? 'admin-badge--live' : 'admin-badge--draft'}`}>
                {item.published ? 'Live' : 'Draft'}
              </span>
              <button className="btn btn-ghost" style={{ padding: '6px 10px' }} onClick={() => toggle(item)} title={item.published ? 'Unpublish' : 'Publish'}>
                {item.published ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button className="btn btn-ghost" style={{ padding: '6px 10px' }} onClick={() => openEdit(item)}>
                <Pencil size={14} />
              </button>
              <button className="btn btn-danger" style={{ padding: '6px 10px' }} onClick={() => remove(item.id)} disabled={deleting === item.id}>
                {deleting === item.id ? <Loader size={14} className="spinner" /> : <Trash2 size={14} />}
              </button>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="modal-bg" onClick={e => { if (e.target === e.currentTarget) close(); }}>
          <div className="modal">
            <div className="modal-head">
              <h2>{editing ? 'Edit Project' : 'New Project'}</h2>
              <button className="modal-close" onClick={close}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="field"><label>Title<span>*</span></label><input value={form.title} onChange={e => set('title', e.target.value)} /></div>
                <div className="field"><label>Company</label><input value={form.company} onChange={e => set('company', e.target.value)} /></div>
                <div className="field"><label>Role</label><input value={form.role} onChange={e => set('role', e.target.value)} /></div>
                <div className="field"><label>Timeline</label><input value={form.timeline} onChange={e => set('timeline', e.target.value)} /></div>
                <div className="field"><label>Platform</label><input value={form.platform} onChange={e => set('platform', e.target.value)} /></div>
                <div className="field">
                  <label>Category<span>*</span></label>
                  <select value={form.category} onChange={e => set('category', e.target.value)}>
                    <option value="product">Product</option>
                    <option value="marketing">Marketing</option>
                    <option value="analytics">Analytics</option>
                  </select>
                </div>
                <div className="field field--full"><label>Short Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} style={{ minHeight: 64 }} /></div>
                <div className="field field--full"><label>Cover Image URL</label><input value={form.image} onChange={e => set('image', e.target.value)} /><span className="field-hint">Pexels URLs recommended</span></div>
                <div className="field field--full"><label>Tags (comma-separated)</label><input value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags} onChange={e => set('tags', e.target.value)} /></div>
                <div className="field field--full"><label>Overview</label><textarea value={form.overview} onChange={e => set('overview', e.target.value)} /></div>
                <div className="field field--full"><label>Problem</label><textarea value={form.problem} onChange={e => set('problem', e.target.value)} /></div>
                <div className="field field--full"><label>Solution</label><textarea value={form.solution} onChange={e => set('solution', e.target.value)} /></div>
                <div className="field field--full"><label>Technologies</label><input value={form.technologies} onChange={e => set('technologies', e.target.value)} /></div>
                <div className="field field--full"><label>Learnings</label><textarea value={form.learnings} onChange={e => set('learnings', e.target.value)} /></div>
                <div className="field"><label>Sort Order</label><input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} /></div>
                <div className="field" style={{ justifyContent: 'flex-end' }}>
                  <div className="toggle-row">
                    <span>Published</span>
                    <label className="toggle">
                      <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} />
                      <span className="toggle-track" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={close} disabled={saving}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving || !form.title.trim()}>
                {saving ? <Loader size={14} className="spinner" /> : null}
                {saving ? 'Saving...' : editing ? 'Save' : 'Add Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
