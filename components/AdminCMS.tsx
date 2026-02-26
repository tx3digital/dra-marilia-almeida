
import React, { useState, useEffect } from 'react';
import { BlogPost, YouTubeVideo, SocialHighlight } from '../types';
import { BLOG_POSTS as INITIAL_POSTS, YOUTUBE_VIDEOS as INITIAL_VIDEOS, SOCIAL_HIGHLIGHTS as INITIAL_SOCIAL } from '../constants';
import { 
  Plus, Trash2, Edit3, Save, ArrowLeft, Image as ImageIcon, 
  LayoutDashboard, FileText, Youtube, Search, Link as LinkIcon, Instagram, Music2 
} from 'lucide-react';

interface AdminCMSProps {
  onBack: () => void;
}

type AdminTab = 'Artigos' | 'YouTube' | 'Social';

const AdminCMS: React.FC<AdminCMSProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Artigos');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [socials, setSocials] = useState<SocialHighlight[]>([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editType, setEditType] = useState<AdminTab>('Artigos');
  
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [currentVideo, setCurrentVideo] = useState<Partial<YouTubeVideo>>({});
  const [currentSocial, setCurrentSocial] = useState<Partial<SocialHighlight>>({});

  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem('marilia_blog_posts');
      setPosts(savedPosts ? JSON.parse(savedPosts) : INITIAL_POSTS);

      const savedVideos = localStorage.getItem('marilia_youtube_videos');
      setVideos(savedVideos ? JSON.parse(savedVideos) : INITIAL_VIDEOS);
      
      const savedSocials = localStorage.getItem('marilia_social_highlights');
      setSocials(savedSocials ? JSON.parse(savedSocials) : INITIAL_SOCIAL);
    } catch (e) {
      console.error("Erro ao carregar dados do storage", e);
      setPosts(INITIAL_POSTS);
      setVideos(INITIAL_VIDEOS);
      setSocials(INITIAL_SOCIAL);
    }
  }, []);

  const savePosts = (updated: BlogPost[]) => {
    setPosts(updated);
    localStorage.setItem('marilia_blog_posts', JSON.stringify(updated));
  };

  const saveVideos = (updated: YouTubeVideo[]) => {
    setVideos(updated);
    localStorage.setItem('marilia_youtube_videos', JSON.stringify(updated));
  };

  const saveSocials = (updated: SocialHighlight[]) => {
    setSocials(updated);
    localStorage.setItem('marilia_social_highlights', JSON.stringify(updated));
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

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractYoutubeId(currentVideo.id || '') || currentVideo.id;
    if (!videoId) return;
    
    const newVideo = {
      ...currentVideo,
      id: videoId,
      title: currentVideo.title || 'Vídeo sem título',
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    } as YouTubeVideo;

    let updated;
    if (videos.find(v => v.id === currentVideo.id)) {
      updated = videos.map(v => v.id === currentVideo.id ? newVideo : v);
    } else {
      updated = [newVideo, ...videos];
    }
    saveVideos(updated);
    setIsEditing(false);
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

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    const socialToSave = currentSocial as SocialHighlight;
    let updated;
    if (socials.find(s => s.id === socialToSave.id)) {
      updated = socials.map(s => s.id === socialToSave.id ? socialToSave : s);
    } else {
      updated = [socialToSave, ...socials];
    }
    saveSocials(updated);
    setIsEditing(false);
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

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    const postToSave = {
      ...currentPost,
      title: currentPost.title || 'Sem título',
      category: currentPost.category || 'Hormônios'
    } as BlogPost;
    
    let updated;
    if (posts.find(p => p.id === postToSave.id)) {
      updated = posts.map(p => p.id === postToSave.id ? postToSave : p);
    } else {
      updated = [postToSave, ...posts];
    }
    savePosts(updated);
    setIsEditing(false);
  };

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
                  <input required type="text" value={currentPost.title || ''} onChange={e => setCurrentPost({...currentPost, title: e.target.value})} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-bold text-gray-900 bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Categoria</label>
                  <select value={currentPost.category || 'Hormônios'} onChange={e => setCurrentPost({...currentPost, category: e.target.value as any})} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-bold text-gray-900 appearance-none bg-white">
                    <option value="Hormônios">Hormônios</option>
                    <option value="Emagrecimento">Emagrecimento</option>
                    <option value="Longevidade">Longevidade</option>
                    <option value="Estilo de Vida">Estilo de Vida</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 mb-8">
                <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Resumo</label>
                <textarea required rows={2} value={currentPost.excerpt || ''} onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-medium text-gray-600 bg-white" />
              </div>
              <div className="space-y-2 mb-8">
                <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Conteúdo</label>
                <textarea required rows={10} value={currentPost.content || ''} onChange={e => setCurrentPost({...currentPost, content: e.target.value})} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-light text-gray-600 bg-white" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1"><ImageIcon size={12} /><span>URL da Imagem</span></label>
                  <input required type="url" value={currentPost.imageUrl || ''} onChange={e => setCurrentPost({...currentPost, imageUrl: e.target.value})} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] outline-none font-mono text-xs bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1"><LinkIcon size={12} /><span>Link Instagram (Opcional)</span></label>
                  <input type="url" value={currentPost.instagramEmbedUrl || ''} onChange={e => setCurrentPost({...currentPost, instagramEmbedUrl: e.target.value})} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] outline-none font-mono text-xs bg-white" />
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
                  <input required type="text" value={currentVideo.title || ''} onChange={e => setCurrentVideo({...currentVideo, title: e.target.value})} placeholder="Ex: Entrevista sobre Saúde Hormonal" className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-bold text-gray-900 bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Link ou ID do YouTube</label>
                  <div className="relative">
                    <input required type="text" value={currentVideo.id || ''} onChange={e => setCurrentVideo({...currentVideo, id: e.target.value})} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-mono text-xs bg-white" />
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
                    <button type="button" onClick={() => setCurrentSocial({...currentSocial, platform: 'instagram'})} className={`flex-1 py-4 rounded-xl border flex items-center justify-center space-x-2 font-bold uppercase text-[10px] tracking-widest transition-all ${currentSocial.platform === 'instagram' ? 'bg-[#833c4e] text-white border-[#833c4e]' : 'border-[#e0d5c7] text-[#a89b92]'}`}>
                      <Instagram size={16} /><span>Instagram</span>
                    </button>
                    <button type="button" onClick={() => setCurrentSocial({...currentSocial, platform: 'tiktok'})} className={`flex-1 py-4 rounded-xl border flex items-center justify-center space-x-2 font-bold uppercase text-[10px] tracking-widest transition-all ${currentSocial.platform === 'tiktok' ? 'bg-black text-white border-black' : 'border-[#e0d5c7] text-[#a89b92]'}`}>
                      <Music2 size={16} /><span>TikTok</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Título/Legenda curta</label>
                  <input required type="text" value={currentSocial.title || ''} onChange={e => setCurrentSocial({...currentSocial, title: e.target.value})} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-bold text-gray-900 bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">Link Direto do Post</label>
                  <input required type="url" value={currentSocial.url || ''} onChange={e => setCurrentSocial({...currentSocial, url: e.target.value})} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-mono text-xs bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-[#a89b92] ml-1">URL da Miniatura</label>
                  <input required type="url" value={currentSocial.thumbnail || ''} onChange={e => setCurrentSocial({...currentSocial, thumbnail: e.target.value})} className="w-full px-6 py-4 rounded-xl border border-[#e0d5c7] focus:border-[#833c4e] outline-none font-mono text-xs bg-white" />
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
                          <img src={post.imageUrl} className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                          <div className="font-black text-gray-900 uppercase tracking-tight text-sm">{post.title}</div>
                        </div>
                      </td>
                      <td className="px-8 py-6"><span className="bg-[#833c4e]/5 text-[#833c4e] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{post.category}</span></td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button onClick={() => handleEditPost(post)} className="p-2 text-[#a89b92] hover:text-[#833c4e] transition-colors"><Edit3 size={18} /></button>
                          <button onClick={() => savePosts(posts.filter(p => p.id !== post.id))} className="p-2 text-[#a89b92] hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
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
                          <button onClick={() => saveVideos(videos.filter(v => v.id !== video.id))} className="p-2 text-[#a89b92] hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
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
                          <img src={social.thumbnail} className="w-12 h-16 rounded-lg object-cover border border-gray-100" />
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
                          <button onClick={() => saveSocials(socials.filter(s => s.id !== social.id))} className="p-2 text-[#a89b92] hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
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
        
        <div className="mt-12 text-center">
          <button onClick={onBack} className="text-[#a89b92] hover:text-[#833c4e] uppercase text-[10px] font-black tracking-widest flex items-center justify-center space-x-2 mx-auto"><ArrowLeft size={14} /><span>Voltar ao Site Público</span></button>
        </div>
      </div>
    </div>
  );
};

export default AdminCMS;
