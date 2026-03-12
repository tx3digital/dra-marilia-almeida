
import React, { useState, useEffect } from 'react';
import { BlogPost, YouTubeVideo, SocialHighlight } from '../types';
import { BLOG_POSTS as INITIAL_POSTS, YOUTUBE_VIDEOS as INITIAL_VIDEOS, SOCIAL_HIGHLIGHTS as INITIAL_SOCIAL } from '../constants';
import {
  Plus, Trash2, Edit3, Save, ArrowLeft, Image as ImageIcon,
  LayoutDashboard, FileText, Youtube, Search, Link as LinkIcon, Instagram, Music2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminCMSProps {
  onBack: () => void;
}

const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError('Supabase não configurado. Verifique as chaves no arquivo .env.');
      return;
    }
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      setLoading(false);
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f3] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 border border-[#e0d5c7]/30">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="p-4 bg-[#833c4e]/5 rounded-2xl text-[#833c4e] mb-4">
            <LayoutDashboard size={32} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-900 leading-none">Acesso Restrito</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a89b92] mt-3">Painel Administrativo Hub</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">E-mail</label>
            <input
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-bold text-gray-900 bg-white"
              placeholder="admin@exemplo.com"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Senha</label>
            <input
              required
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-bold text-gray-900 bg-white"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center bg-red-50 py-2 rounded-lg">{error}</p>}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#833c4e] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-[#6D2437] transition-all disabled:opacity-50"
          >
            {loading ? 'Autenticando...' : 'Entrar no Painel'}
          </button>
        </form>
      </div>
    </div>
  );
};

type AdminTab = 'Artigos' | 'YouTube' | 'Social';

