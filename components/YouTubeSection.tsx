
import React, { useState, useEffect } from 'react';
import { CONTACT_INFO, YOUTUBE_VIDEOS as INITIAL_VIDEOS } from '../constants';
import { YouTubeVideo } from '../types';
import { Youtube, Play, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

const YouTubeSection: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    if (!supabase) {
      setVideos(INITIAL_VIDEOS.slice(0, 3));
      setLoading(false);
      return;
    }

    try {
      // Fetch all videos to sort manually (featured first, then most recent)
      const { data, error } = await supabase
        .from('youtube_videos')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        // Prepare the 3 videos list:
        // 1. Featured video (if exists)
        // 2. The most recent non-featured videos to fill 3 slots
        const featured = data.find((v: YouTubeVideo) => v.is_featured);
        const others = data.filter((v: YouTubeVideo) => v.id !== featured?.id);

        const combined = featured
          ? [featured, ...others.slice(0, 2)]
          : data.slice(0, 3);

        setVideos(combined);
      } else {
        setVideos(INITIAL_VIDEOS.slice(0, 3));
      }
    } catch (err) {
      console.error("Erro ao carregar vídeos do YouTube na Home:", err);
      setVideos(INITIAL_VIDEOS.slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <section className="py-12 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="max-w-2xl text-center md:text-left mb-8 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-[#FF0000] mb-4">
              <Youtube size={32} />
              <span className="font-black uppercase tracking-[0.5em] text-[10px]">Educação & Ciência</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tighter uppercase">
              Conteúdo Exclusivo e Educativo
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Estamos migrando nosso conhecimento para vídeos mais longos e detalhados. Inscreva-se para acompanhar dicas de saúde, bastidores e aulas completas sobre metabolismo.
            </p>
          </div>
          <a
            href={CONTACT_INFO.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-lg flex items-center space-x-3"
          >
            <Youtube size={20} />
            <span>Inscrever-se</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="group cursor-pointer" onClick={() => setSelectedVideo(video)}>
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 shadow-lg border border-white/5">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {video.is_featured && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest z-10 flex items-center space-x-1 shadow-lg">
                    <span>Em Destaque</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#FF0000] group-hover:scale-110 transition-all">
                    <Play fill="white" size={24} className="ml-1 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-[#FF0000] transition-colors line-clamp-2 leading-tight px-2">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <button className="absolute top-8 right-8 text-black p-2 z-[210] hover:rotate-90 transition-transform" onClick={() => setSelectedVideo(null)}><X size={40} /></button>
          <div className={`w-full ${selectedVideo.type === 'shorts' ? 'max-w-[400px] aspect-[9/16]' : 'max-w-5xl aspect-video'} bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative`}>
            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default YouTubeSection;
