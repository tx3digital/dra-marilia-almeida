
import React, { useState, useEffect } from 'react';
import { BLOG_POSTS as INITIAL_POSTS, YOUTUBE_VIDEOS as INITIAL_VIDEOS, SOCIAL_HIGHLIGHTS as INITIAL_SOCIAL, CONTACT_INFO } from '../constants';
import { BlogPost, YouTubeVideo, SocialHighlight } from '../types';
import { ArrowLeft, Clock, Calendar, ChevronRight, BookOpen, Instagram, ExternalLink, Mic2, Youtube, Play, X, Music2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BlogPageProps {
  onBack: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [socials, setSocials] = useState<SocialHighlight[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<'Artigos' | 'Podcast' | 'Social'>('Artigos');
  const [showVideoModal, setShowVideoModal] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    loadData();
  }, []);

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
      const { data: postsData } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      const { data: videosData } = await supabase.from('youtube_videos').select('*').order('created_at', { ascending: false });
      const { data: socialsData } = await supabase.from('social_highlights').select('*').order('created_at', { ascending: false });

      if (postsData && postsData.length > 0) setPosts(postsData);
      else setPosts(INITIAL_POSTS);

      if (videosData && videosData.length > 0) setVideos(videosData);
      else setVideos(INITIAL_VIDEOS);

      if (socialsData && socialsData.length > 0) setSocials(socialsData);
      else setSocials(INITIAL_SOCIAL);
    } catch (e) {
      console.error("Erro ao carregar dados", e);
      setPosts(INITIAL_POSTS);
      setVideos(INITIAL_VIDEOS);
      setSocials(INITIAL_SOCIAL);
    } finally {
      setLoading(false);
    }
  };

  // Determine the featured video ID for the main section
  const featuredVideo = videos.find(v => v.is_featured);
  const podcastId = featuredVideo ? featuredVideo.id : (videos.length > 0 ? videos[0].id : "vvpJVmcyYQY");

  if (selectedPost) {
    const getEmbedUrl = (url: string) => {
      if (!url) return '';
      const match = url.match(/(?:\/p\/|\/reels\/|\/reel\/)([\w-]+)/);
      if (match && match[1]) {
        return `https://www.instagram.com/p/${match[1]}/embed/`;
      }
      const cleanUrl = url.split('?')[0];
      const baseUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
      return `${baseUrl}embed/`;
    };

    const embedUrl = selectedPost.instagramEmbedUrl ? getEmbedUrl(selectedPost.instagramEmbedUrl) : '';

    return (
      <div className="pt-24 pb-20 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center space-x-2 text-[#a89b92] hover:text-[#833c4e] transition-colors mb-10 group uppercase text-[10px] font-black tracking-widest"
          >
            <ArrowLeft size={16} />
            <span>Voltar ao Conteúdo</span>
          </button>

          <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="text-[#833c4e] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
              {selectedPost.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tighter uppercase">
              {selectedPost.title}
            </h1>

            <div className="flex items-center space-x-6 text-[#a89b92] mb-12 border-y border-gray-100 py-6">
              <div className="flex items-center space-x-2">
                <Calendar size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">{selectedPost.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">{selectedPost.readingTime} de leitura</span>
              </div>
            </div>

            <div className="aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
              <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed text-refined text-justify">
              <p className="text-xl text-gray-900 font-medium mb-8 leading-relaxed italic">
                {selectedPost.excerpt}
              </p>
              <div className="space-y-6">
                {selectedPost.content.split('\n').map((para, i) => (
                  para.trim() && <p key={i}>{para}</p>
                ))}

                {selectedPost.instagramEmbedUrl && embedUrl && (
                  <div className="my-16 flex flex-col items-center">
                    <div className="flex items-center space-x-3 mb-6 text-[#833c4e]">
                      <Instagram size={20} />
                      <span className="font-black uppercase tracking-widest text-[9px]">Confira no Instagram</span>
                    </div>

                    <div className="w-full max-w-[540px] border border-[#e0d5c7]/30 rounded-[2.5rem] overflow-hidden shadow-2xl bg-white min-h-[640px] relative">
                      <iframe key={embedUrl} src={embedUrl} width="100%" height="640" frameBorder="0" scrolling="no" allowTransparency={true} className="w-full relative z-10"></iframe>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gray-50 -z-0">
                        <Instagram size={40} className="text-[#e0d5c7] mb-4 animate-pulse" />
                        <a href={selectedPost.instagramEmbedUrl} target="_blank" rel="noopener noreferrer" className="text-[#833c4e] text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 border-b border-[#833c4e]/30 pb-1">
                          <span>Abrir post original</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#f7f5f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#833c4e] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Educação e Ciência</span>
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase mb-12">
            Hub de Conteúdo
          </h1>

          <div className="inline-flex bg-white p-2 rounded-full shadow-2xl border border-[#e0d5c7]/30">
            {[
              { id: 'Artigos', icon: BookOpen },
              { id: 'Podcast', icon: Youtube },
              { id: 'Social', icon: Instagram }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                  ? 'bg-[#833c4e] text-white shadow-lg'
                  : 'text-[#a89b92] hover:text-[#833c4e]'
                  }`}
              >
                <tab.icon size={16} />
                <span>{tab.id === 'Podcast' ? 'Podcast & Vídeos' : tab.id === 'Social' ? 'Instagram & TikTok' : tab.id}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#833c4e] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#a89b92]">Carregando Conteúdo...</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'Artigos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post) => (
                  <div key={post.id} onClick={() => setSelectedPost(post)} className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#e0d5c7]/20 flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-6 left-6">
                        <span className="bg-[#833c4e] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">{post.category}</span>
                      </div>
                    </div>
                    <div className="p-10 flex-1 flex flex-col">
                      <div className="flex items-center space-x-4 text-[#a89b92] text-[9px] font-black uppercase tracking-widest mb-6">
                        <div className="flex items-center space-x-1.5"><Calendar size={12} /><span>{post.date}</span></div>
                        <div className="flex items-center space-x-1.5"><Clock size={12} /><span>{post.readingTime}</span></div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight uppercase tracking-tight group-hover:text-[#833c4e] transition-colors">{post.title}</h3>
                      <p className="text-gray-500 text-sm font-light mb-8 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      <div className="mt-auto flex items-center text-[#833c4e] font-black uppercase text-[10px] tracking-[0.3em] group/btn">
                        <span>Leia mais</span>
                        <ChevronRight size={16} className="ml-2 transform group-hover/btn:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Podcast' && (
              <div className="max-w-6xl mx-auto space-y-24">
                <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-[#e0d5c7]/30">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-video lg:aspect-square group cursor-pointer" onClick={() => setShowVideoModal(featuredVideo || videos[0] || { id: "vvpJVmcyYQY", title: "Dra. Marília Almeida", thumbnail: "" })}>
                      <img
                        src={`https://img.youtube.com/vi/${podcastId}/maxresdefault.jpg`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Podcast Principal"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-[#833c4e]/40 transition-all flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-[#833c4e] group-hover:border-[#833c4e] shadow-2xl">
                          <Play size={32} fill="white" className="text-white ml-1.5" />
                        </div>
                      </div>
                    </div>
                    <div className="p-12 md:p-20 flex flex-col justify-center">
                      <div className="flex items-center space-x-3 text-[#833c4e] mb-6">
                        <Mic2 size={24} />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em]">Em Destaque</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-8">Podcast & Entrevistas</h2>
                      <p className="text-gray-500 font-light leading-relaxed mb-10 text-lg">Assista às participações especiais da Dra. Marília em canais de saúde e bem-estar, onde ela compartilha sua visão sobre longevidade e equilíbrio hormonal.</p>
                      <button
                        onClick={() => setShowVideoModal(featuredVideo || videos[0] || { id: "vvpJVmcyYQY", title: "Dra. Marília Almeida", thumbnail: "" })}
                        className="bg-[#833c4e] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-[#6D2437] transition-all flex items-center justify-center space-x-3 shadow-xl"
                      >
                        <Youtube size={20} />
                        <span>Assistir Agora</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-4 mb-12">
                    <div className="h-[1px] flex-1 bg-[#e0d5c7]/40"></div>
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">Aulas & Conteúdos YouTube</h3>
                    <div className="h-[1px] flex-1 bg-[#e0d5c7]/40"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {videos.map((video) => (
                      <div key={video.id} className="group cursor-pointer" onClick={() => setShowVideoModal(video)}>
                        <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 shadow-lg border border-[#e0d5c7]/10">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-[#833c4e]/30 transition-all flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:bg-[#833c4e] transition-all">
                              <Play size={18} fill="white" className="text-white ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-tight text-gray-800 group-hover:text-[#833c4e] transition-colors line-clamp-2 px-1 leading-tight">{video.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Social' && (
              <div className="space-y-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Instagram Follow Block */}
                  <div className="bg-white rounded-[3.5rem] p-12 border border-[#e0d5c7]/30 shadow-sm flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-3xl bg-[#833c4e] flex items-center justify-center text-white mb-8 shadow-xl">
                      <Instagram size={40} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">Instagram Oficial</h3>
                    <p className="text-gray-500 font-light mb-8 max-w-xs">Acompanhe bastidores, dicas diárias e lives sobre saúde hormonal.</p>
                    <a href={CONTACT_INFO.instagramUrl} target="_blank" className="bg-[#833c4e] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-lg flex items-center space-x-3">
                      <span>Seguir no Instagram</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  {/* TikTok Follow Block */}
                  <div className="bg-white rounded-[3.5rem] p-12 border border-[#e0d5c7]/30 shadow-sm flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-3xl bg-black flex items-center justify-center text-white mb-8 shadow-xl">
                      <Music2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">TikTok Oficial</h3>
                    <p className="text-gray-500 font-light mb-8 max-w-xs">Vídeos dinâmicos e rápidos com o essencial sobre metabolismo.</p>
                    <a href={CONTACT_INFO.tiktokUrl} target="_blank" className="bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-lg flex items-center space-x-3">
                      <span>Seguir no TikTok</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-4 mb-12">
                    <div className="h-[1px] flex-1 bg-[#e0d5c7]/40"></div>
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">Destaques Recentes</h3>
                    <div className="h-[1px] flex-1 bg-[#e0d5c7]/40"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {socials.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        className="group block relative aspect-[9/12] rounded-[2.5rem] overflow-hidden shadow-sm border border-[#e0d5c7]/10"
                      >
                        <img src={social.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                        <div className="absolute top-6 right-6">
                          <div className={`p-2 rounded-full backdrop-blur-md border border-white/20 text-white ${social.platform === 'instagram' ? 'bg-[#833c4e]/40' : 'bg-black/40'}`}>
                            {social.platform === 'instagram' ? <Instagram size={14} /> : <Music2 size={14} />}
                          </div>
                        </div>
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                          <h4 className="text-[13px] font-black uppercase tracking-tight leading-tight mb-3 drop-shadow-md">{social.title}</h4>
                          <div className="text-[9px] font-bold uppercase tracking-widest opacity-70 flex items-center space-x-2">
                            <span>Ver no {social.platform}</span>
                            <ExternalLink size={10} />
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showVideoModal && (
        <div className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <button className="absolute top-8 right-8 text-black p-2 z-[210] hover:rotate-90 transition-transform" onClick={() => setShowVideoModal(null)}><X size={40} /></button>
          <div className={`w-full ${showVideoModal.type === 'shorts' ? 'max-w-[400px] aspect-[9/16]' : 'max-w-5xl aspect-video'} bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative`}>
            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${showVideoModal.id}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;