const AdminCMS: React.FC<AdminCMSProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('Artigos');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [socials, setSocials] = useState<SocialHighlight[]>([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editType, setEditType] = useState<AdminTab>('Artigos');

  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [currentVideo, setCurrentVideo] = useState<Partial<YouTubeVideo>>({});
  const [currentSocial, setCurrentSocial] = useState<Partial<SocialHighlight>>({});

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    if (!supabase) {
      setIsAuthenticated(false);
      return;
    }
    const { data } = await supabase.auth.getSession();
    setIsAuthenticated(!!data.session);
  };

  const loadData = async () => {
    if (!supabase) {
      setLoading(false);
      setPosts(INITIAL_POSTS);
      setVideos(INITIAL_VIDEOS);
      setSocials(INITIAL_SOCIAL);
      return;
    }
    setLoading(true);
    try {
      // Fetch posts
      const { data: postsData } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (postsData) setPosts(postsData);

      // Fetch videos
      const { data: videosData } = await supabase.from('youtube_videos').select('*').order('created_at', { ascending: false });
      if (videosData) setVideos(videosData);

      // Fetch socials
      const { data: socialsData } = await supabase.from('social_highlights').select('*').order('created_at', { ascending: false });
      if (socialsData) setSocials(socialsData);
    } catch (e) {
      console.error("Erro ao carregar dados do Supabase", e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const savePosts = async (updated: BlogPost[]) => {
    // In a real scenario, we'd handle individual updates, but for keeping it close to original logic:
    // This function will now just refresh the local state and be used after individual row operations.
    setPosts(updated);
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (!error) setPosts(posts.filter(p => p.id !== id));
  };

  const deleteVideo = async (id: string) => {
    const { error } = await supabase.from('youtube_videos').delete().eq('id', id);
    if (!error) setVideos(videos.filter(v => v.id !== id));
  };

  const deleteSocial = async (id: string) => {
    const { error } = await supabase.from('social_highlights').delete().eq('id', id);
    if (!error) setSocials(socials.filter(s => s.id !== id));
  };

  const extractYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleCreateVideo = () => {
    setEditType('YouTube');
    setCurrentVideo({ id: '', title: '', thumbnail: '' });
    setIsEditing(true);
  };

  const handleEditVideo = (video: YouTubeVideo) => {
    setEditType('YouTube');
    setCurrentVideo(video);
    setIsEditing(true);
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractYoutubeId(currentVideo.id || '') || currentVideo.id;
    if (!videoId) return;

    const videoData = {
      id: videoId,
      title: currentVideo.title || 'Vídeo sem título',
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    };

    const { error } = await supabase.from('youtube_videos').upsert(videoData);

    if (!error) {
      loadData();
      setIsEditing(false);
    } else {
      console.error("Erro ao salvar vídeo", error);
    }
  };

  const handleCreateSocial = () => {
    setEditType('Social');
    setCurrentSocial({ id: Date.now().toString(), title: '', thumbnail: '', url: '', platform: 'instagram' });
    setIsEditing(true);
  };

  const handleEditSocial = (social: SocialHighlight) => {
    setEditType('Social');
    setCurrentSocial(social);
    setIsEditing(true);
  };

  const handleSaveSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('social_highlights').upsert(currentSocial);

    if (!error) {
      loadData();
      setIsEditing(false);
    } else {
      console.error("Erro ao salvar social highlight", error);
    }
  };

  const handleCreatePost = () => {
    setEditType('Artigos');
    setCurrentPost({
      id: Date.now().toString(),
      title: '',
      excerpt: '',
      content: '',
      category: 'Hormônios',
      author: 'Dra. Marília Almeida',
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      readingTime: '5 min',
      imageUrl: '',
      instagramEmbedUrl: ''
    });
    setIsEditing(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditType('Artigos');
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const postToSave = {
      ...currentPost,
      title: currentPost.title || 'Sem título',
      category: currentPost.category || 'Hormônios',
      author: currentPost.author || 'Dra. Marília Almeida',
      date: currentPost.date || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      readingTime: currentPost.readingTime || '5 min'
    };

    const { error } = await supabase.from('blog_posts').upsert(postToSave);

    if (!error) {
      loadData();
      setIsEditing(false);
    } else {
      console.error("Erro ao salvar post", error);
    }
  };

  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-[#f7f5f3] flex items-center justify-center"><div className="w-12 h-12 border-4 border-[#833c4e] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  if (isEditing) {
    return (
      <div className="min-h-screen bg-[#f7f5f3] pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <button onClick={() => setIsEditing(false)} className="flex items-center space-x-2 text-[#a89b92] hover:text-[#833c4e] transition-colors uppercase text-[10px] font-black tracking-widest mb-10">
            <ArrowLeft size={16} />
            <span>Voltar ao Painel</span>
          </button>

          {editType === 'Artigos' && (
            <form onSubmit={handleSavePost} className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-[#e0d5c7]/30">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-10">Editor de Artigo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Título</label>
                  <input required type="text" value={currentPost.title || ''} onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-bold text-gray-900 bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Categoria</label>
                  <select value={currentPost.category || 'Hormônios'} onChange={e => setCurrentPost({ ...currentPost, category: e.target.value as any })} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-bold text-gray-900 appearance-none bg-white">
                    <option value="Hormônios">Hormônios</option>
                    <option value="Emagrecimento">Emagrecimento</option>
                    <option value="Longevidade">Longevidade</option>
                    <option value="Estilo de Vida">Estilo de Vida</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 mb-8">
                <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Resumo</label>
                <textarea required rows={2} value={currentPost.excerpt || ''} onChange={e => setCurrentPost({ ...currentPost, excerpt: e.target.value })} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-medium text-gray-600 bg-white" />
              </div>
              <div className="space-y-2 mb-8">
                <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Conteúdo</label>
                <textarea required rows={10} value={currentPost.content || ''} onChange={e => setCurrentPost({ ...currentPost, content: e.target.value })} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-light text-gray-600 bg-white" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1"><ImageIcon size={12} /><span>URL da Imagem</span></label>
                  <input required type="url" value={currentPost.imageUrl || ''} onChange={e => setCurrentPost({ ...currentPost, imageUrl: e.target.value })} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] outline-none font-mono text-xs bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1"><LinkIcon size={12} /><span>Link Instagram (Opcional)</span></label>
                  <input type="url" value={currentPost.instagramEmbedUrl || ''} onChange={e => setCurrentPost({ ...currentPost, instagramEmbedUrl: e.target.value })} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] outline-none font-mono text-xs bg-white" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#833c4e] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 shadow-xl">
                <Save size={20} /><span>Salvar Artigo</span>
              </button>
            </form>
          )}

          {editType === 'YouTube' && (
            <form onSubmit={handleSaveVideo} className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-[#e0d5c7]/30">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-10">Gerenciar Vídeo YouTube</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Título do Vídeo/Podcast</label>
                  <input required type="text" value={currentVideo.title || ''} onChange={e => setCurrentVideo({ ...currentVideo, title: e.target.value })} placeholder="Ex: Entrevista sobre Saúde Hormonal" className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-bold text-gray-900 bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Link ou ID do YouTube</label>
                  <div className="relative">
                    <input required type="text" value={currentVideo.id || ''} onChange={e => setCurrentVideo({ ...currentVideo, id: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-mono text-xs bg-white" />
                    <Youtube className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 opacity-30" size={20} />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#833c4e] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 shadow-xl mt-10">
                <Save size={20} /><span>Salvar Vídeo</span>
              </button>
            </form>
          )}

          {editType === 'Social' && (
            <form onSubmit={handleSaveSocial} className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-[#e0d5c7]/30">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-10">Gerenciar Destaque Social</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Plataforma</label>
                  <div className="flex space-x-4">
                    <button type="button" onClick={() => setCurrentSocial({ ...currentSocial, platform: 'instagram' })} className={`flex-1 py-4 rounded-xl border flex items-center justify-center space-x-2 font-bold uppercase text-[10px] tracking-widest transition-all ${currentSocial.platform === 'instagram' ? 'bg-[#833c4e] text-white border-[#833c4e]' : 'border-[#e0d5c7] text-[#a89b92]'}`}>
                      <Instagram size={16} /><span>Instagram</span>
                    </button>
                    <button type="button" onClick={() => setCurrentSocial({ ...currentSocial, platform: 'tiktok' })} className={`flex-1 py-4 rounded-xl border flex items-center justify-center space-x-2 font-bold uppercase text-[10px] tracking-widest transition-all ${currentSocial.platform === 'tiktok' ? 'bg-black text-white border-black' : 'border-[#e0d5c7] text-[#a89b92]'}`}>
                      <Music2 size={16} /><span>TikTok</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Título/Legenda curta</label>
                  <input required type="text" value={currentSocial.title || ''} onChange={e => setCurrentSocial({ ...currentSocial, title: e.target.value })} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-bold text-gray-900 bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Link Direto do Post</label>
                  <input required type="url" value={currentSocial.url || ''} onChange={e => setCurrentSocial({ ...currentSocial, url: e.target.value })} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-mono text-xs bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">URL da Miniatura</label>
                  <input required type="url" value={currentSocial.thumbnail || ''} onChange={e => setCurrentSocial({ ...currentSocial, thumbnail: e.target.value })} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-mono text-xs bg-white" />
                  <p className="text-[8px] text-[#833c4e] font-bold uppercase tracking-wider ml-1 mt-1">* Use um link direto de imagem (.jpg, .png)</p>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#833c4e] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 shadow-xl mt-10">
                <Save size={20} /><span>Salvar Destaque</span>
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  const currentListLength = activeTab === 'Artigos' ? posts.length : activeTab === 'YouTube' ? videos.length : socials.length;

  return (
    <div className="min-h-screen bg-[#f7f5f3] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-[#833c4e] border border-[#e0d5c7]/30"><LayoutDashboard size={28} /></div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">Gestão do Hub</h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a89b92] mt-2">Painel Administrativo de Mídia</p>
            </div>
          </div>

          <div className="flex bg-white p-1.5 rounded-full border border-[#e0d5c7]/30 shadow-sm">
            {(['Artigos', 'YouTube', 'Social'] as AdminTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#833c4e] text-white shadow-md' : 'text-[#a89b92] hover:text-[#833c4e]'}`}
              >
                {tab === 'YouTube' ? 'Podcast & Vídeos' : tab === 'Social' ? 'Redes Sociais' : tab}
              </button>
            ))}
          </div>

          <button
            onClick={activeTab === 'Artigos' ? handleCreatePost : activeTab === 'YouTube' ? handleCreateVideo : handleCreateSocial}
            className="bg-[#833c4e] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center space-x-2 hover:bg-[#6D2437] transition-all shadow-lg"
          >
            <Plus size={18} />
            <span>Adicionar {activeTab === 'Artigos' ? 'Artigo' : activeTab === 'YouTube' ? 'Vídeo' : 'Highlight'}</span>
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#e0d5c7]/20 overflow-hidden">
          {activeTab === 'Artigos' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f7f5f3] border-b border-[#e0d5c7]/20">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#a89b92]">Artigo</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#a89b92]">Categoria</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#a89b92] text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0d5c7]/10">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-[#f7f5f3]/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={post.imageUrl}
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576091160550-217359f4cf08?q=80&w=100&auto=format' }}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                          />
                          <div className="font-black text-gray-900 uppercase tracking-tight text-sm">{post.title}</div>
                        </div>
                      </td>
                      <td className="px-8 py-6"><span className="bg-[#833c4e]/5 text-[#833c4e] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{post.category}</span></td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button onClick={() => handleEditPost(post)} className="p-2 text-[#a89b92] hover:text-[#833c4e] transition-colors"><Edit3 size={18} /></button>
                          <button onClick={() => deletePost(post.id)} className="p-2 text-[#a89b92] hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'YouTube' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f7f5f3] border-b border-[#e0d5c7]/20">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#a89b92]">Thumbnail</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#a89b92]">Título</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#a89b92] text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0d5c7]/10">
                  {videos.map((video) => (
                    <tr key={video.id} className="hover:bg-[#f7f5f3]/30 transition-colors">
                      <td className="px-8 py-6">
                        <img src={video.thumbnail} className="w-20 h-12 rounded-lg object-cover border border-gray-100 shadow-sm" />
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-black text-gray-900 uppercase tracking-tight text-sm">{video.title}</div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button onClick={() => handleEditVideo(video)} className="p-2 text-[#a89b92] hover:text-[#833c4e] transition-colors"><Edit3 size={18} /></button>
                          <button onClick={() => deleteVideo(video.id)} className="p-2 text-[#a89b92] hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Social' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f7f5f3] border-b border-[#e0d5c7]/20">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#a89b92]">Highlight</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#a89b92]">Plataforma</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-[#a89b92] text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0d5c7]/10">
                  {socials.map((social) => (
                    <tr key={social.id} className="hover:bg-[#f7f5f3]/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <img
                            src={social.thumbnail}
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541781719201-68bca29b5ce3?q=80&w=100&auto=format' }}
                            className="w-12 h-16 rounded-lg object-cover border border-gray-100"
                          />
                          <div className="font-black text-gray-900 uppercase tracking-tight text-sm">{social.title}</div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-2">
                          {social.platform === 'instagram' ? <Instagram size={14} className="text-[#833c4e]" /> : <Music2 size={14} className="text-black" />}
                          <span className="font-bold uppercase text-[9px] tracking-widest">{social.platform}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button onClick={() => handleEditSocial(social)} className="p-2 text-[#a89b92] hover:text-[#833c4e] transition-colors"><Edit3 size={18} /></button>
                          <button onClick={() => deleteSocial(social.id)} className="p-2 text-[#a89b92] hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {currentListLength === 0 && (
            <div className="py-24 text-center">
              <FileText size={48} className="mx-auto text-[#e0d5c7] mb-4" />
              <p className="text-gray-400 font-light italic">Nenhum registro encontrado nesta categoria.</p>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center space-y-6">
          <button onClick={onBack} className="text-[#a89b92] hover:text-[#833c4e] uppercase text-[10px] font-black tracking-widest flex items-center justify-center space-x-2 mx-auto"><ArrowLeft size={14} /><span>Voltar ao Site Público</span></button>

          <button
            onClick={handleLogout}
            className="text-red-500/50 hover:text-red-500 uppercase text-[9px] font-black tracking-[0.2em] transition-colors"
          >
            Sair do Painel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCMS;
