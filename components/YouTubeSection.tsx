
import React from 'react';
import { YOUTUBE_VIDEOS } from '../constants';
import { Youtube, Play } from 'lucide-react';

const YouTubeSection: React.FC = () => {
  return (
    <section className="py-24 bg-black text-white overflow-hidden">
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
            href="https://youtube.com/@dramariliaalmeida" 
            target="_blank" 
            className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-lg flex items-center space-x-3"
          >
            <Youtube size={20} />
            <span>Inscrever-se</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {YOUTUBE_VIDEOS.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 shadow-lg border border-white/5">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
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
    </section>
  );
};

export default YouTubeSection;
