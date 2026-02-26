
import React from 'react';
import { Star, TrendingUp, Mic2 } from 'lucide-react';

const MediaSection: React.FC = () => {
  const mediaStats = [
    { icon: TrendingUp, value: 'Milhões', label: 'de visualizações mensais', color: 'text-[#ee2a7b]' },
    { icon: Mic2, value: 'Podcast', label: 'Participações Especiais', color: 'text-[#a89b92]' },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden" id="midia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-[#833c4e] mb-4">
            <Star size={16} fill="currentColor" />
            <span className="font-black uppercase tracking-[0.5em] text-[10px]">Autoridade & Influência</span>
            <Star size={16} fill="currentColor" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Dra. Marília na Mídia</h2>
          <p className="text-[#a89b92] max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Referência em saúde hormonal e longevidade, compartilhando conhecimento com milhões de pessoas mensalmente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
          {mediaStats.map((stat, i) => (
            <div key={i} className="bg-[#f7f5f3] p-10 rounded-[2rem] border border-[#e0d5c7]/30 flex flex-col items-center text-center group hover:bg-[#833c4e] transition-all duration-500">
              <div className={`mb-6 p-4 bg-white rounded-2xl shadow-sm ${stat.color} group-hover:bg-white/10 group-hover:text-white transition-colors`}>
                <stat.icon size={32} />
              </div>
              <div className="text-3xl md:text-4xl font-black text-gray-900 mb-2 group-hover:text-white transition-colors tracking-tighter uppercase leading-none">{stat.value}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#a89b92] group-hover:text-white/70 transition-colors">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Media Logos Placeholder Section */}
        <div className="relative py-12 border-y border-[#e0d5c7]/20">
          <div className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#a89b92]">Como visto em</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
             <div className="text-2xl font-black text-gray-400 uppercase tracking-tighter">Portal G1</div>
             <div className="text-2xl font-black text-gray-400 uppercase tracking-tighter">TV Gazeta</div>
             <div className="text-2xl font-black text-gray-400 uppercase tracking-tighter">Revista Saúde</div>
             <div className="text-2xl font-black text-gray-400 uppercase tracking-tighter">Folha de SP</div>
             <div className="text-2xl font-black text-gray-400 uppercase tracking-tighter">Estadão</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
